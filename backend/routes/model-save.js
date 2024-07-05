const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const multer = require('multer');


// Set up the Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');   // Specify the upload directory (don't write relative paths)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const uploadDir = path.join(__dirname, `../../uploads`);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const multerUploadType = upload.any();


// Add a binding to handle '/model-save'
router.post('/', multerUploadType, async (req, res) => {
    req.files.forEach(file => {
        console.log(`Uploaded file: ${file.originalname}`);
    });
    res.status(200).send('Model uploaded and saved.');


});

module.exports = router;