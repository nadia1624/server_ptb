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

module.exports ={lihatProker,getProkerDetails,
    lihatDetailProker
}