const express = require('express');
const app = new express();
// race
const dotenv = require('dotenv') //
dotenv.config()

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = 
        require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version:'2020-08-01',
      authenticator: new IamAuthenticator({
          apikey: api_key,
      }),
        serviceUrl: api_url  
    });
    return naturalLanguageUnderstanding
}
app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    console.log( "index.html");
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    console.log( "/url/emotion");
    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    console.log( "/url/sentiment");
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    console.log('/text/emotion');
    console.log( req.query.text);
    nlu = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
                'emotion': true,
                //'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                //'sentiment': true,
                'limit': 2,
            },
        },
    };
    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 3));
            ret = JSON.stringify(analysisResults.result.keywords[0].emotion, null, 3);
            return res.send("text sentiment for "+req.query.text + ret);
      //return res.send("text sentiment for "+req.query.text);
        })
        .catch(err => {
            console.log('error:', err);
        });
    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    console.log('/text/senitment');
    console.log( req.query.text);
    nlu = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
               // 'emotion': true,
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
               // 'emotion': true,
                'sentiment': true,
                'limit': 2,
            },
        },
    };
    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment, null, 3));
            ret = JSON.stringify(analysisResults.result.keywords[0].sentiment, null, 3);
            return res.send("text sentiment for "+req.query.text + ret);
      //return res.send("text sentiment for "+req.query.text);
        })
        .catch(err => {
            console.log('error:', err);
        });

    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
