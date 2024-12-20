const{Absensi, Rekapan, User} =  require("../models/index");
const { where} = require("sequelize");
const {Op} = require('sequelize');


const lihatAbsensi = async(req,res)=>{
    try {
        const lihatAbsensi = await Absensi.findAll({
            where:{id_user:req.user.id_user},
            include : {
                model : Rekapan,
                as : "rekapan",
                attributes : ["id_rekapan", "minggu_ke"]
            }
        })
        res.json(lihatAbsensi)
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const lihatDetailAbsensi = async(req,res)=>{
    try {
        const id_rekapan = req.params.id_rekapan;
        const lihatDetailAbsensi = await Absensi.findOne({
            where:{id_rekapan,
                id_user:req.user.id_user
            },
            include : {
                model : Rekapan,
                as : "rekapan",
                attributes : ["id_rekapan", "minggu_ke"]
            }
        })
        res.json(lihatDetailAbsensi)
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

const createAbsensi = async(req,res)=>{
    try {
        const user = req.user;
        console.log(user)

        // const { gambar } = req.body;
        const gambar = req.file ? req.file.filename : null;
        if (!gambar) {
            return res.status(400).json({ message: 'Incomplete request data: No file uploaded' });
        }

        const day = new Date().getDay();
        const hari = ["Minggu","Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

        // Mendapatkan minggu saat ini
        const currentWeek = getWeekOfYear(new Date());

        // Cek apakah rekap absensi untuk minggu ini sudah ada
        let existingRekap = await Rekapan.findOne({ where: { minggu_ke: currentWeek } });
        console.log( hari[day])
        console.log(user.jadwal)
        console.log(currentWeek)
        console.log(existingRekap?.minggu_ke)
        console.log(existingRekap)



        if (existingRekap) {
            // Jika rekap minggu ini sudah ada, update status absensi user yang login
                    // Validasi hari jadwal
        if (hari[day] !== user.jadwal || currentWeek !== existingRekap?.minggu_ke) {
            return res.status(400).json({ message: 'It is not your schedule'});
        }
            await Absensi.update(
                { status: 1,
                    gambar: gambar
                 },
                { where: { id_user:user.id_user} }
            );
        } else {
            // Jika rekap minggu ini belum ada, buat absensi untuk semua user dengan status awal
            existingRekap = await Rekapan.create({ minggu_ke: currentWeek });

            // Membuat entri absensi untuk semua user dengan status awal "belum mengisi"
            const allUsers = await User.findAll();
            const absensiData = allUsers.map(u => ({
                id_user: u.id_user,
                id_rekapan: existingRekap.id_rekapan,
                status: u.id_user === user.id_user ? 1 : 0,
                gambar: u.id_user === user.id_user ? gambar : null,
                minggu_ke: currentWeek
            }));

            await Absensi.bulkCreate(absensiData);
        }

        res.json({ message: "Absensi berhasil disimpan." });
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" }); 
    }

}

function getWeekOfYear(date) {
    const awalTahun = new Date(date.getFullYear(), 0, 1);  
    const hariPertama = awalTahun.getDay(); 
    const offset = (hariPertama <= 4 ? hariPertama : hariPertama - 7);  
  
    const milisecondsInADay = 86400000;  
    const hariDalamTahun = Math.ceil((date - awalTahun + offset * milisecondsInADay) / milisecondsInADay);
  
    return Math.ceil(hariDalamTahun / 7);  
}

const otomatisUpdate = async () => {
    try {
        const currentWeek = getWeekOfYear(new Date());
      const latedUsers = await Absensi.findAll({
        where : { status : 0}, 
            include: {
                model: Rekapan,
                as: "rekapan",
                where: {
                  minggu_ke: { [Op.lt]: currentWeek }
                }
              }

      });
      console.log(latedUsers);
     
      if (!latedUsers.length) {
        console.log("No users found with the specified condition.");
        return
    }
  
            const updatedAbsensiPromises = latedUsers.map(async (user) => {
        return user.update({ status: 2 }); // Set the status to 2 for each user
      });
  
    
      const updatedAbsensi = await Promise.all(updatedAbsensiPromises);
  
      console.log("Update successful");
  
   
    } catch (error) {
      console.error("Error during update:", error);
    }
  };
  

module.exports ={lihatAbsensi,
    lihatDetailAbsensi,
    createAbsensi,
    otomatisUpdate
}