const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))


const cors_app = require('cors');
app.use(cors_app());
//console.log('PROCESS.env!!!!!', process.env)


function analyzeTextTest(text, cb) {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    const analyzeParams = {
        'text': text,
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
            },
        },
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log('ANALYZE TEXT RESULTS!', JSON.stringify(analysisResults, null, 2));
            cb(analysisResults)
        })
        .catch(err => {
            console.log('error:', err);
        });

}

function analyzeURL(url, cb) {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    const analyzeParams = {
    'url': url,
    'features': {
        'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2,
        },
        'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2,
        },
    },
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log('ANALYZE TEXT RESULTS!', JSON.stringify(analysisResults, null, 2));
            cb(analysisResults)
        })
        .catch(err => {
            console.log('error:', err);
        });

}




//analyzeTextTest()


function createSentModel() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const fs = require('fs');
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    const createSentimentModelParams = {
        language: 'en',
        trainingData: fs.createReadStream('./trainer.csv'),
        name: 'MySentimentModel',
        modelVersion: '1.0.1'
    };

    naturalLanguageUnderstanding.createSentimentModel(createSentimentModelParams)
        .then(createSentimentModelResults => {
            console.log('NLP Create response!!', JSON.stringify(createSentimentModelResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
}

//createSentModel()


function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    //console.log('API KEY!~!!', api_key)
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}



app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    //analyzeURL
    console.log('url!!!', req.query.url)
    analyzeURL(req.query.url, function (answer) {
        console.log('Answer !!!!', answer.result.keywords[0].emotion)
        res.json(answer.result.keywords[0].emotion)
    })

    // return res.send({ "happywhat": "90", "sad": "10" });
});

app.get("/url/sentiment", (req, res) => {
    console.log('url!!!', req.query.url)
    analyzeURL(req.query.url, function (answer) {
        console.log('Answer !!!!', answer.result.keywords[0].sentiment)
        res.json(answer.result.keywords[0].sentiment)
    })

});

app.get("/text/emotion", (req, res) => {
    analyzeTextTest(req.query.text, function (answer) {
        console.log('Answer !!!!', answer.result.keywords[0].sentiment)
        res.json(answer.result.keywords[0].emotion)
    })
});

app.get("/text/sentiment", (req, res) => {

    analyzeTextTest(req.query.text, function (answer) {
        console.log('Answer !!!!', answer.result.keywords[0].sentiment)
        res.json(answer.result.keywords[0].sentiment)
    })

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

