require("dotenv").config();
const express = require('express');
const myDB = require('../database-sql/index.js');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Get request to render all cars in stock db table when opening the inventory page.
// app.get("/allcars", (req, res) => {
//     let query = `SELECT * FROM cars`
//     myDB.con.query(query, (err, results) => {
//         res.send(results)
//     })
// })

const users = [];

//save data from signup page to users table in mysql
app.post('/signup',async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName
    let username = req.body.username
    let email = req.body.email
   // let password = req.body.password
    const salt = await bcrypt.genSalt(10);
    //10 is the salting number
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    myDB.con.query(`Insert into users (firstName, lastName, username, email, password) VALUES ('${firstName}','${lastName}','${username}','${email}','${hashedpassword}')`), (err, result) => {
        if (err)
            throw err;
    }
    res.send(hashedpassword);
})

//Login
//dealing with passwords (hashing and salting)
// app.post('/users', async (req, res) => {
//     console.log("Hello hashing", req.body.username)
//     try {
//         console.log("TRY hashing")
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password); //10 is the salting number
//         const user = {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPassword
//         };
//         users.push(user);
//         res.send(user);
//     } catch {
//         console.log("CATCH hashing")
//         res.status(500).send();
//     }
// })

//compare users from login page with db, if the user is verified, give him a token if not, detect if the user exist or if his username matches with his hashed password
app.post('/login', async (req, res) => {

    var username = req.body.username;
    var password = req.body.password;
    let query = `SELECT * FROM users WHERE username = '${req.body.username}'`
    myDB.con.query(query, function(err, results) {
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, response) => {
                if (response) {
                    const accessToken = jwt.sign({
                        username: username
                    }, process.env.ACCESS_TOKEN_SECRET);
                    res.header({accessToken: accessToken}

                    ).send(accessToken);
                } else {
                    res.send("wrong username/password combination")
                }
            })
        } else {
            res.send("User doesn't exist");
        }
    })
})


//verify the token before let the user enter a private route
// function authenticateToken(req, res, next) {
//     const token = req.query.token.accessToken;
//     if (!token)
//         res.status(400).send("we need a token");
//     else {
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if (err) res.status(400).send("you failed to authenticate")
//             req.userId = user;
//             next()
//         })
//     }
// }
function authenticateToken (req, res,next){
    const token = req.header('addUser-token');
    if(!token) return res.redirect('/login');

    try{
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified;

    console.log(verified)
    next();

    }
    catch(err){
    res.status(400).send('fuckkkkkkkkkkkkk')
    }

     }

//
app.get('/posts', (req, res) => {
    res.status(200).send("you are Authenticated");
})
// app.get('/profile',authenticateToken,  (req, res) => {

//     console.log(req)
//     res.sendFile(path.join(__dirname + '/../react-client/dist/index.html'));
// });

//search a car by filtering code
app.post('/inventory', (req, res) => {
    let brand = req.body.object.brand;
    let year = req.body.object.year;
    let colour = req.body.object.colour;
    let price = req.body.object.price;

    if (brand !== "" && year !== "" && colour !== "" && price !== "" && price == "lowestToHighest") {
        let query = `SELECT * FROM cars WHERE brand = '${brand}' AND year = '${year}' AND colour = '${colour}' ORDER BY Price ASC`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand == "all") {
        let query = `SELECT * FROM cars`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year !== "" && colour !== "" && price !== "" && price == "highestToLowest") {
        let query = `SELECT * FROM cars WHERE brand = '${brand}' AND year = '${year}' AND colour = '${colour}' ORDER BY Price DESC`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year === "" && colour === "" && price === "") {
        let query = `SELECT * FROM cars WHERE  brand = '${brand}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
            console.log(results)
        })
    } else if (brand !== "" && year !== "" && colour === "" && price === "") {
        let query = `SELECT * FROM cars WHERE  brand = '${brand}' AND year = '${year}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year !== "" && colour !== "" && price === "") {
        let query = `SELECT * FROM cars WHERE  brand = '${brand}' AND year = '${year}' AND colour = '${colour}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year === "" && colour !== "" && price === "") {
        let query = `SELECT * FROM cars WHERE brand = '${brand}' AND colour = '${colour}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../react-client/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});



// Update ..

// app.post('/...', async (req, res) => {
// ......findById(req.params.id)
//     //console.log("Updated ..", )
//     .then (carForm => {
//         carForm.brand = req.body.brand;
//         carForm.year = req.body.year;
//         carForm.price = req.body.price;
//         carForm.colour = req.body.colour;
//         carForm.description = req.body.description;
//         carForm.image = req.body.image;
//         carForm.save()
//         .then(() => res.json("car form is updated .. "))
//         .catch(err => res.status(400).json('Error:' + err));
//     })
//     .catch(err => res.status(400).json('Error:' + err));

//     });
//     .catch(err => res.status(400).json('Error:' + err));
// })

// Add Cars

// app.get(('/'), (req, res) => {
//     AddCars.find()
//     // myDB.con.query(query, (err, results) => {
//     //     res.send(results)
//     // })
//     .then(carInfo => res.json(carInfo))
//     .catch(err => res.status(400).json('Error: '+ err));
//     console.log('=======');
// });

app.post('/add',(req, res) => {

    const brand = req.body.brand;
    const year = req.body.year;
    const colour = req.body.colour;

    // const price = req.body.price;
    // const description=req.body.description;
    // myDB.con.query(`Insert into users (firstName, lastName, username, email, password) VALUES ('${firstName}','${lastName}','${username}','${email}','${password}')`), (err, result) => {
    //     if (err)
    //         throw err;
    // }
    // res.send();



    myDB.con.query(`Insert into cars (brand, year, colour) VALUES ('${brand}','${year}','${colour}')`), (err, result) => {
        if (err)
            throw err;
    }
    res.send();
    //res.send(req.body.brand)
    // const newCar = new carInfo ({
    //   brand,
    //   year,
    //   colour
    //   price,
    //   description
    // });

    // newCar.save()
    // .then(() => res.json("Car Added!"))
    // .catch(err => res.status(400).json("Error: " + err));
  });

