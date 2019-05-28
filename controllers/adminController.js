module.exports = {

    index: (req,res)=>{

        res.render('admin/index')
    },
    getPosts: (req,res)=>{

        res.send("this is posts page")
    },
    submitPost: (req,res)=>{

        res.send("this is submit post")
    },
    createPost: (req,res)=>{

        res.send("this is create page")
    }

}