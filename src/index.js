const express = require('express');
const comp = require('../utils/compare');
const app = express();

const port = 5000;
const address= `http://localhost:${port}`;

app.listen(port , ()=>{
    console.log(`app is opened at : ${address}`);
})
// to call the compare 
app.get('/compare',comp.compare);
// to get the difference
app.get('/compare/differ' , comp.getDifferencies);