const{Proker, detail_proker} =  require("../models/index");
const { where } = require("sequelize");

const lihatProker  = async(req,res)=>{
    try {
        const lihatProker = await Proker.findAll({
            where: {id_divisi:2}
        });
        res.json(lihatProker)
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
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

module.exports ={lihatProker,
    lihatDetailProker
}