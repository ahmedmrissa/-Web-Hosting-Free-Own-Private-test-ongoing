const User = require('../models/user.model');
const formatResponse = require('../utilities/format.response')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (fullName, email, password) => {
    const oldUser = await User.findOne({ email })

    if (oldUser) {
        const result = formatResponse('ERROR', 'User Already exist')
        return result;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        fullName,
        email,
        password: encryptedPassword
    });
    const result = await newUser.save();
    return formatResponse('SUCCESS', 'User Registred Succefully', result);
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { user_id: user._id,email:user.email,role:user.role }, process.env.SECRET_KEY || 'BLABLA', { expiresIn: "2h" }
        )
        return formatResponse('SUCCESS', 'User login Succfully', { ...user._doc, token: token })
    }
    return formatResponse('ERROR', "Invalid Credentials")
}

const getAllUsers = async ()=>{
  const users = await User.find({});
  if(users){
    return formatResponse('SUCESS','All Users',users)
  }
  return formatResponse('ERROR','Error Occured')
}
const getOneUser = async (id)=>{
    const users = await User.find({_id:id});
    if(users){
      return formatResponse('SUCESS','All Users',users)
    }
    return formatResponse('ERROR','Error Occured')
  }
  const updateUser = async(id,fullName, email, password)=>{
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await Product.findOneAndUpdate({_id:id},{fullName,email,password:encryptedPassword});
    return formatResponse('SUCCESS','Information Updated Successfully',oldUser);
}
  
module.exports = {
    register,
    login,
    getAllUsers,
    getOneUser,
    updateUser
}