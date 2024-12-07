const slugify = require('slugify');
const CategoryModel = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');


//post
exports.postCategory =asyncHandler( async function(req,res){
    try{
        const {name}= req.body
        const newCategory = await CategoryModel.create({name , slug : slugify(name)}) 
        res.json({name :newCategory , message : "category added successfully"})
    }
    catch(err){
        console.log("ERROR",err)
        res.status(400).json({message:"something is wrong"} , err)

    }

});

//get
exports.getCategories =asyncHandler( async function(req,res){
    try{
        const page = req.query.page *1 || 1;
        const limit = req.query.limit *1 || 5;   //---->> to make (page and limit) query 
        const skip = (page - 1) * limit;
        const categories = await CategoryModel.find().skip(skip).limit(limit); 
        res.json({"result": categories.length, page ,Categories : categories, message : "categories"})
    }
    catch(err){
        console.log("ERROR",err)
        res.status(400).json({message:"errorrrrrrrr"} , err)

    }

});

//get specific category
exports.getCategory =asyncHandler( async function(req,res,next){
    try{
        const {id} = req.params;
        const category = await CategoryModel.findById(id);

        if(!category){
            // return res.status(404).json({ message: `No category found for ID: ${id}` });
           return next(new ApiError(`No category found for ID: ${id}`  , 404))
            }
 
        res.json({data : category})
    }
    catch(err){
     
        console.log("ERROR",err)
        res.status(400).json({message:"something is wrong", err})
       
    }

});


//update specific category
exports.updateCategory =asyncHandler( async function(req,res){
    try{
        const {id} = req.params;
        const {name} = req.body;
        const category = await CategoryModel.findOneAndUpdate({_id : id } ,{name , slug : slugify(name)} , {new:true});

        if(!category){  
            // return res.status(404).json({ message: `No category found for ID: ${id}` });
            return next(new ApiError(`No category found for ID: ${id}` , 404))
            }
        res.json({data : category})
    }
    catch(err){
     
        console.log("ERROR",err)
        res.status(400).json({message:"something is wrong", err})
       
    }

});

//delete by id
exports.deleteCategory =asyncHandler( async function(req,res){
    try{
        const {id} = req.params;
      
        const category = await CategoryModel.findByIdAndDelete(id);

        if(!category){
            // return res.status(404).json({ message: `No category found for ID: ${id}` });
            return next(new ApiError(`No category found for ID: ${id}`, 404))
            
            }
           res.json({data : category , message : "category is removed"})
    }
    catch(err){
     
        console.log("ERROR",err)
        res.status(400).json({message:"something is wrong", err})
       
    }

});
