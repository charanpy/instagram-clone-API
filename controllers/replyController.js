
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
//const getProfileId = require("../utils/profile");
const Comment = require("../models/Comment");

//check comment is in db
exports.checkComment = async (req, res, next) => {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                        return next(new AppError("Comment not found", 400))
            }
            next();
}

//reply to a comment
exports.createComment = catchAsync(async (req, res, next) => {
            const id = req.profile
            const comment = await Comment.findById(req.params.id);

            if (!comment) return next
            (
                        new AppError("Comment not found", 400)
            )
            
            comment.reply.unshift({
                        profiles: id,
                        reply: req.body.reply,
                        user: req.user.id
            })
            await comment.save();
            
            res.status(201).json({
                        status: "success",
                        comment
            })
})

//like/unlike a replied comment
exports.likeReply = catchAsync(async (req, res, next) => {
            const id = req.profile;
            
            const comment = await Comment.findOne({
                        _id: req.params.id, 
                        reply: 
                                    { 
                                                $elemMatch:
                                                             { _id: req.params.replyId } 
                                    }
            })
            //  console.log(comment.reply[0].like)
            if (!comment) {
                        return next(new AppError("Reply not found", 400))
            }
            
            const checkLike = comment.reply[0].like.findIndex(like => like._id.toString() === id.toString())
            
            if (checkLike >= 0) {
                        comment.reply[0].like.splice(checkLike, 1)
                        await comment.save();
            } else {
                        comment.reply[0].like.unshift(id);
                        await comment.save();
            }

            res.status(200).json({
                        status: "success",
                        comment
            })


})

//delete reply
exports.deleteReply = catchAsync(async (req, res, next) => {
            
            const post = await Comment.findOne({
                        _id: req.params.id
                        , reply: {
                                    $elemMatch:
                                                { _id: req.params.replyId }
                        }
            })

            if (!post) return next
            (
                        new AppError("Cannot find comment", 400)
            )
            
            return post.reply[0].user.toString() === req.user.id.toString() ? 
            (
                        post.reply.splice(0, 1),
                        await post.save(),
                        res.json({
                                    status: "success"
                        })
            ) : (
                                    next(new AppError("You are not authorized to delete this reply comment", 401))
                        )

})



 // if (comment.reply[0].like.includes(id)) {
            //             const replyIndex = comment.reply[0].like.indexOf(id);
            //             comment.reply[0].like.splice(replyIndex, 1)
            //             await comment.save();

            // } else {
            //             console.log(true)
            //             comment.reply[0].like.unshift(id)
            //             await comment.save()
            // }
