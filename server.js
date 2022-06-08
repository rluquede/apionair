const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51L2c6FCd5ojOmmEHLM9agMxpSGTEs1yvcxXqOvu1XQrQ2Ea46Iw3ZcbRfZgbxjBo1bUQhXrn5OY30jG5vfBrjbmx00CLtEMDU8");

const app = express();
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 app.get("/", (req, res) => {
  res.json({ message: "Hola buenos dias" });
}); 
require("./app/routes/evento.routes.js")(app);
require("./app/routes/entrada.routes.js")(app);
require("./app/routes/email.routes.js")(app);

app.post("/api/checkout", async(req,res)=>{
  const {id, amount} = req.body;
  try{
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      description: "entrada evento",
      payment_method: id,
      confirm: true
    })
    console.log(payment);
    res.send({status:200,message: 'succes'})
  }catch(err){
    console.log('error',err);
    res.status(400);
    res.json({message:err.raw.message})
  }
   //return res;
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`)
})