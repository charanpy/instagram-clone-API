

// exports.getComment = catchAsync(async (req, res, next) => {
//             const comment = await Comment.findById(req.params.id).populate({
//                         path: "profile",
//                         select: "user username name photo "
//             })
//                         .populate({
//                                     path: "likes",
//                                     select: "user username name photo "
//                         })
//                         .populate("reply.like")
//                         .populate("reply.profiles")
//             res.status(200).json({
//                         comment
//             })
// })

// exports.getAllComments = catchAsync(async (req, res, next) => {
//             const comments = await Comment.find().populate({
//                         path: "profile",
//                         select: "user username name photo "
//             })
//                         .populate({
//                                     path: "likes",
//                                     select: "user username name photo "
//                         })
//                         .populate("reply.like")
//                         .populate("reply.profiles")

//             //  await Comment.deleteMany();
//             res.status(200).json({
//                         data: comments.length,
//                         comments
//             })
// })

