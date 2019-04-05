const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const APIkey = process.env.REACT_APP_OPEN_SECRETS_API_KEY;

router.get('/repsbystate/:USStateParam', (req, res) => {
   console.log(process.env.REACT_APP_OPEN_SECRETS_API_KEY)
   const USStateParam = req.params.USStateParam;
   // http://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=__apikey__
   axios.get(
      'http://www.opensecrets.org/api/' +
      '?method=getLegislators' +
      '&output=json' +
      '&id=' + USStateParam +
      '&apikey=' + APIkey
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

router.get('/repsummary/:cid', (req, res) => {
   axios.get(
      'http://www.opensecrets.org/api/' +
      '?method=candSummary' +
      '&output=json' +
      '&cid=' + req.params.cid +
      '&cycle=2018' +
      '&apikey=' + APIkey
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

router.get('/repindustries/:cid', (req, res) => {
   axios.get(
      'http://www.opensecrets.org/api/' +
      '?method=candIndustry' +
      '&output=json' +
      '&cid=' + req.params.cid +
      '&cycle=2018' +
      '&apikey=' + APIkey
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

router.get("/scrapesummary/:cid", function (req, res) {

   // scrape from page 1
   axios.get(`https://www.opensecrets.org/members-of-congress/summary?cid=${req.params.cid}&cycle=2018`).then(function (response) {
      const $ = cheerio.load(response.data);
      const scrapeData = {
         headshot: $("div.Congress--profile-photo").children('img').attr('src'),
         smallAmount: $('div.HorizontalStackedBar').find('tr:nth-child(1)').children('td:nth-child(2)').text(),
         smallPercent: $('div.HorizontalStackedBar').find('tr:nth-child(1)').children('td:nth-child(3)').text(),
         largeAmount: $('div.HorizontalStackedBar').find('tr:nth-child(2)').children('td:nth-child(2)').text(),
         largePercent: $('div.HorizontalStackedBar').find('tr:nth-child(2)').children('td:nth-child(3)').text(),
         pacAmount: $('div.HorizontalStackedBar').find('tr:nth-child(3)').children('td:nth-child(2)').text(),
         pacPercent: $('div.HorizontalStackedBar').find('tr:nth-child(3)').children('td:nth-child(3)').text(),
         selfAmount: $('div.HorizontalStackedBar').find('tr:nth-child(4)').children('td:nth-child(2)').text(),
         selfPercent: $('div.HorizontalStackedBar').find('tr:nth-child(4)').children('td:nth-child(3)').text(),
         otherAmount: $('div.HorizontalStackedBar').find('tr:nth-child(5)').children('td:nth-child(2)').text(),
         otherPercent: $('div.HorizontalStackedBar').find('tr:nth-child(5)').children('td:nth-child(3)').text()
      };
      console.log(scrapeData);
      return res.json(scrapeData);
   });

});

module.exports = router;