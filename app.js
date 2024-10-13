const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json());


app.post('/getResponse', async(req, res) => {
  console.log(req.body.question)

  const genAI = new GoogleGenerativeAI('AIzaSyCvv6n29n-qMioieo-Vz1GxnRcwkJ9Yzz4');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  
   model.generateContent(req.body.question).then(result=>{
    console.log(result.response.text());
    const response = result.response.text()
    res.status(200).json({
      response:response
    })
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
   })
})


module.exports = app;