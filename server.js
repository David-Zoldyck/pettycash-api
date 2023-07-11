const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const axios = require("axios")
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());



const pettyCashRequests = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    accountDetails: {
      accNumber: { type: String, required: true, minLength: 10, maxLength: 10},
      accName: { type: String, required: true },
      bank: { type: String, required: true },
    },
    items: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    authorizedBy: { type: String, required: true },
  },
  { timestamps: true }
);

const PettyCashRequest = mongoose.model("PettyCashRequest", pettyCashRequests);


app.get('/',(req,res)=>{
  return res.json({
    "message":"Welcome to YB crip"
  })
});

app.get('/get-banks',async (req,res)=>{
  return res.json(await getBanks())
});


app.post("/resolve-bank", async (req, res) => {
      const {account_number, bank_code} = req.body;
  try {
      const response = await axios.get('https://api.paystack.co/bank/resolve', {
        params: {
          account_number,
          bank_code
        },
        headers: {
          "Authorization":
          "Bearer sk_test_d0eb48fc01ac224f6f88459f9542bce0eef5e582"
        }
      })

      res.json(response.data)
  } catch(error){
    console.error(error.message)
    res.status(400).json({error: 'Could not resolve details'})
  }
})

app.post("/register", async (req, res) => {
  const { body } = req;
  //store data in a database
  // console.log(name, date, accNumber, accName, bank, items, authorizedBy);
  try {
    const alreadyExists = await User.findOne({
      accNumber,
    });

    if (alreadyExists) {
       res.status(422).send({ error: "User already exists" });
       return;
    }

    const newUser = new PettyCashRequest({
        name: body.name,
        date: body.date,
        accountDetails:{
          accName: body.accountDetails.accountName,
          bank: body.accountDetails.bank,
          accNumber: body.accountDetails.number
        },
        authorizedBy: body.authorizedBy,
        items: body.items
    });
    try {
      await newUser.save();
    } catch (error) {
      console.trace(error)
      return res.status(400).json({message: "Unable to save data"})
    }
   

    res.status(201).send({ user: newUser });
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "Try again bozo" });
  }
});

app.get('/get-requests', async (req,res)=>{
  try {
    const pettyCashRequests =  await PettyCashRequest.find({})
    
    return res.json({
      total: pettyCashRequests.length,
      data: pettyCashRequests
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong."
    })
  }
})
app.get('/get-request/:id', async (req,res)=>{
  try {
    const pettyCashRequest =  await PettyCashRequest.findById(req.params.id)
    
    return res.json({
      data: pettyCashRequest
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong."
    })
  }
})

async function getBanks() {
      try {
        const res = await fetch("https://api.paystack.co/bank?currency=NGN", {
          method: "GET",
          headers: {
            Authorization:
              "Bearer sk_test_d0eb48fc01ac224f6f88459f9542bce0eef5e582",
          },
        });
        if(res.status < 200 || res.status >= 300 ) throw Error("unable to fetch banks")
        const data = await res.json();

       return data;
      } catch (error) {
        console.log(error)
        return {
          status: false,
          message: error.message,
          data:[]
        };
      }
    }

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/pettycash")
  .then(() => {
    console.log("Database connected");
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((err) => console.log(err));