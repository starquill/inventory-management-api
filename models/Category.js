const mongoose=require('mongoose')
const {Schema}=mongoose;

const categorySchema=new Schema({
    name:{type:String,required:true,minLength:3}
})

module.exports=mongoose.model('Category',categorySchema)