const express = require('express');
const app = new express(dotenv);
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '{2020-06-08}',
  authenticator: new IamAuthenticator({
    apikey: 'mVPAuVUngnv_QRgzrMCav8CyRkTMpLjXbwj4QKVja09x',
  }),
  serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/87754fa9-88f4-4be2-87ff-ec3b1448bc6a',
  });
    return naturalLanguageUnderstanding;
}
