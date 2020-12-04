const express = require('express');
const app = new express();


const cors_app = require('cors');
app.use(cors_app());

app.get("/url/:url", (req,res) => {
    return res.send({"input":req.params.url,"sentiment":"neutral"});
});

app.get("/text/:text", (req,res) => {
    return res.send({"input":req.params.text,"sentiment":"neutral"});
});

app.listen(3333, () => {
    console.log(`listening at http://localhost:3333`)
});

