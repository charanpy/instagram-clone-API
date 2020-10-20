const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = () => {
            cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD,
                        api_key: process.env.CLOUDINARY_KEY,
                        api_secret: process.env.CLOUDINARY_SECRET
            });
}

module.exports = cloudinaryConfig;



  // const profile = await Profile.findOne({ user: req.user.id });
            // console.log(profile);
            // if (!profile) {
            //             const userProfile = { user: req.user.id, ...req.body }
            //             const createProfile = await Profile.create(userProfile);
            //             return res.status(201).json({
            //                         status: "success",
            //                         data: {
            //                                     profile: createProfile
            //                         }
            //             })
            // }