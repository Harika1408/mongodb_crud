const mongoose=require('mongoose');
//define the schema for brand
const brandSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:String
});
//exporting this module(brand) to the controller file(main api or main file) index.js
module.exports=mongoose.model('Brand',brandSchema);