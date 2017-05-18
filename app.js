'use strict'
const express = require("express");
const app = express();
const router = express.Router();
const dirname = __dirname + '/views/';
const fs = require("fs");
const userJson = "user.json";
const cheerio = require('cheerio');
var obj = {
    User: []
};
var idUser = '';

fs.readFile(userJson, 'utf8', (err, data) => {
    data = JSON.parse(data);
    obj = data;
    let id = obj.User.length;
    idUser = id + 1;
    console.log(idUser);
});

//use css/js/img in folder public ex: <link href="/css/bootstrap.css" rel="stylesheet">
app.use(express.static('public'))

router.get("/", (req, res) => {
    res.sendFile(dirname + "index.html");
    fs.readFile(userJson, 'utf8', (err, data) => {
        data = JSON.parse(data);
        obj = data;
        let id = obj.User.length;
        idUser = id + 1;
        console.log(idUser);
    });
    showAll();
});

router.get("/about", (req, res) => {
    res.sendFile(dirname + "about.html");
});

router.get("/allCon", (req, res) => {
    showAll();
    res.sendFile(dirname + "allContact.html");
});

router.get("/search", (req, res) => {
    fs.readFile(dirname + 'allContact.html', 'utf8', (err, data) => {
        var $ = cheerio.load(data);
        let nameSea = req.query.searchUser;
        let tempN, tempE, tempP, tempI, tempT;
        for (let i = 0; i < obj.User.length; i++) {
            if (obj.User[i].full_name === nameSea) {
                tempN = obj.User[i].full_name;
                tempI = obj.User[i].user_id;
                tempE = obj.User[i].user_Email;
                tempP = obj.User[i].user_phone;
                tempT = obj.User[i].user_text;
            }
        }
        $('td.result1').text(tempI);
        $('td.result2').text(tempN);
        $('td.result3').text(tempE);
        $('td.result4').text(tempP);
        $('td.result5').text(tempT);
        fs.writeFile(dirname + 'allContact.html', $.html(), function(err) {
            console.log('footer.html successfully written to HTML folder');
            res.sendFile(dirname + "allContact.html");
        });

    });
});

router.get("/delete", (req, res) => {
    let nameDel = req.query.deleteUser;
    for (let i = 0; i < obj.User.length; i++) {
        if (obj.User[i].full_name === nameDel) {
            let test = obj.User.splice(i, 1);
            console.log(test);
            break;
        }
    }
    let gbien = JSON.stringify(obj);
    fs.writeFile(userJson, gbien, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("ghi file thanh cong");
            showAll();
        }
    });
    res.sendFile(dirname + "allContact.html");
});

router.get("/process_get", (req, res) => {
    obj.User.push({
        full_name: req.query.fullName,
        user_Email: req.query.userEmail,
        user_phone: req.query.userPhone,
        user_text: req.query.userText,
        user_id: idUser
    });
    let gbien = JSON.stringify(obj)
    fs.writeFile(userJson, gbien, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("ghi file thanh cong");
            showAll();
            res.sendFile(dirname + "index.html");

        }
    });
});

const showAll = () => {
    fs.readFile(dirname + 'allContact.html', 'utf8', (err, data) => {
        var $ = cheerio.load(data);
        let temp = '';
        for (let number of obj.User) {
            temp +=
                "<tr id='text'>" +
                "   <td>" + number.user_id + "</td>" +
                "   <td>" + number.full_name + "</td>" +
                "   <td>" + number.user_Email + "</td>" +
                "   <td>" + number.user_phone + "</td>" +
                "   <td>" + number.user_text + "</td>" +
                "</tr>";
        }
        const plum = $(temp)
        $('#text').replaceWith(plum)
        fs.writeFile(dirname + 'allContact.html', $.html(), function(err) {
            console.log('footer.html successfully written to HTML folder');
        });

    });

}

app.use("/", router);

app.use("*", (req, res) => {
    res.sendFile(dirname + "404.html");
});

//localhost:3000
app.listen(3000, () => {
    console.log("Website run on localhost:3000")
})