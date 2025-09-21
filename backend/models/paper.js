const mongoose=require("mongoose");
const paperSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide a title"],
        trim:true,
        maxLength:[200,"title cannot be more than 200 words"],
    minLength:[10,"title cannot be less than 50 words"]
    },
    content:{
        type:String,
        required:[true,"content cannot be empty"],
        minLength:[100,"content cannot be less than 200 words"]
    },
    category:{
        type:String,
        required:[true,"select at least one title"],
        enum:["Action","Comedy","Sports","love","Hot","Huntai"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // users who liked
    unlikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // users who unliked,
    views: { type: Number, default: 0 }
},{timestamps:true});
const Paper=mongoose.model("paper",paperSchema);
module.exports=Paper;