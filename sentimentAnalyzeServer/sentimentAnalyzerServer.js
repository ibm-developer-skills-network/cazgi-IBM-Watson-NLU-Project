//Define the constants as shown
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//define the function using the watson Natural language Understanding as shown in the lab
function getNLUInstance() {
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

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

//Starting with the TEXT
//Code built with the help of the ibm cloud documentation. ctrl+click the link below for more info
//https://cloud.ibm.com/apidocs/natural-language-understanding?code=node&cm_mmc=Email_Newsletter-_-Developer_Ed%2BTech-_-WW_WW-_-SkillsNetwork-Courses-IBMDeveloperSkillsNetwork-CD0220EN-SkillsNetwork-20363180&cm_mmca1=000026UJ&cm_mmca2=10006555&cm_mmca3=M12345678&cvosrc=email.Newsletter.M12345678&cvo_campaign=000026UJ&cm_mmc=Email_Newsletter-_-Developer_Ed%2BTech-_-WW_WW-_-SkillsNetwork-Courses-IBMDeveloperSkillsNetwork-CD0220EN-SkillsNetwork-20363180&cm_mmca1=000026UJ&cm_mmca2=10006555&cm_mmca3=M12345678&cvosrc=email.Newsletter.M12345678&cvo_campaign=000026UJ#analyze

app.get("/text/emotion", (req,res) => {
    //define the input to feed through the NLU
    const input= {
        'text': req.query.text,  //This takes the text entered in the the text-box in the application
        'features': {
            'emotion': {  // we want the emotions
            'limit': 5 //5 emotions 
            }
        }
    }
    //Calling the function previosly defined which uses the ibm NLU 
    getNLUInstance()
        .analyze(input) //Feeding it the input created before
        //This is basically copy paste from the IMB cloud documentation
        .then(analysisResults => { 
            console.log(JSON.stringify(analysisResults, null, 2)); //printing in the console (always handy)
            return res.send(analysisResults.result.emotion.document.emotion); // this is the only line that i had to add in order to print on the screen the emotions.
    })
    .catch(err => {
        console.log('error:', err);
    });
});

// Same process, only difference is the input since this time we want to caputre the sentiment.
app.get("/text/sentiment", (req,res) => {
    const input = {
        'text': req.query.text,
        'features': {
            'sentiment': { //capture the overall sentiment of the text
            }
        }
    }
    //same as before.
    getNLUInstance()
        .analyze(input)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.sentiment.document.label); //getting the sentiment out.
    })
    .catch(err => {
        console.log('error:', err);
    });
});

// Now the URL which is basically the same, only a little change in the input

app.get("/url/emotion", (req,res)=> {
    //define the input to feed through the NLU
    const input= {
        'url': req.query.url, 
        'features': {
            'emotion': {  // we want the emotions
            'limit': 5 //5 emotions 
            }
        }
    }
    //Calling the function previosly defined which uses the ibm NLU 
    getNLUInstance()
        .analyze(input) //Feeding it the input created before
        //This is basically copy paste from the IMB cloud documentation
        .then(analysisResults => { 
            console.log(JSON.stringify(analysisResults, null, 2)); //printing in the console (always handy)
            return res.send(analysisResults.result.emotion.document.emotion); // this is the only line that i had to add in order to print on the screen the emotions.
    })
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/url/sentiment", (req,res) => {
    const input = {
        'url': req.query.url,
        'features': {
            'sentiment': { //capture the overall sentiment from the url
            }
        }
    }
    //same as before.
    getNLUInstance()
        .analyze(input)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.sentiment.document.label); //getting the sentiment out.
    })
    .catch(err => {
        console.log('error:', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})