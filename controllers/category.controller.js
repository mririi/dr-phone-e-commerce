// create the category controller that has the getAll, getOne, create,update,delete and search for the category model
const Category = require('../models/category.model');

const getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getOne = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const create = async (req, res) => {
    const category = req.body;
    const newCategory = new Category(category);
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const result =await Category.updateOne(
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
};

const remove = async (req, res) => {
    try {
        const result= await Category.deleteOne({_id:req.params.id});
        console.log(result);
        result.n
        ?res.send({message:"Category deleted"})
        :res.send({message:"there is no Category with this id"});
    } catch (error) {
        res.send({message:"there is no id"});
    }
};

module.exports = { getAll, getOne, create, update, remove };