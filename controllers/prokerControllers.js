const{Proker, detail_proker, Divisi} =  require("../models/index");
const { where } = require("sequelize");

const lihatProker  = async(req,res)=>{
    try {
        const { id_divisi } = req.user; // Ambil id_divisi dari user yang terautentikasi
        const prokers = await Proker.findAll({
          where: { id_divisi }, // Filter proker berdasarkan divisi
          include: [{ model: Divisi, as: "divisi" }] // Sertakan informasi divisi
        });
        res.status(200).json(prokers);
      } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data proker", error });
      }
    };

 // Mendapatkan detail dari sebuah proker tertentu
 const getProkerDetails = async(req,res)=>{
    try {
      const { id } = req.params; // Ambil ID proker dari parameter URL
      const prokerDetails = await detail_proker.findAll({
        where: { id_proker: id } // Filter detail berdasarkan ID proker
      });
      res.status(200).json(prokerDetails);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil detail proker', error });
    }
  }

// Menambahkan detail baru ke dalam sebuah proker
const addProkerDetail = async(req,res)=>{
  try {
    const { id_proker } = req.params;
    const { judul_detail_proker, tanggal } = req.body;
    const gambar = req.file ? req.file.filename : null; // Simpan nama file jika ada

    // Ambil `id_divisi` dari user yang sedang login
    const { id_divisi } = req.user;

    // Validasi proker berdasarkan `id_proker` dan `id_divisi`
    const proker = await Proker.findOne({ where: { id_proker, id_divisi } });

    // Jika proker tidak ditemukan atau bukan milik divisi user
    if (!proker) {
      return res.status(404).json({ message: "Proker tidak ditemukan" });
    }

    if (proker.id_divisi !== id_divisi) {
      return res.status(403).json({
        message: "Tidak memiliki hak untuk menambahkan detail pada proker ini",
      });
    }

    // Tambahkan detail baru
    const newDetail = await detail_proker.create({
      id_proker : id_proker,
      judul_detail_proker,
      tanggal,
      gambar,
    });

    // Respon berhasil
    res.status(201).json({
      message: "Detail proker berhasil ditambahkan",
      data: newDetail,
    });
  } catch (error) {
    console.error("Error menambahkan detail proker:", error);
    res.status(500).json({
      message: "Gagal menambahkan detail proker",
      error: error.message,
    });
  }
}

const lihatDetailProker = async(req,res)=>{
    try {
        const id_detailProker = req.params.id_detailproker;
        const lihatDetailProker = await detail_proker.findOne({
            where:{id_detailProker}
        })
        res.json(lihatDetailProker)
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateProkerStatus = async (req, res) => {
  try {
    const { id_proker } = req.params; // Ambil id_proker dari parameter URL

    // Cari proker berdasarkan id_proker
    const proker = await Proker.findOne({ where: { id_proker } });
    
    if (!proker) {
      return res.status(404).json({ message: 'Proker tidak ditemukan' });
    }

    // Cek apakah semua detail dalam proker ini sudah selesai
    const allDetails = await detail_proker.findAll({ where: { id_proker } });

    // Jika semua detail sudah selesai (misalnya status gambar tidak null dan judul detail ada)
    const allCompleted = allDetails.every(detail => detail.gambar && detail.judul_detail_proker); // Cek apakah semua detail memiliki gambar dan judul

    if (allCompleted) {
      // Update status proker menjadi 1 (selesai)
      proker.status = 1;
      await proker.save();

      return res.status(200).json({
        message: 'Proker berhasil ditandai selesai',
        data: proker,
      });
    } else {
      return res.status(400).json({ message: 'Detail proker belum lengkap, tidak bisa menandai selesai' });
    }
  } catch (error) {
    console.error("Error menandai proker selesai:", error);
    res.status(500).json({
      message: "Gagal menandai proker selesai",
      error: error.message,
    });
  }
};


module.exports ={lihatProker,getProkerDetails,addProkerDetail,updateProkerStatus,lihatDetailProker}