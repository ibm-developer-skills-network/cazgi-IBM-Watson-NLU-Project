const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

// const dotenv = require('dotenv');
// dotenv.config();

// const api_key = process.env.API_KEY;
// const api_url = process.env.API_URL;

function getNLUInstance() {
    /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/
}


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
    // //Extract the url passed from the client through the request object
    // let urlToAnalyze = req.query.url
    // const analyzeParams = 
    //     {
    //         "url": urlToAnalyze,
    //         "features": {
    //             "keywords": {
    //                             "emotion": true,
    //                             "limit": 1
    //                         }
    //         }
    //     }
     
    //  const naturalLanguageUnderstanding = getNLUInstance();
     
    //  naturalLanguageUnderstanding.analyze(analyzeParams)
    //  .then(analysisResults => {
    //     //Please refer to the image to see the order of retrieval
    //     return res.send(analysisResults.result.keywords[0].emotion,null,2);
    //  })
    //  .catch(err => {
    //  return res.send("Could not do desired operation "+err);
    //  });
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

