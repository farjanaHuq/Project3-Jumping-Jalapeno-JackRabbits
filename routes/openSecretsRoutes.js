const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/repsbystate/:USStateParam', (req, res) => {
   console.log(process.env.REACT_APP_OPEN_SECRETS_API_KEY)
   const apiKey = process.env.REACT_APP_OPEN_SECRETS_API_KEY;
   const USStateParam = req.params.USStateParam;
   // http://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=__apikey__
   axios.get(
      'http://www.opensecrets.org/api/' +
      '?method=getLegislators' +
      '&output=json' +
      '&id=' + USStateParam +
      '&apikey=' + apiKey
   )
      .then(resp => {
         console.log('data:', resp.data);
         res.json(resp.data);
      })
      .catch(err => {
         console.log(err);
      });
   ;
});

router.get('/individualrep', (req, res) => {
   const APIkey = '3d1183f69d960536bde5c2cd99db30a3';
   axios.get('http://www.opensecrets.org/api/?method=candSummary&output=json&cid=N00026427&cycle=2018&output=json&apikey=' + APIkey)
      .then(resp => {
         console.log('resp:', resp.data);
         // res.json(resp);
         res.json(resp.data);
      })
      .catch(err => {
         console.log(err);
      })
});

module.exports = router;