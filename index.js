require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors';)

const categoryRoutes=require('./routes/categories');
const itemRoutes=require('./routes/item')

const app=express()
const port=process.env.PORT || 3000;

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello from the inventory API! We are connected to the database!!')
})
app.use('/categories',categoryRoutes);
app.use('/item',itemRoutes)
app.use(cors());

const startServer=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Successfully connected to MongoDb')
        app.listen(port,()=>{
            console.log(`Server running on http://localhost:${port}`)
        })
    }catch(error){
        console.error('Failed to connect to MongoDB',error)
        process.exit(1);
    }
}
startServer();
