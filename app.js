const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
// app.use(express.json())
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post("/postTrial",(req,res)=>{
  console.log(req.body);
  res.send(req.body)
})
const routes = require('./routes');
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});