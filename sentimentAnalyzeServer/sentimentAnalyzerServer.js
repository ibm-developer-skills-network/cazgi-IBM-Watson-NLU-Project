const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: "X_sieVNEsxgvN0DeD7fUgOqOwnpA-CkFcoEIIEpv6YPD",
    }),
    serviceUrl: "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/ce37dd70-70cf-4027-9729-bb19952c86d7",
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const analyzeParamsEmotion = {
        'url': req.query.url,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }
    
    getNLUInstance().analyze(analyzeParamsEmotion)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
    console.log('error:', err);
    });
    
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {

    const analyzeParamsSentiment = {
        'url': req.query.url,
        'features': {
            'sentiment': {
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsSentiment)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {

    const analyzeParamsEmotion = {
        'text': req.query.text,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsEmotion)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {

    const analyzeParamsSentiment = {
        'text': req.query.text,
        'features': {
            'sentiment': {
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsSentiment)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
