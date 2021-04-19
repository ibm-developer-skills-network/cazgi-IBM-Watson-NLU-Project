const express = require('express');
const dotenv = require('dotenv')
const app = new express();
dotenv.config();


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let analyzer = getNLUInstance();
    let url = req.query.url;
    console.log(url);
    const analyzeParams = {
        'url': url,
        'features': {
          'entities': {
            'emotion': true,
            // 'sentiment': true,
            'limit': 1,
          },
          'keywords': {
            'emotion': true,
            // 'sentiment': true,
            'limit': 1,
          },
        },
      };
      
      analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            // console.log(JSON.stringify(analysisResults.result.keywords, null, 2));
            let results = analysisResults.result.entities;
            // let keywords = Object.entries(results);
            console.log(results);
            let resultList = results.map((feedback)=>{
                const payload=feedback.emotion;
            //     // sent = feedback.sentiment.label;
            // let emot = results.emotion;
                return res.send(payload);
            
            });
            // return res.send(resultList);
        })
        .catch(err => {
          console.log('error:', err);
          return res.sendStatus(err.code);
        });

    // return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    let analyzer = getNLUInstance();
    let url = req.query.url;
    console.log(url);
    const analyzeParams = {
        'url': url,
        'features': {
          'entities': {
            // 'emotion': true,
            'sentiment': true,
            'limit': 1,
          },
          'keywords': {
            // 'emotion': true,
            'sentiment': true,
            'limit': 1,
          },
        },
      };
      
      analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            // console.log(JSON.stringify(analysisResults.result.keywords, null, 2));
            let results = analysisResults.result.entities;
            // let keywords = Object.entries(results);
            console.log(results);
            let resultList = results.map((feedback)=>{
                let sentiment = feedback.sentiment.label;
                return res.send(sentiment);
                
            
            });
            // return res.send(resultList);
        })
        .catch(err => {
          console.log('error:', err);
          return res.sendStatus(err.code);
        });
    // return res.send("url sentiment for "+req.query.url);
});

app.get("/text/sentiment", (req,res) => {
    let analyzer = getNLUInstance();
    let text = req.query.text;
    console.log(text);
    const analyzeParams = {
        'text': text,
        'features': {
          'entities': {
            // 'emotion': true,
            'sentiment': true,
            'limit': 1,
          },
          'keywords': {
            // 'emotion': true,
            'sentiment': true,
            'limit': 1,
          },
        },
      };
      
      analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            // console.log(JSON.stringify(analysisResults.result.keywords, null, 2));
            let results = analysisResults.result.keywords;
            // let keywords = Object.entries(results);
            console.log(results);
            let resultList = results.map((feedback)=>{
                let sentiment = feedback.sentiment.label;
                return res.send(sentiment);
                
            
            });
            // return res.send(resultList);
        })
        .catch(err => {
          console.log('error:', err);
          return res.sendStatus(err.code);
        });
    // return res.send({"happy":"10","sad":"90"});
});

app.get("/text/emotion", (req,res) => {
    let analyzer = getNLUInstance();
    let text = req.query.text;
    console.log(text);
    const analyzeParams = {
        'text': text,
        'features': {
          'entities': {
            'emotion': true,
            // 'sentiment': true,
            'limit': 1,
          },
          'keywords': {
            'emotion': true,
            // 'sentiment': true,
            'limit': 1,
          },
        },
      };
      
      analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            // console.log(JSON.stringify(analysisResults.result.keywords, null, 2));
            let results = analysisResults.result.keywords;
            // let keywords = Object.entries(results);
            // console.log(results);
            let resultList = results.map((feedback)=>{
                let payload=feedback.emotion;
            //     // sent = feedback.sentiment.label;
            // let emot = results.emotion;
                console.log(payload)
                return res.send(payload);
            
            });
            // return res.send(resultList);
        })
        .catch(err => {
          console.log('error:', err);
          return res.sendStatus(err.code);
        });
    // return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLang = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnder = new NaturalLang({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
        apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnder;
}

