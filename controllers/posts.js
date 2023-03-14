const { Posts, Comments, Likes } = require('../models');

 const getPosts = async (req, res) => {
    try{
        const posts = await Posts.findAll();
        if(posts.length > 0){
            return res.status(200).json({ message: "Success", data: posts});
        }else{
             return res.status(400).json({ message: "No Found"});
        }
    }catch(error){
        return res.status(500).json(error);
    }
}

 const getPostBySearch = (req, res) => {

}
 const getPost = async (req, res) => {
    const { id } = req.params;
    try{
        const post = await Posts.findByPk(id);
        if(!post) return res.status(400).json({ message: "No Found"});
        return res.status(200).json({ message: "Success", data: post});
    }catch(error){
        return res.status(500).json(error);
    }
}

 const createPost = async (req, res) => {
    const { name, description } = req.body;
    if(!req.userId) return res.sendStatus(401);
    try{
        const post = await Posts.create({ name , description , user_id: req.userId });
        if(!post) return res.status(500).json({ message: "Please try again"}); 
        return res.status(200).json({ message: "Success", data: post});
    }catch(error){
        return res.status(500).json(error);
    }
   
}

 const updatePost = async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params; 
    try{
        const post = await Posts.findByPk(id);
        if(!post) return res.status(400).json({ message: "No Found"}); 
        const updatedPost = await Posts.update({ name, description }, { where: { id }});
        if(updatedPost) return res.status(200).json({ message: "Success", data: updatedPost});
        return res.status(500).json({ message: "Please try again"}); 

    }catch(error){
        return res.status(500).json(error);
    }
}
 const deletePost = async (req, res) => {
    const { id } = req.params;
    try{
        const post = await Posts.findByPk(id);
        if(!post) return res.status(400).json({ message: "No Found"}); 
        await Posts.destroy({ where: { id }});
        return res.status(200).json({ message: "Success"});
    }catch(error){
        return res.status(500).json(error);
    }

}

 const likePost = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.sendStatus(401);
    try{
        const post = await Posts.findByPk(id);
        if(!post) return res.status(400).json({ message: "No Found 1"});
        const isLike = await Likes.findOne({ where: { user_id: req.userId, post_id: id }});
        if(isLike) {
            await Likes.destroy({ where: {user_id: req.userId, post_id: id}} );
            return res.status(200).json({ message: "Success Dislike"});
        }else{
            const insertLike = await Likes.create({ user_id: req.userId, post_id:id });
            if(insertLike) return res.status(200).json({ message: "Success Like"});
        }
        return res.status(500).json({ message: "Please try again"}); 
    
    }catch(error){
        return res.status(500).json(error);
    }
 }
   
 const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment }  = req.body;
    if(!req.userId) return res.sendStatus(401);
    try{
        const post = await Posts.findByPk(id);
        if(!post) return res.status(400).json({ message: "No Found 1"});
        const createdComment = await Comments.create({ comment, user_id:req.userId, post_id: id })
        if(createdComment) return res.status(200).json({ message: "Success"}); 
        return res.status(500).json({ message: "Please try again"}); 
    } catch(error){
        return res.status(500).json(error);
    }
}

module.exports = { getPosts, getPostBySearch, getPost, createPost, updatePost, deletePost, likePost, commentPost }