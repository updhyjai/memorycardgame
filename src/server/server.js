const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const request = require('request')
app.use(bodyParser.json());
const store = require('store');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',(req,res)=>{
    res.send('HI');
})

app.get('/getdeck',(req,res)=>{
    request('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',(err, response,body)=>{
        console.log(err);
        res.send(body);
    })
})

app.get('/draw',(req,res)=>{
    request('https://deckofcardsapi.com/api/deck/new/draw/?count=9',(err,response,body)=>{
        
            console.log('Err: ',err);
    //    console.log(body);
        res.send(body);
    })
})

app.post('/savescore',(req,res)=>{
    console.log('Hi savescore', req.body)
    let name = req.body.name;
    let turns = req.body.turns;
    if(!name || !turns){
        res.status(400).send('Missing required data to save.')
    }
    let scoreBoard = store.get('scores');
    console.log('score from store', scoreBoard)
    if(!scoreBoard){
        store.set('scores',JSON.stringify([req.body]));
    }else{
        let scoreArray = JSON.parse(scoreBoard);
        let updatedScore = [...scoreArray, req.body]
        console.log(updatedScore);
        store.set('scores',JSON.stringify(updatedScore));
    }
    console.log(name, turns);
    res.status(200).send('Scores have been updated.');
})

app.get('/resetscore',(req,res)=>{
    console.log('SCores will be erased');
    store.clearAll();
    res.status(200).send('Scores have been erased successfully.');
})

app.get('/getscore',(req,res)=>{
    let scoreBoard = store.get('scores');
    if(!scoreBoard){
        res.send([]);
    }else{
        res.send(scoreBoard);
    }
})






app.listen(8000,()=>{console.log("Server is running at port: 8000")});