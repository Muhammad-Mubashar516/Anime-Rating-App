const mongoose=require("mongoose");
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected successfuly`);
    }catch(error){
        console.error(`Error${error.message}`);
        process.exit(1);
    }
}

module.exports=connectDB;