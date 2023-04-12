const path = require('path')

const multer = require('multer')

const localStorage = multer.memoryStorage()

const upload=multer({storage:localStorage})

const productPhotoUpload = upload.single('photo')
const avatarUpload = upload.single('avatar')


module.exports={
    productPhotoUpload,
    avatarUpload
}