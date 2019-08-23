const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = "5fbfcc19e98b68ce9873db9366c49644-us3";
const uniqueID = "0a73764128";


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html");

});

app.post('/', (req, res) => {
   
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.fname;
    const lname = req.body.lname;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                    LNAME: lname
                }
            }
        ]
    };

    const dataJSON = JSON.stringify(data);

    const options = {
        url: "https://us3.api.mailchimp.com/3.0/lists/" + uniqueID,
        method: "POST",
        headers: {
            "Authorization": "jakub " + apiKey
        },
        body: dataJSON
    };

    request(options, (err, ress, body) => {
        if(err) {
            console.log(err);
            res.sendFile(__dirname + "/fail.html")
        } else if(ress.statusCode === 200){
            console.log(ress.statusCode);
            res.sendFile(__dirname + "/success.html")
        }
    });
    
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!');
});

