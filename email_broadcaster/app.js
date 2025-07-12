const express = require('express');
const app = express();
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', emailRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
