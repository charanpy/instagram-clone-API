const multer = require("multer");
const path = require("path");
const AppError = require("./appError")
module.exports = multer({
            storage: multer.diskStorage({}),
            fileFilter: (req, file, cb) => {
                        let ext = path.extname(file.originalname);
                        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.mp4') {
                                    // cb(new Error(`File type ${ext} not supported`), false)
                                    return cb(new AppError(`File type ${ext} not supported`, 400))
                        }
                        cb(null, true)
            }
})