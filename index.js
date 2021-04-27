const express = require('express');
const axios = require('axios');
const moment = require('moment');
// const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs')

const ObjectsToCsv = require('objects-to-csv');

let stringify = require('csv-stringify');

const app = express();
const port = 7999;

async function dates(){
  let arr = [];
  let obj = {};

  for(let i=0; i<=4; i++){
    let date = (moment().subtract(i, "days").format('YYYY-MM-D'));
    await axios.get('https://api.ratesapi.io/api/' + date + '?base=GBP')
    .then(response => {
      obj['date'] = response.data.date;
      obj['date']["rates"] = response.data.rates;
    })
    
    arr.push(obj);
    console.log(arr);
    (async () => {
      const csv = new ObjectsToCsv(arr);
     
      // Save to file:
      await csv.toDisk('./test.csv', { append: true ,  header: false, allColumns: true });
     
      // Return the CSV file as string:
      // console.log(await csv.toString());
    })();

    // stringify(arr, {
    //   columns: ['date']
    //   }, function (err, output) {
    //     fs.appendFileSync('./someData.csv', output,function(err, result) {
    //       if(err) console.log('error', err);
    //     });
    //   }
    // )
    console.log(obj);
  } 
}

dates();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});