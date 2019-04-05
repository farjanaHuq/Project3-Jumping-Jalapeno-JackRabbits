const express = require('express');
const router = express.Router();
const axios = require('axios');

console.log(process.env.REACT_APP_PRO_PUBLICA_API_KEY)
const apiKey = process.env.REACT_APP_PRO_PUBLICA_API_KEY;

router.get('member/chamber-senate/:votesByType', (req, res) => {  
    const congressSenate = 102;
    const chamber = 'senate';
    const voteType = req.params.votesType;    // missed, party, loneno or perfect
      
axios.get(
       `https://api.propublica.org/congress/v1/${congressSenate}/${chamber}/votes/${voteType}`,
       { headers: {
        'X-API-Key': `${apiKey}`
      }})
       .then(resp => {
          console.log('get votes by type data', resp.data);
          res.json(resp.data);
       })
       .catch(err => {
          console.log(err);
       });
    ;
 });

router.get('/votesByType', (req, res) => {
    console.log(process.env.REACT_APP_PRO_PUBLICA_API_KEY)
    const apiKey = process.env.REACT_APP_PRO_PUBLICA_API_KEY;
    const congressHouse = 102;
   // const congressSenate = 80;
    const chamber = 'house';
    const voteType = 'missed';
  
//  curl "https://api.propublica.org/congress/v1/house/votes"
//  -H "X-API-Key: rz3d2w066XoXNxVN6iY2un8kGGzjMzp5hlvtn3py"
//https://api.propublica.org/congress/v1/{congress}/{chamber}/votes/{vote-type}/recent.json
    
axios.get(
       `https://api.propublica.org/congress/v1/${congressHouse}/${chamber}/votes/${voteType}`,
       { headers: {
        'X-API-Key': `${apiKey}`
      }})
       .then(resp => {
          console.log('get votes by type data', resp.data);
          res.json(resp.data);
       })
       .catch(err => {
          console.log(err);
       });
    ;
 });


module.exports = router;