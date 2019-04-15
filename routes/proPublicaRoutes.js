const express = require('express');
const router = express.Router();
const axios = require('axios');
const listOfIndustries = require('../listOfIndustries');

var newList = [];

compare = (arr1,arr2) => {
   arr1.map(elem1 =>arr2.map(elem2 =>
     {
       if(elem1 !== elem2){
         arr2.push(elem1);
       }
     }))
     const newArr = [];
     arr2.forEach(function(item) {
         if(newArr.indexOf(item) < 0)  {
             newArr.push(item);
         }  
     })
    return  newArr;
 }
 

removeDuplicateElement = (arr) => {
   var newIndustry = [];
   arr.forEach(function(item) {
      if(newIndustry.indexOf(item) < 0 && item !== '')  {
          newIndustry.push(item);
      }   
  })
  //console.log("New Industry", newIndustry);
  return newIndustry;
}


//console.log(process.env.REACT_APP_PRO_PUBLICA_API_KEY)
const apiKey = process.env.REACT_APP_PRO_PUBLICA_API_KEY;

// get all recent bills(to get subjects)
router.get('/all-bills/:congress/:type', (req, res) => {
   // congress: 105-115
   // type: introduced, updated, active, passed, enacted or vetoed
   axios.get(
      `https://api.propublica.org/congress/v1/${req.params.congress}/both/bills/${req.params.type}.json`,
      {
         headers: {
            'X-API-Key': `${apiKey}`
         }
      })
      .then(resp => {    
         var subjectsArr = [];
         resp.data.results[0].bills.forEach(elem => {
            subjectsArr.push(elem.primary_subject);
         });
         // res.json(subjectsArr);
         var newSubArr = removeDuplicateElement(subjectsArr);
         //res.json(newSubArr);
         newList = compare(newSubArr, listOfIndustries);  
         //console.log("newList", newList);
         res.json(newList);
         // var updatedIndustries = removeDuplicateElement(listOfIndustries);
         // res.json(updatedIndustries);   
         //console.log("list of updated industries", updatedIndustries);
      })
      .catch(err => {
         console.log(err);
      });
      
});


//var updatedIndustries = removeDuplicateElement(listOfIndustries);
//console.log("list of updated industries", updatedIndustries);
//============================================================ All Members ============================================================
//https://api.propublica.org/congress/v1/{congress}/{chamber}/members.json

//get all members
router.get('/all-members/:chamber', (req, res) => {
   const chamber = req.params.chamber;
   axios.get(
      `https://api.propublica.org/congress/v1/115/${chamber}/members.json`,
      {
         headers: {
            'X-API-Key': `${apiKey}`
         }
      })
      .then(resp => {
         console.log('get votes by type data', resp.data);
         console.log('after 1st log')
         var respData = resp.data;
         var memberData = [];

         //res.json(respData);


         for (var j = 0; j < respData.results[0].members.length; j++) {

            memberData.push({
               memberId: respData.results[0].members[j].id,
               title: respData.results[0].members[j].title,
               api_uri: respData.results[0].members[j].api_uri,
               first_name: respData.results[0].members[j].first_name,
               last_name: respData.results[0].members[j].last_name
            })
         }

         res.json(memberData);
         //console.log(memberData);

      })
      .catch(err => {
         console.log(err);
      });
});
//==========================================================Specific Member==============================================================
//https://api.propublica.org/congress/v1/members/{member-id}.json

//get a specific member
router.get('/specific-member/:memberId', (req, res) => {
   console.log('memberId:', req.params.memberId);
   const memberId = req.params.memberId;
   axios.get(
      `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`,
      {
         headers: {
            'X-API-Key': `${apiKey}`
         }
      })
      .then(resp => {
         console.log('specific members votes:', resp.data);
         res.json(resp.data);
      })
      .catch(err => {
         console.log(err);
      });
});
//========================================================================================================================
// curl "https://api.propublica.org/congress/v1/bills/subjects/meat.json"
//   -H "X-API-Key: PROPUBLICA_API_KEY"

//get recent Bills by a specific subject
router.get('/recent-bills/:subject', (req, res) => {
   const subject = req.params.subject;
   axios.get(
      `https://api.propublica.org/congress/v1/bills/subjects/${subject}.json`,
      {
         headers: {
            'X-API-Key': `${apiKey}`
         }
      })
      .then(resp => {
         console.log('get votes by type data', resp.data);
         res.json(resp.data);
      })
      .catch(err => {
         console.log(err);
      });
});

//========================================================================================================================
//  curl "https://api.propublica.org/congress/v1/house/votes"
//  -H "X-API-Key: rz3d2w066XoXNxVN6iY2un8kGGzjMzp5hlvtn3py"
//https://api.propublica.org/congress/v1/{congress}/{chamber}/votes/{vote-type}/recent.json

//get votes info of congress senate members
router.get('/chamber-senate/:votesByType', (req, res) => {
   const chamber = 'senate';
   const votesByType = req.params.votesByType;    // missed, party, loneno or perfect

   for (var congressSenate = 80; congressSenate <= 115; congressSenate++) {     // congress 80-115 for Senate
      axios.get(

         `https://api.propublica.org/congress/v1/${congressSenate}/${chamber}/votes/${votesByType}`,
         {
            headers: {
               'X-API-Key': `${apiKey}`
            }
         })
         .then(resp => {
            console.log('get votes by type data', resp.data);
            res.json(resp.data);
         })
         .catch(err => {
            console.log(err);
         });

   }

});
//get votes info of congress house members
router.get('/chamber-house/:votesByType', (req, res) => {
   const chamber = 'house';
   const votesByType = req.params.votesByType;    // missed, party, loneno or perfect

   for (var congressHouse = 102; congressHouse <= 115; congressHouse++) {     // congress 80-115 for Senate
      axios.get(

         `https://api.propublica.org/congress/v1/${congressHouse}/${chamber}/votes/${votesByType}`,
         {
            headers: {
               'X-API-Key': `${apiKey}`
            }
         })
         .then(resp => {
            console.log('get votes by type data', resp.data);
            res.json(resp.data);
         })
         .catch(err => {
            console.log(err);
         });

   }
});





module.exports = router;