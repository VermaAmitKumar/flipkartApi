const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
let app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var ImageDir = path.join(__dirname, '../assets/images/');
var ThumbnailImageDir = path.join(__dirname, '../assets/images/thumbnail/');
app.use('/images', express.static(ImageDir));
app.use('/images/thumbnail', express.static(ThumbnailImageDir));
app.use(require('../controller'));
let port = process.env.PORT || 4000;
app.listen(port);

