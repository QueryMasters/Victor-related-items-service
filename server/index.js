const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.client('__dirname' + /../client/dist));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
  