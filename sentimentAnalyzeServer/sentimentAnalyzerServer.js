const express = require('express');
const dotenv = require("dotenv");
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
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

function getNLUInstance() {
    /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator ({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
    let urlToAnalyze = req.query.url
    const analyzeParams = 
    {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the emotion and return it as a formatted string
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
    })
    .catch(err => {
        return res.send("Could not do desired operation "+err);
    });
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req,res) => {
    let urlToAnalyze = req.query.url
    const analyzeParams = 
    {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the sentiment and return it as a formatted string

        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
    })
    .catch(err => {
        return res.send("Could not do desired operation "+err);
    });
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req,res) => {
    let textToAnalyze = req.query.text
    const analyzeParams = 
    {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the emotion and return it as a formatted string

        return res.send(analysisResults.result.keywords[0].emotion,null,2);
    })
    .catch(err => {
        return res.send("Could not do desired operation "+err);
    });
});

app.get("/text/sentiment", (req,res) => {
    let textToAnalyze = req.query.text
    const analyzeParams = 
    {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the sentiment and return it as a formatted string

        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
    })
    .catch(err => {
        return res.send("Could not do desired operation "+err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

