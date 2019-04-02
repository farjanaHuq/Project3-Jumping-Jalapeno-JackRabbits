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
      '&format=json' +
      '&id=' + USStateParam +
      '&apikey=' + apiKey
   )
      .then(resp => {
         console.log('resp:', resp);
         res.json(resp.body);
      })
      .catch(err => {
         console.log(err);
      });
   ;
});


module.exports = router;