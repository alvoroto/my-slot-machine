const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Play = require('../models/Play');

const symbolNumber = 3;
const symbolList = [0,1,2]


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/plays', (req, res, next)=>{
  Play.find().populate("player")
  .then(plays=>{
    console.log(plays)
    res.status(200).json({data:{plays}})
  })
  .catch(err => res.status(500).json({data: err}));
});

router.get('/newPlay', (req, res, next)=>{
  
  let symbols = []
  for(let i=0; i< symbolNumber; i++){
      symbols.push(symbolList[Math.floor(Math.random() * symbolNumber)])
  }
  
  res.status(200).json({data:{symbols}})
  
});

router.post('/save', (req,res,next) => {
    Play.create(req.body)
    .then(newPlay => {
        console.log("ok")
      .catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
})

module.exports = router;
