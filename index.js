"use strict";

var express = require('express');

var app = express();

var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

let rightToken = "tempo_token"; // à modifier

// router.get('/', (req, res)=>{
//     console.log('Authentification Page shows...');
//     res.sendFile(__dirname + '/index.html');
// });

//authentification
app.post('/lovegos/login', function(req, res){
    console.log('Login username : ' + req.body.userName);
    var login = req.body.login;
    var pass = req.body.password;
    if ('toto' == login && 'toto' == pass) {
        //res.send('Bienvenu au Lovegos ' + login);
        res.json({
            "message" : "Bienvenu au Lovegos ",
            status :"OK",
            token: rightToken, // le serveur renvoie un jeton de session
            utilisateur : {
                id: "1",
                dateNaissance: new Date('December 17, 1995 03:24:00'), // objet Date js
                geoLoc: {
                    lat: 123456,
                    long: 654321
                },
                photo: "URL de l'image", // URL de l'image
                nom: "TRAN",
                prenom: "Minh Quan",
                motifs: ["amour","sex"],
                //ce qu'il cherche sur lovegos (amour, sexe...)
                trancheAgeRecherche: [18,25],
                genresRecherches: ["femme"],
                presentation: "lonely kind man looking for a nice French teacher ^^",
                // Texte de présentation..
                genre: "homme"
            }

        });
    } else {
        res.json({
            status :"NOPE"
        });  
    }
    
});


//Profil d-un utilisateur
app.get('/lovegos/profil/:id', function(req, res){
    var thisId = req.params.id;

    let submitedToken = req.get('Auth-token');
    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        
        //chercher le bon utilisateur en correspondance à l'ID dans la base de donnée Mongo

        //l'instancier dans une variable
        var searchedUser = {
            id: thisId,
            dateNaissance: new Date('December 22, 1999 09:44:00'), // objet Date js
            geoLoc: {
                lat: 333333,
                long: 666666
            },
            photo: "URL d'un autre image", // URL de l'image
            nom: "Vanes",
            prenom: "Emilie",
            motifs: ["amour","friend"],
            //ce qu'il cherche sur lovegos (amour, sexe...)
            trancheAgeRecherche: [22,35],
            genresRecherches: ["homme"],
            presentation: "as a bird flys to find its half...",
            // Texte de présentation..
            genre: "femme"
        };

        res.json({
            "message" : "Bienvenu au Lovegos ",
            utilisateur : searchedUser
        });
    }
    
});

// Handling 404 errors
// app.use('*', (req, res)=>{
//     res.status(404).send('Error 404 : unknown address...');
// });

app.use('/lovegos', router);

app.listen(3000, ()=>{
    console.log("Server Lovegos now is Live at Port 3000");
})