const express = require('express');
const axios = require('axios');
const moment = require('moment');
const ObjectsToCsv = require('objects-to-csv');

const app = express();
const port = 8000;

async function dates(){
  let arr = [];
  let obj = {};
    for(let i=0; i<=4; i++){
      let date = (moment().subtract(i, "days").format('YYYY-MM-D'));
      await axios.get('https://api.ratesapi.io/api/' + date + '?base=GBP')
      .then(response => {
        obj['date']  = date;
        obj['rates'] = response.data.rates
        arr.push(obj);
      })
    }

    const csv = new ObjectsToCsv(arr);

    await csv.toDisk('./test.csv', { allColumns: true });
}

dates();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});