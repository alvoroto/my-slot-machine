const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login')
const User = require('../models/User');
const Play = require('../models/Play');

const reelNumber = 5;
const symbolNumber = 3;
const symbolList = [0,1,2]


/* GET home page */
router.get('/',ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
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
  let newReels = []
  for(let i=0; i<reelNumber; i++){
    symbols = []
    for(let j=0; j< symbolNumber; j++){
        symbols.push(symbolList[Math.floor(Math.random() * symbolNumber)])
    }
    newReels.push({id:i,
        symbols:symbols
      })
  }

  //calcular el premio
  let credits = 0;
  let reward = 0;
  let firstSymbol;
 
  firstSymbol = newReels[0].symbols[1]
  if(firstSymbol == newReels[1].symbols[1] &&
      firstSymbol == newReels[2].symbols[1] ){
          if(firstSymbol
              == newReels[3].symbols[1] ){
                  if(firstSymbol
                      == newReels[4].symbols[1] ){
                          reward += 10
                  }else{
                      reward += 5
                  }
          }else{
              reward += 2
          }
  }

  //guardar la nueva partida
  let newPlay = {
    prize: reward,
    combination: [newReels[0].symbols[1],
            newReels[1].symbols[1],
            newReels[2].symbols[1],
            newReels[3].symbols[1],
            newReels[4].symbols[1]],
    player: req.user._id
  }


  User.findById(req.user._id)
  .then(user => {
    credits+=user.credits;
    credits+=reward;
    credits--;
    User.findByIdAndUpdate(req.user._id, {credits:credits})
    .then(users => {
      console.log("user updated")
      Play.create(newPlay)
      .then(play => {
          console.log("ok")
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
    console.log(error)
    });
  })
  .catch(error => {
    console.log(error)
  })


  res.status(200).json({data:{newReels}})
  
});

router.get('/play-list', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  Play.find().populate("player")
  .then(plays => {
    res.render('play-list', {plays})
  })
  .catch(error => {
    console.log(error)
  })
});

module.exports = router;
