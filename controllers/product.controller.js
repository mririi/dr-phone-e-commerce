// give me the code for getAll, getOne, create, update, remove functions for product.controller.js

// Path: controllers/product.controller.js

const Product = require('../models/product.model');

const getAll = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate('category');;
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const create = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const result =await Product.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}
        });
        console.log(result);
        res.nModified 
        ?res.send({message:"update successfully"})
        :res.send({message:"allready updated"});
    } catch (error) {
        res.status(400).send({message:"update rejected"});
    }
}

const remove = async (req, res) => {
    try {
        const result= await Product.deleteOne({_id:req.params.id});
        console.log(result);
        result.n
        ?res.send({message:"Product deleted"})
        :res.send({message:"there is no Product with this id"});
    }catch (error) {
        res.send({message:"there is no id"});
    }
}

module.exports = { getAll, getOne, create, update, remove };