const Profile = require("../models/Profile");
const catchAsync = require("../utils/catchAsync")
const { validationResult } = require("express-validator")
const AppError = require("../utils/appError")
const fileUpload = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2
const Post = require("../models/Post")


exports.profileValidations = (req, res, next) => {
    if (req.body.accountType) return next(new AppError("This is invalid route for changing account type", 400))

        next();
}



const deletePhotoCloudinary = async (id) => await cloudinary.uploader.destroy(id)

const uploadPhotoCloudinary = async (file) => {
    if (file.mimetype.slice(0, 5) === "video") {
        return next(new AppError("Please upload valid image", 400))
    }
    const { public_id, secure_url } = await fileUpload(file)

    return {
        public_id,
        secure_url
    }
}



exports.getProfiles = catchAsync(async (req, res, next) => {

    const profiles = await Profile.find({}).populate("followers").populate("followings")
    if (!profiles) {
        return next(new AppError("No profile found", 400))
    }
    res.status(200).json({
        status: "success",
        docs: profiles.length,
        data: {
            profiles
        }
    })
})

exports.updateProfile = catchAsync(async (req, res, next) => {

    const errors = validationResult(req);

            //^Checking validation errors
            if (!errors.isEmpty()) {
                return next(new AppError(errors.array()[0].msg, 400))
            }


            const updatedProfile = await Profile.findOneAndUpdate({ user: req.user.id }, req.body, {
                new: true,
                runValidators: true
            })
            return res.status(200).json({
                status: "success",
                data: {
                    profile: updatedProfile
                }
            })

        })

exports.getProfileById = catchAsync(async (req, res, next) => {
    const profile = await Profile.findById(req.params.userId)
    
    if (!profile) {
        return next(new AppError("No profile found", 400))
    }
    
    res.status(200).json({
        status: "success",
        data: {
            profile
        }
    })
})



exports.uploadPhoto = catchAsync(async (req, res, next) => {
    console.log(req.file)
    const photo = await uploadPhotoCloudinary(req.file);
    
    const profile = await Profile.findOneAndUpdate({ user: req.user.id }, { photo }, { new: true });
    res.status(200).json({
        success: "true",
        profile
    })
})

exports.updatePhoto = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne(
        { user: req.user.id }
        );
    await deletePhotoCloudinary(profile.photo.public_id);

    const photo = await uploadPhotoCloudinary(req.file);
    profile.photo = photo;
    profile.save();
    res.status(200).json({
        status: 'success',
        profile
    })
})

exports.deletePhoto = catchAsync(async (req, res, next) => {

    const profile = await Profile.findOne(
        { user: req.user.id }
        );

    await deletePhotoCloudinary(profile.photo.public_id);
    profile.photo = process.env.DEFAULT_PROFILE_PHOTO
    await profile.save();

    res.status(200).json({
        status: "success",
        profile
    })
})

const searchHashtag = async (query) => {
    const queryField = new RegExp("^" + query)
    const result = await Post.find({ hashtag: { $in: [queryField] } })
    return result;

}

exports.search = catchAsync(async (req, res, next) => {

    if (req.query.find[0] === "#") {
        const hashtag = await searchHashtag(req.query.find.slice(1))
        return res.status(200).json({
            status: "success",
            data: hashtag.length,
            hashtag
        })
    }
    const queryField = new RegExp("^" + req.query.find)

    const result = await Profile.find({ username: { $regex: queryField } })

    res.status(200).json({
        status: "success",
        data: result.length,
        users: result
    })
})


const followRequest = async(id,profile)=> {
    
    const request = await Profile.findByIdAndUpdate(id, {
        $push: { requests: profile }
    }, { new: true })
    if (!request) return next(new AppError("User not found", 400))
     
        return request
    
}

exports.follow = catchAsync(async (req, res, next) => {

    req.profile.toString() === req.body.id.toString() && (
        next(new AppError("You cant follow yourself", 400)
            ))
    
    if(req.body.accountType ==="private") {
     const request=  followRequest(req.body.id,req.profile) 

     return res.status(200).json({
         data:request
     })
 }

 await Profile.findByIdAndUpdate(req.body.id, {
    $push: { followers: req.profile }
}, { new: true })

 const following = await Profile.findOneAndUpdate({ user: req.user.id }, {
    $push: {
        following: req.body.id
    }
}, { new: true })

 res.status(200).json({
    status: "success",
    following
})
 
})
//Todo unfollow
exports.unfollow = catchAsync(async (req, res, next) => {
    req.user.id === req.params.id && (
        next
        (new AppError("You cant unfollow yourself", 400))
        )
    await Profile.findByIdAndUpdate(req.body.id, {
        $pull: { followers: req.profile }
    }, { new: true })

    const following = await Profile.findOneAndUpdate({ user: req.user.id }, {
        $pull: {
            following: req.body.id
        }
    }, { new: true })

    res.status(200).json({
        status: "success",
        following
    })
})


exports.userSettings = catchAsync(async (req, res, next) => {
    const user = await Profile.findOneAndUpdate({ user: req.user.id }, 
        { accountType: req.body.account },
        {new:true}
        )
    
    if (!user) return next(new AppError("No user found", 400))
      
        res.status(200).json({
            status: "success",
            user
        })
})


exports.getFollowRequest = catchAsync(async (req, res, next) => {
    const user = await Profile.findOne(
        { user: req.user.id }
        ).select("+accountType")
    console.log(user)
    if (!user || user.accountType === 'public') {
        return next(new AppError("Not authorized to access this route", 400))
    }
    if (user.requests.length === 0) return res.status(200).json({ data: "No follow requests" })
        res.status(200).json({
            data: user.requests
        })
})

exports.acceptRequest = catchAsync(async (req, res, next) => {
    const user = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $pull: 
            { requests: req.body.id } 
        })
    user.followers.unshift(req.body.id)
    await user.save();

    const updateUser = await Profile.findByIdAndUpdate(req.body.id, 
        { $push: 
            { following: req.profile } 
        })
    res.status(200).json({
        data: updateUser
    })
})