const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let nlu = getNLUInstance();
    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': { }
        }
    }
    nlu.analyze(analyzeParams)
    .then(analysisResults => {
        return JSON.stringify(analysisResults.result.emotion.document, null, 2);
    });
});

app.get("/url/sentiment", (req,res) => {
    let nlu = getNLUInstance();
    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    }
    nlu.analyze(analyzeParams)
    .then(analysisResults => {
        return JSON.stringify(analysisResults.result.sentiment.document, null, 2);
    });
});

app.get("/text/emotion", (req,res) => {
    let nlu = getNLUInstance();
    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    }
    nlu.analyze(analyzeParams)
    .then(analysisResults => {
        return JSON.stringify(analysisResults.result.emotion.document, null, 2);
    });
});

app.get("/text/sentiment", (req,res) => {
    let nlu = getNLUInstance();
    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    }
    nlu.analyze(analyzeParams)
    .then(analysisResults => {
        return JSON.stringify(analysisResults.result.sentiment.document, null, 2);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

