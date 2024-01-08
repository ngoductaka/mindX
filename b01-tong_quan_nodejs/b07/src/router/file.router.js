const { Router } = require("express");
const { authController } = require('../controller');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log('file', file);
        // if(file.mimetype == 'image/jpeg')
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

const authRouter = Router();

authRouter.post('/avatar', upload.single('avatar'), (req, res) => {
    res.json(req.file);
});


module.exports = authRouter;
