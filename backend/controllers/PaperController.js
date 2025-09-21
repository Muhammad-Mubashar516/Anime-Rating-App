const Paper=require("../models/paper");
const publishPaper=async(req,res)=>{
    try{
        const {title,content,category}=req.body;
        if(!title  || !content || !category){
            return res.status(400).json({message:"title ,content,category are rquired"});
        }
    const paper=await Paper.create({
        title,
        content,
        category,
         author:req.user._id
    });
    res.status(201).json(paper);
    }catch(error){
        console.error("Publish Paper Error:", error);
return res.status(500).json({message:`server error ${error.message}`});

    }
};
const getAllPapers=async (req,res)=>{
    try{
        const {category}=req.query;
        const filter={};
        if(category){
            filter.category=category;
        }
        const papers=await Paper.find(filter).populate("author","name avatar");
        res.status(200).json(papers);
    }catch(error){
        res.status(500).json({message:`server error: ${error.message}`});
    }
};
const getPaperById=async (req,res)=>{
    try{
        const paper=await Paper.findById(req.params.id).populate("author","name avatar");
        if(!paper){
           return  res.status(404).json({message:"paper not found"});
        }
        res.status(200).json(paper);
    }catch(error){
        return res.status(500).json({message:`server error :  ${error.message}`});
    }
};
const updatePaper=async(req,res)=>{
    try{
        const {title,content,category}=req.body;
        const paper=await Paper.findById(req.params.id);
        if(!paper){
            return res.status(404).json({message:"paper not found"});
        
        }
        if(paper.author.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"User not authorized"});
        }
        paper.title=title || paper.title;
        paper.content=content || paper.content;
        paper.category=category || paper.category;
        const updatedPaper= await paper.save();
        res.status(200).json(updatedPaper);
    }catch(error){
        res.status(500).json({message:`server error ${error.message}`});

    }
};
const deletePaper=async(req,res)=>{
    try{
        const paper =await Paper.findById(req.params.id);
        if(!paper){
            return res.status(404).json({message:"paper not found"});

        }
        if(paper.author.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"User not authorized "});
        }
        await paper.deleteOne();
        res.status(200).json({message:"paper deleted successfully"})
    }catch(error){
        res.status(500).json({message:`server error : ${error.message}`});
    }
};
const likePaper = async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id);
        if (!paper) return res.status(404).json({ message: "Paper not found" });

        const userId = req.user._id.toString();  // convert to string

        // ensure arrays exist
        paper.likes = paper.likes || [];
        paper.unlikes = paper.unlikes || [];

        if (paper.likes.map(id => id.toString()).includes(userId)) {
            paper.likes = paper.likes.filter(id => id.toString() !== userId); // remove like
        } else {
            paper.likes.push(userId); // add like
            paper.unlikes = paper.unlikes.filter(id => id.toString() !== userId); // remove unlike if exists
        }

        await paper.save();
        res.status(200).json({ likes: paper.likes.length, unlikes: paper.unlikes.length });
    } catch (error) {
        console.error("Like Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const unlikePaper = async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id);
        if (!paper) return res.status(404).json({ message: "Paper not found" });

        const userId = req.user._id.toString();

        paper.likes = paper.likes || [];
        paper.unlikes = paper.unlikes || [];

        if (paper.unlikes.map(id => id.toString()).includes(userId)) {
            paper.unlikes = paper.unlikes.filter(id => id.toString() !== userId); // remove unlike
        } else {
            paper.unlikes.push(userId); // add unlike
            paper.likes = paper.likes.filter(id => id.toString() !== userId); // remove like if exists
        }

        await paper.save();
        res.status(200).json({ likes: paper.likes.length, unlikes: paper.unlikes.length });
    } catch (error) {
        console.error("Unlike Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Increment views
const incrementView = async (req, res, next) => {
    try {
        const paper = await Paper.findById(req.params.id);
        if (paper) {
            paper.views += 1;
            await paper.save();
        }
        next();
    } catch (error) {
        next();
    }
};

module.exports={
    publishPaper,
    getAllPapers,
    getPaperById,
    updatePaper,
    deletePaper,
    likePaper,
    unlikePaper,
    incrementView
};