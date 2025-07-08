const express = require('express');
const app = express();
const imageRoutes = require('./routes/imageRoutes');
require('dotenv').config();
const { PORT } = require('./config');

app.use(express.json());
app.use('/', imageRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
