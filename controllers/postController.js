const Post = require("../models/Post");
const getProfileId = require("../utils/profile");
const cloudinary = require("cloudinary").v2
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const fileUpload = require("../utils/fileUpload");
const Comment = require("../models/Comment")

const deleteImageCloudinary = async (id) => {

            const { image } = await Post.findById(id);
            
            await image.map(img => cloudinary.uploader.destroy(img.cloudinary_id))
}

exports.createPost = catchAsync(async (req, res, next) => {

            const { caption, location } = req.body;

            const files = req.files;
            
            let image = []
            for (const file of files) {

                        const newPath = await fileUpload(file)
                       
                        image.push({
                                    cloudinary_id: newPath.public_id,
                                    url: newPath.secure_url
                        })
            }

            const post = await Post.create(
                        { 
                                    user: req.user.id,
                                    image: image, 
                                    caption, 
                                    location, 
                                    profile: req.profile 
                         }
                         )

            res.status(201).json({
                        status: "success",
                        post
            })
})


exports.getAllPost = catchAsync(async (req, res, next) => {

            const posts = await Post.find().populate({
                        path: "profile",
                        select: "-bio -website  -_v"

            }).populate({
                        path: "likes",
                        select: "-_id -bio -website -_v"
            }).populate({
                        path: 'commentPost',
                        populate: {
                                    path: "profile",
                                    model: "Profile"
                        }
            })

            res.status(200).json({
                        status: "success",
                        data: posts.length,
                        posts
            })
})

exports.getPostById = catchAsync(async (req, res, next) => {

            const post = await Post.findById(req.params.id).populate({
                        path: "profile",
                        select: "-_id -bio -website -user -_v"

            }).populate({
                        path: "likes",
                        select: "-_id -bio -website -_v"
            })

            if (!post) {
                        return next
                        (
                                    new AppError("Post not found", 400)
                        )
            }

            res.status(200).json({
                        status: "success",
                        post
            })
})

exports.deletePost = catchAsync(async (req, res, next) => {

            //const post = await Post.deleteOne({ _id: req.params.id });
            const post = await Post.findById(req.params.id);
            if (!post) {
                        return next
                        (
                                    new AppError("Post not found", 400)
                        )
            }
            //  console.log(post, post.user.toString() === req.user.id)
            if (post.user.toString() !== req.user.id) {
                        return next
                        (
                                    new AppError("You are not authorized to delete this post", 401)
                        )
            }

            post.commentsPost.length && 
                        await Comment.findByIdAndDelete(post.commentsPost[0]._id)
            
            await deleteImageCloudinary(req.params.id)
            await post.remove()

            res.status(200).json({
                        message: 'deleted'
            })
})

exports.likePost = catchAsync(async (req, res, next) => {
            const post = await Post.findById(req.params.id);
            if (!post) {
                        return next
                        (
                                    new AppError("Post not found", 400)
                        )
            }
            const id = await post.getProfileId(req.user.id);
            
            if (post.likes.includes(id)) {
                        const index = post.likes.indexOf(id)
                        post.likes.splice(index, 1);
                        await post.save();
            } else {
                        post.likes.push(id);
                        await post.save();
            }
            
            res.status(200).json({
                        status: "success"
            })

})