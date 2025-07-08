const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { upload: uploadCtrl, getOne, getAll } = require('../controllers/imageController');

router.post('/upload', upload.single('image'), uploadCtrl);
router.get('/image/:key', getOne);
router.get('/images', getAll);

module.exports = router;
