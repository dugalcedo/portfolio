import express from 'express'
const postController = express.Router()

import { Post, User } from '../../database/sequelize.js'

// Helper
async function getAuthors(posts) {
    const memo = []
    for (let i = 0; i < posts.length; i ++) {
        const post = posts[i]
        if (memo[post.userId]) { // if author already retrieved
            post.author = memo[post.userId].username
            post.avatar = memo[post.userId].avatar
        } else { // author not in memo
            const user = await User.findOne({where:{id: post.userId}})
            post.author = user.username
            post.avatar = user.avatar
            memo[post.userId] = user
        }
    }
    return posts
}

// Get posts
postController.get('/:allOrSelf', async (req, res) => {
    const self = req.params.allOrSelf === 'self'
    const user = await req.verifyToken()

    let posts
    if (self) {
        posts = await Post.findAll({where:{userId: user.id}})
    } else {
        posts = await Post.findAll({})
    }

    posts = posts.map(p => p.dataValues)
    posts = await getAuthors(posts)

    res.json(posts.reverse())
})

// Create post
postController.post('/', async (req, res) => {
    const user = await req.verifyToken()
    // console.log(user)
    try {
        const newPost = await Post.create({
            userId: user.id,
            content: req.body.content
        })
        res.json({msg: 'Success'})
    } catch (error) {
        console.log(`### FAILED creating post ###`)
        console.log(error)
        res.json({msg: 'Failure'})
    }
})

// helper
async function getUserAndPost(req, res, next) {
    const user = await req.verifyToken()
    if (!user) {
        res.status(400).json({msg: 'Bad token'})
        return
    }

    const post = await Post.findOne({where: {id: req.body.id}})
    if (!post) {
        res.status(404).json({msg: 'Post not found'})
        return
    }

    req.user = user
    req.post = post
    next()
}

// Edit post
postController.put('/', getUserAndPost, async (req, res) => {
    const {post} = req
    const {content} = req.body

    post.content = content

    await post.save()

    res.json({msg: 'Success'})
})

// Delete post
postController.delete('/', getUserAndPost, async (req, res) => {
    const {post} = req

    await post.destroy()
    res.json({msg: 'Success'})
})

export default postController