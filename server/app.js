//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const cors =require("cors");
const Cryptr = require('cryptr');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://nerd2o:123nikola@cluster0-zzojw.mongodb.net/secretServerDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const SecretSchema = {
  hash: String ,
  createdAt: Date,
  expires: Date,
  remainingViews: Number
}

const Secret = mongoose.model("secret", SecretSchema);

const cryptr = new Cryptr("jshdkasjhdiah");

const listenPort = process.env.PORT || 3000;
////////////////////////The API Functionality starts Here ////////////////////


app.post("/api/secret", function(req, res){

  var syperSecret = cryptr.encrypt(req.body.secret);
  var expires = new Date();
  var createdAt = new Date(); // Gets the current datetime.
  expires.setSeconds(expires.getSeconds() + (req.body.expireAfter * 60))


    const newSecret = new Secret({
    hash:syperSecret,
    createdAt: createdAt,
    expires: expires,
    remainingViews: req.body.expireAfterViews

  });

  newSecret.save(function(err){
    if (!err) {
      res.send({
        hash:syperSecret,
        secretText: cryptr.decrypt(syperSecret),
        createdAt: createdAt,
        expires: expires,
        remainingViews: req.body.expireAfterViews});
    }else{
      res.send(err);
    }
  });

});

app.get("/api/secret/:hashUrl", function(req, res){
  Secret.findOne({hash: req.params.hashUrl}, function(err, foundSecret){
    if(foundSecret){
      if (foundSecret.remainingViews > 0) {
        var CountViews = Number(foundSecret.remainingViews);
        CountViews--;

        Secret.updateOne({_id: foundSecret.id}, {remainingViews: CountViews}, function(err){
          if(err){
            console.log(err);
          }else{
            res.send({
              hash:foundSecret.hash,
              secretText: cryptr.decrypt(foundSecret.hash),
              createdAt: foundSecret.createdAt,
              expires: foundSecret.expires,
              remainingViews: foundSecret.remainingViews});
          }
        });

      }else{
        res.send("No Secret Found. The Amount of views may be reached or the TTL ran out.");
      }

    }else{
      res.send("No Secret Found. Your /hash is whrong, the TTL ran out or  dosent exist ");
    }
  });
});


app.listen(listenPort, function(){
  console.log("The server ran on port 3000");
});
