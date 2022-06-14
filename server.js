const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
app.use(cors())
app.use(express.json());


const { MongoClient } = require("mongodb");

app.get('/api/range/:from-:to',(req,res) => {
    const client = new MongoClient("mongodb://localhost:27017");
    const from = parseInt(req.params.from)
    const to = parseInt(req.params.to)

    async function run(){
    try{
      await client.connect();
      const db = client.db("NiftyOptionsIO")
      const cll = db.collection('14jun22')
      const result = await cll.find({}).toArray()
      
      var a = []
      var b =[]
      for(i=0;i< result.length;i++){

        for(j=from;j<=to;j++){
          a.push({time:result[i].time,strike:result[i].data.data[j].CE.strikePrice,oi:[{CE:result[i].data.data[j].CE.openInterest},{PE:result[i].data.data[j].PE.openInterest}]})
          console.log(a)
          //a.push({time:result[i].time,strike:result[i].data.data[j].CE.strikePrice,oi:result[i].data.data[j].CE.openInterest})
        }
      }
      for(i=1;i<a.length;i++){
        b.push({absoluteCE:(a[i].oi[0].CE)-(a[i-1].oi[0].CE),absolutePE:(a[i].oi[1].PE)-(a[i-1].oi[1].PE)})
      }
      res.send({Oi:a,absoluteOi:b})
      
    }catch (e) {
      console.log("Error: " + e);
    } finally {
      await client.close();
    }}run().catch(console.dir);
  })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })