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

// get all the reps and then get their industries
router.get('/getallindustries/', (req, res) => {
   const statesArr = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
   ];
   const legislatorCidArr = [];
   var stateCount = 0;

   statesArr.forEach(elem => {
      axios.get(`http://www.opensecrets.org/api/?method=getLegislators&output=json&id=${elem}&apikey=${APIkey}`)
         .then(resp => {
            // save legislators from that state to a const
            const legislators = resp.data.response.legislator;

            // for each legislator of from that state, push their office/name/cid to a new legislatorCidArr
            legislators.forEach(elem => {
               legislatorCidArr.push({
                  office: elem['@attributes'].office,
                  name: elem['@attributes'].firstlast,
                  cid: elem['@attributes'].cid
               })
            });
            stateCount++;
            // // after all 50 states have been queried
            if (stateCount === 50) {
               // res.json(legislatorCidArr);
               // for each member of congress
               const scrapeData = [];
               // console.log(legislatorCidArr.length);
               var legislatorCount = 0
               legislatorCidArr.forEach(elem => {
                  axios.get(
                     `https://www.opensecrets.org/members-of-congress/industries?cid=${elem.cid}&cycle=2018&recs=0&type=I`
                  ).then(function (response) {
                     const $ = cheerio.load(response.data);
                     for (let i = 0; i < 100; i++) {
                        if (!scrapeData.includes($('tbody').children(`tr:nth-of-type(${i + 1})`).children('td:first-of-type').text().split(/(?=[A-Z])/)[0])) {
                           scrapeData.push($('tbody').children(`tr:nth-of-type(${i + 1})`).children('td:first-of-type').text().split(/(?=[A-Z])/)[0])
                        };
                     }
                     legislatorCount++;
                     console.log(legislatorCount);
                     if (legislatorCount === 555) {
                        res.json(scrapeData);
                     }
                  });

                  // axios.get(
                  //    `https://www.opensecrets.org/members-of-congress/industries?cid=N00004367&cycle=2018&recs=0&type=I`
                  // ).then(function (response) {
                  //    const $ = cheerio.load(response.data);
                  //    const scrapeData = $('table#DataTables_Table_0').children('tbody').children(`tr:nth-of-type(1)`).children('td:first-of-type').text();
                  //    res.json(scrapeData)
                  // });

               });
            };
         }).catch(err => {
            console.log(err);
         });
      ;
   });
});

module.exports = router;