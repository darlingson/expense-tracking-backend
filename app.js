const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const routes = require('./routes');
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});