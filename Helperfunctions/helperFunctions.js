const express = require('express');
var listOfIndustries = require('./listOfIndustries');
const newIndustry = require('./newIndustry');
const axios = require('axios');


// var newIndustry = [];
var newList = []
var type = '';
var congress = '';


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
  // console.log(newArr);
  return  newArr;
}

removeDuplicateElement = (arr) => {
   arr.forEach(function(item) {
      if(newIndustry.indexOf(item) < 0 || item !== '')  {
          newIndustry.push(item);
      }   
  })
 // console.log("New Industry", newIndustry);
  return newIndustry;
}



// const arr = compare(newIndustry, listOfIndustries);
// console.log(arr);

const apiKey = "rz3d2w066XoXNxVN6iY2un8kGGzjMzp5hlvtn3py";
   // congress: 105-115
   // type: introduced, updated, active, passed, enacted or vetoed

getListOfIndustries = () => {
  var updatedList = [];
  var newSubArr = [];
  for(congress =102; congress<=103; congress++){

    axios.get(
      `https://api.propublica.org/congress/v1/${congress}/both/bills/introduced.json`,
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
          newSubArr = removeDuplicateElement(subjectsArr);
          newList = compare(newSubArr, listOfIndustries);  
          // newList.forEach(elem =>{
          //   updatedList.push(elem); 
          // }) 
      console.log("==========================================================");
      console.log("newList", newList); 
      console.log("update List", updatedList);     
      })
      .catch(err => {
         console.log(err);
      });
  }

  return updatedList;
 
}

// updateListOfIndustries = () => {
//   var updatedList = [];
//     getListOfIndustries().forEach(elem => {
//       updatedList.push(elem);
//     })
//     console.log("==========================================================");
//     console.log("updated List", updatedList)
//     updatedList.forEach(function(item) {
//       if(listOfIndustries.indexOf(item) < 0)  {
//           listOfIndustries.push(item);
//       }  
//   })
//   return listOfIndustries;
// }


// var finalArr = updateListOfIndustries();
// console.log("==========================================================");
// console.log("list of industries", finalArr);


getListOfIndustries().forEach(elem => {
  listOfIndustries.push(elem);
})

// getListOfIndustries();
console.log("==========================================================");
console.log("list of industries", listOfIndustries);
  
  
