const{User} =  require("../models/index");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");


const changePassword = async(req,res)=>{
    try {

        const {passwordLama , passwordBaru , konfirmasiPassword} = req.body
    
            if(!passwordLama||!passwordBaru ||!konfirmasiPassword){
               return res.status(400).json({message: "Isi password lama atau password barunya"})
            }
            if (konfirmasiPassword!==passwordBaru){
                return res.status(400).json({message: "Konfirmasi password berbeda"})
            } 
        const findAccount = await User.findOne(
            {where : {id_user : req.user.id_user}}
        );
        console.log(req.user)
        const passwordAsli = findAccount?.password ||'test'
     
        const passwordMatch =  bcrypt.compareSync(passwordLama , passwordAsli);
        if(!passwordMatch){
            return res.status(400).json({message: "Password Anda Salah"})
        }
        const salt = bcrypt.genSaltSync(10)
        const encryptPass = bcrypt.hashSync(passwordBaru, salt)
        const updatePassword = await User.update({
            password : encryptPass}, 
            {where : {id_user: findAccount.id_user }
        }
    )
    return res.status(200).json(updatePassword)
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports ={ changePassword
}