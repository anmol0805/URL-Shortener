const express = require("express");
// const express = require("mongoose");
const {connectToMongoDB} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
app.use(express.json());

const PORT = 9000;
app.listen(PORT, ()=>{
    console.log(`Server Started at PORT, ${PORT}`);
});


connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("Mongodb connected"));


app.use("/url", urlRoute);

app.get("/:shortId", async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push:{visitHistory: {timestamp: Date.now(),},},},{new:true});

    res.redirect(entry.redirectURL);
});
