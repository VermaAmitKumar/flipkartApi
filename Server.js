const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Sawagger/sawagger');

const cors = require('cors');
let app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var ImageDir = path.join(__dirname, '/assets/images/');
var ThumbnailImageDir = path.join(__dirname, '/assets/images/thumbnail/');
app.use('/images', express.static(ImageDir));
app.use('/images/thumbnail', express.static(ThumbnailImageDir));
app.use(require('./controller'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(4000);
