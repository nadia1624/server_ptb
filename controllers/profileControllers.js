const{ User } =  require("../models/index");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const fs = require("fs");
const path = require("path");


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
};

// Menampilkan gambar profil
const getProfileImage = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id_user);
  
      if (!user || !user.gambar) {
        return res.status(404).json({ message: "Profil atau gambar tidak ditemukan" });
      }
  
      const imagePath = path.join(__dirname, "../uploads", user.gambar);
  
      // Pastikan file gambar ada di server
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: "File gambar tidak ditemukan" });
      }
  
      res.sendFile(imagePath);
    } catch (error) {
      console.error("Error fetching profile image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Mengunggah gambar profil
  const uploadProfileImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Tidak ada file yang diunggah" });
      }
  
      const updatedUser = await User.update(
        { gambar: req.file.filename },
        { where: { id_user: req.user.id_user } }
      );
  
      if (!updatedUser[0]) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      res.status(200).json({ message: "Gambar berhasil diunggah", filename: req.file.filename });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Mengganti gambar profil
  const updateProfileImage = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id_user);
  
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      // Hapus file gambar lama dari folder uploads
      if (user.gambar) {
        const oldImagePath = path.join(__dirname, "../uploads", user.gambar);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
  
      // Perbarui gambar baru
      if (!req.file) {
        return res.status(400).json({ message: "Tidak ada file yang diunggah" });
      }
  
      user.gambar = req.file.filename;
      await user.save();
  
      res.status(200).json({ message: "Gambar berhasil diperbarui", filename: req.file.filename });
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports ={ 
    changePassword,
    getProfileImage,
    uploadProfileImage,
    updateProfileImage,
}