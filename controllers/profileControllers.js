const{User} =  require("../models/index");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");

const changePassword = async(req,res)=>{
    try {
        const {passwordLama , passwordBaru , konfirmasiPassword} = req.body
        // const id = User.id_user
        try {
            if(!passwordLama||!passwordBaru ||!konfirmasiPassword){
               return res.status(400).json({message: "Isi password lama atau password barunya"})
            }
            if (konfirmasiPassword!==passwordBaru){
                return res.status(400).json({message: "Konfirmasi password berbeda"})
            } 
        const findAccount = await User.findOne({where:{id_user:1}})
        if(!findAccount){
           return res.status(400).json({message: "Akun tidak ditemukan"}) 
    
        } 
        const passwordAsli = findAccount.password
     
        const passwordMatch =  bcrypt.compareSync(passwordLama , passwordAsli)  
        console.log(passwordAsli);
        console.log(passwordLama);
        console.log(passwordMatch);
        if(!passwordMatch){
            return res.status(400).json({message: "Password Anda Salah"})
        }
        const salt = bcrypt.genSaltSync(10)
        const encryptPass = bcrypt.hashSync(passwordBaru, salt)
         await User.update({
            password : encryptPass
    
        }, {where : {id_user:1}}
    )
    return res.status(200).json({message: "Data Berhasil diperbarui"})
        } 
        catch (error) {
        console.error(error);
        return res.status(500).json({message: "Ada Error"})
        } 
    
        
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports ={ changePassword
}