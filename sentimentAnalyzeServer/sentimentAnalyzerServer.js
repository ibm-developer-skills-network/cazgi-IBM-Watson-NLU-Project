const express = require('express');
const app = new express();
const dotenv = require('dotenv')
const url_helper = require('url');

dotenv.config();

function getNLUInstance() {
   let api_key = process.env.API_KEY;
   let api_url = process.env.API_URL;

   const NaturalLanguageUnderstangingV1 = require('ibm-watson/natural-language-understanding/v1');
   const {IamAuthenticator} = require('ibm-watson/auth');

   const naturalLanguageUnderstanding = new NaturalLanguageUnderstangingV1({
       version: '2021-05-15',
       authenticator: new IamAuthenticator({
           apikey:api_key,
       }),
       serviceUrl: api_url,
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
    const queryObject=url_helper.parse(req.url,true).query;
    const url_to_analyze = queryObject.url;
    const analyzeOptions = {
        'url':`${url_to_analyze}`,
         'features': {  
             'emotion': {
                 'document': true
             }
        }   
    }
    console.log(analyzeOptions);
    let analysis = "";   
    var result = "";
    getNLUInstance().analyze(analyzeOptions).then(analysisResults => {
    result = JSON.stringify(analysisResults, null, 2); res.send(analysisResults.result.emotion.document.emotion);})
    .catch(err => {
    console.log('error:', err);
    });
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

