const express = require('express');
const postController = require('../controllers/postController.js');
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const upload = multer({
    storage: multer.diskStorage({
        destination: "src/public/uploads",
        filename: function(req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${uuidv4()}${ext}`;
            cb(null, fileName);
        }
    })
});

router.get('/', postController.getPost);
router.get('/:id', postController.getPostById);

router.post('/', upload.array("file"), postController.createPost);
router.patch('/:id', upload.array("file"), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;