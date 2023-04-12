const Product = require('../models/product.model');
const formatResponse = require('../utilities/format.response')

const addProduct = async(product)=>{
        const newProduct = await Product.create(product);
        const result = await newProduct.save()
        if(result){
            return formatResponse('SUCCESS','Product added successfully',result);
        }else{
            return formatResponse('ERROR','Add Product Operation Failed ');
        }
}



const getAllProducts = async()=>{
    const result = await Product.find({});
    return formatResponse('SUCCESS','All Products',result);
}

const getProductById = async(id)=>{
    const result = await Product.find({_id:id});
    return formatResponse('SUCCESS','Product',result);
}

const updateProduct = async(id,newProduct)=>{
    const oldProduct = await Product.findOneAndUpdate({_id:id},newProduct);
    return formatResponse('SUCCESS','Product Updated Successfully',oldProduct);
}

const deleteProduct = async (id)=>{
    const productToDelete=await Product.findOneAndDelete({_id:id});
    return formatResponse('SUCCESS','Product deleted successfully ',productToDelete);
}

const getProductsByCategory = async()=>{}


module.exports={
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}