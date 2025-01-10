const express = require('express');
const bodyParser = require('body-parser');
const { router: authRouter } = require('./auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
