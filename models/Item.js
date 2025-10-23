const mongoose=require('mongoose')
const { types } = require('pg')
const {Schema}=mongoose

const itemSchema=new Schema({
    name:{type:String ,required:true},
    quantity:{type:Number,required:true,default:0},
    category:{type:Schema.Types.ObjectId,ref:'Category',required:true}
})

module.exports=mongoose.model('Item',itemSchema)