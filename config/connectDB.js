// 1 require mongoose
const mongoose = require ("mongoose")
// 2 connect DB
const connectDB = async () =>{
    try {
        //step1
        await mongoose.connect(process.env.MONGO_URI);
        //step 2 
        console.log('Database connected ...')
    } catch (error) {
        console.log('Database is not connected !!', error)
        
    }
}
// export

module.exports=connectDB