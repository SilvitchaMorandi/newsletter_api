//jshint esversion: 6
/*****************************************************************************/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//it is necessary to create a static folders called public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

/*****************************************************************************/
//GET method
  app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
  });

/*****************************************************************************/
// POST method
app.post("/", function(req,res){
      const firstName = req.body.first_name;
      const lastName = req.body.last_name;
      const email = req.body.email;

      const data = {
       members: [
         {
           email_address: email,
           status:"subscribed",
           merge_fields: {
             FNAME: firstName,
             LNAME: lastName
           }
        }
       ]
      };
      const  jsonData = JSON.stringify(data);

// add the endpoint from mailchimp and update usX, taking a look
//from the final api key number
        const url = "https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
        const options = {
         method: "POST",
         auth: "Silvitcha:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          }

        const request = https.request(url, options, function(response){

          if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
          }else{
            res.sendFile(__dirname + "/failure.html");
          }

            response.on("data", function(data){
            console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});

/******************************************************************************/

app.post("/failure", function(req,res){
res.redirect("/");

});

/*****************************************************************************/
//listen to port 3000
app.listen(process.env.PORT || 3000, function(){
console.log("The server is running on port 3000");
});
/*****************************************************************************/

