const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
 
let items = [];
let lastDay = new Date().toDateString();




app.get("/", function(req, res) {

    let today = new Date();
    let currentDay = new Date().toDateString();


    if (currentDay !== lastDay) {
        items = [];           // Reset items
        lastDay = currentDay; // Update lastDay
    }



    const options = {
        weekday: 'long',
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);



    res.render("list", {kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res) {
    const item = req.body.newItem;

    items.push(item);

    res.redirect("/");

    console.log(items)

});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});