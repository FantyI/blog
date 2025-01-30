import PostModel from '../module/Post.js';




export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({ path: 'author', select: ["fullName", "avatarUrl"] }).exec();
        res.json(posts)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Статьи не найдены',
        })
    }
}

export const getPopular = async(req, res) => {
    try{
        const postPopular = PostModel.find()
        console.log(postPopular)
    } catch(err){
        res.json({
            err,
            msg: 'Статьи не найдены',
        })
    }
}

export const get = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!await PostModel.findById(postId)) {
            return res.status(404).json({
                msg: 'Статья не найдена'
            })
        }

        const post = await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            },
        ).populate('author')
        console.log(post)
        res.json(post)
    }
    catch (err) {
        console.log(err)
        res.json({
            msg: 'Статья не найдена',
        })
    }
}


export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        console.log()

        if (!await PostModel.findById(postId)) {
            return res.status(404).json({
                msg: 'Статья не найдена'
            })
        }

        await PostModel.findOneAndDelete({
            _id: postId
        })

        res.json({
            _id: postId,
            msg: "Статья удалина"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Произошла ошибка'
        })
    }
}


export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tag: req.body.tags.split(','),
            imageUrl: req.body.imageUrl,
            author: req.userId,
        })
        console.log(doc)
        const post = await doc.save()
        console.log(post)
        res.json({ post })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось создать статью'
        })
    }


}
export const updete = async (req, res) => {
    try{
        console.log(req)
        const postId = req.params.id;

        if (!PostModel.findById(postId)) {
            return res.status(404).json({
                msg: 'Статья не найдена'
            })
        }

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            tag: req.body.tags.split(','),
            imageUrl: req.body.imageUrl,
            author: req.userId,
        })

        return res.json({
            msg: 'Статья обнавлена'
        })
    }
    catch(err){
        console.log(err)
        return res.status(404).json({
            msg: 'Статья не найдена'
        })
    }
}



