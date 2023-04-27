const router = require('express').Router();
const paginatedResult = require('../middlewares/paginated-result');
const { validateRequestSchema } = require('../middlewares/validate.request.schema');
const contactService = require('../services/contact.service');
const formatResponse = require('../utilities/format.response');

const { productPhotoUpload } = require('../middlewares/multer')

require('dotenv').config()
const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
    getDownloadURL
} = require("firebase/storage");
const storage = require("../middlewares/firebase");





router.get('/all', paginatedResult(require('../models/contact.model')), async (req, res) => {
    try {
        const result = await contactService.getAllTickets();
        res.json(res.result)
    } catch (error) {
        res.json(formatResponse('ERROR', error.message))
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await contactService.deleteTicket(id)
        res.json(result)
    } catch (error) {
        res.json(formatResponse('ERROR', error.message))
    }
})

// upload product photo
router.post('/add/:id',validateRequestSchema ,async (req, res, next) => {
    const { email, subject, message} = req.body;
    await productPhotoUpload(req, res, async (error) => {
        if (error) {
            res.status(500).json({ error: error.message })
        }
        try {
            const upLoadedPhoto = req.file;

            const path = upLoadedPhoto.fieldname + '-' + Date.now() + '.' + upLoadedPhoto.originalname.split('.')[upLoadedPhoto.originalname.split('.').length - 1]
            const storageRef = ref(storage);
            const imgRef = ref(storageRef, 'tickets');
            const imageRef = ref(imgRef, path);
            
                
                
            const metatype = { contentType: upLoadedPhoto.mimetype, name: upLoadedPhoto.filename };
           const snapshot= await uploadBytes(imageRef, upLoadedPhoto.buffer, metatype)
           const rt=await getDownloadURL(snapshot.ref)         


           const result = await contactService.addTicket({ email, subject, message, file_upload:rt || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4PcwBzqNOORvFno64P75vIip-xLUUKOy_yw&usqp=CAU' });
            res.json(result)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
}
)

module.exports = router;