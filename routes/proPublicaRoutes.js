const express = require('express');
const router = express.Router();
const axios = require('axios');

//console.log(process.env.REACT_APP_PRO_PUBLICA_API_KEY)
const apiKey = process.env.REACT_APP_PRO_PUBLICA_API_KEY;

//============================================================ All Members ============================================================
//https://api.propublica.org/congress/v1/{congress}/{chamber}/members.json

//get all members
router.get('/all-members/:congress/:chamber', (req, res) => {  
    const congress = req.params.congress;
    const chamber = req.params.chamber;
    axios.get(    
        `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`,
        { headers: {
         'X-API-Key': `${apiKey}`
        }})
        .then(resp => {
           console.log('get votes by type data', resp.data);
           var result = resp.data;
           var memberData = [{}];
    
        //    for(var i=1;i<5; i++){
        //            console.log(`memberId: ${result.results[i].members[i].id},
        //                  title:${result.results[i].members[i].title},
        //                  api_uri: ${result.results[i].members[i].api_uri},
        //                  first_name: ${result.results[i].members[i].first_name},
        //                  last_name: ${result.results[i].members[i].last_name}`)
        //     }
            //    memberData.push({
            //       memberId:result[i].id,
            //       title:result[i].title,
            //       api_uri: result[i].api_uri,
            //       first_name: result[i].first_name,
            //       last_name: result[i].last_name  
            //    })
           
        //console.log(memberData);
           //res.json(memberData);
        res.json(result.results[0].members[0]);
        })
        .catch(err => {
           console.log(err);
        });
});
//==========================================================Specific Member==============================================================
//https://api.propublica.org/congress/v1/members/{member-id}.json

//get a specific member
router.get('/specific-member', (req, res) => {  
    const memberId = 'Boehner';
    axios.get(    
        `https://api.propublica.org/congress/v1/members/${memberId}.json`,
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
});
//========================================================================================================================
// curl "https://api.propublica.org/congress/v1/bills/subjects/meat.json"
//   -H "X-API-Key: PROPUBLICA_API_KEY"

//get recent Bills by a specific subject
router.get('/recent-Bills', (req, res) => {  
    const subject = 'meat';
    axios.get(    
        `https://api.propublica.org/congress/v1/bills/subjects/${subject}.json`,
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
});

//========================================================================================================================
//  curl "https://api.propublica.org/congress/v1/house/votes"
//  -H "X-API-Key: rz3d2w066XoXNxVN6iY2un8kGGzjMzp5hlvtn3py"
//https://api.propublica.org/congress/v1/{congress}/{chamber}/votes/{vote-type}/recent.json

//get votes info of congress senate members
router.get('/chamber-senate/:votesByType', (req, res) => {  
    const chamber = 'senate';
    const votesByType = req.params.votesByType;    // missed, party, loneno or perfect

   for(var congressSenate=80; congressSenate<=115; congressSenate++){     // congress 80-115 for Senate
    axios.get(
        
        `https://api.propublica.org/congress/v1/${congressSenate}/${chamber}/votes/${votesByType}`,
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
     
   }

});
//get votes info of congress house members
router.get('/chamber-house/:votesByType', (req, res) => {  
    const chamber = 'house';
    const votesByType = req.params.votesByType;    // missed, party, loneno or perfect

   for(var congressHouse=102; congressHouse<=115; congressHouse++){     // congress 80-115 for Senate
    axios.get(
        
        `https://api.propublica.org/congress/v1/${congressHouse}/${chamber}/votes/${votesByType}`,
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
     
   }

});




module.exports = router;