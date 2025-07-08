const { uploadImage, getImageUrl, listImages } = require('../services/s3Service');

const upload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No image provided' });

    const result = await uploadImage(file);
    res.status(201).json({ message: 'Image uploaded', ...result, expiresInMinutes: 1 });

  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const url = await getImageUrl(req.params.key);
    res.redirect(url);
  } catch (err) {
    console.error('GET ERROR:', err);
    res.status(500).json({ error: 'Fetch failed', details: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const keys = await listImages();
    res.json({ images: keys });
  } catch (err) {
    console.error('LIST ERROR:', err);
    res.status(500).json({ error: 'List failed', details: err.message });
  }
};

module.exports = { upload, getOne, getAll };
