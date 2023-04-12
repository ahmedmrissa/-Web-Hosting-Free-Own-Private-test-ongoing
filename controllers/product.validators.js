const {check} = require('express-validator/check');


const postProductValidator = [
    check('label','Label must not be empty').trim().isLength({min:1, max:80}),
    check('brand','Brand must not be empty').trim().isLength({min:1, max:80}),
    check('category','Category must not be empty').trim().isLength({min:1, max:80}),
    check('price','Price required').isNumeric()
]



module.exports={
    postProductValidator
}