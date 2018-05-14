"use strict";

var express = require('express');

var app = express();

var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

let rightToken = "tempo_token"; // à modifier : le serveur renvoie un jeton de session

// router.get('/', (req, res)=>{
//     console.log('Authentification Page shows...');
//     res.sendFile(__dirname + '/index.html');
// });

//authentification
app.post('/lovegos/login', function(req, res){
    var login = req.body.login;
    var pass = req.body.password;
    if ('toto' == login && 'toto' == pass) {
        //res.send('Bienvenu au Lovegos ' + login);
        res.json({
            "message" : "Bienvenu au Lovegos ",
            status :"OK",
            token: rightToken,
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

//Profil d'un utilisateur
app.get('/lovegos/profil/:id', function(req, res){
    var thisId = req.params.id;
    let submitedToken = req.get('Auth-token');

    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        
        //chercher le bon utilisateur en correspondance à l'ID dans la base de donnée Mongo

        //l'instancier dans une variable
        let searchedUser = {
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
            "message" : "Profil d'utilisateur fonctionne...",
            utilisateur : searchedUser
        });
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
    
});

//Profils recommandés
app.get('/lovegos/recommandations', function(req, res){
    let submitedToken = req.get('Auth-token');

    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        
        //récupérer les récommandations des profils dans la base 

        //examples
        let searchedUser = {
            id: 4,
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
        let suggestedProfils = [
            searchedUser, searchedUser, searchedUser
        ]

        res.json({
            "message" : "Profils récommandés fonctionnent... ",
            utilisateurs : suggestedProfils
        });
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
});

//LOVE
//Envoi d'un love
app.post('/lovegos/love', (req, res)=>{
    
    var dateHeure = req.body.dateHeure; //quell type de Date
    var vu = req.body.vu;
    var idExp = req.body.idExp;
    var idDest = req.body.idDest;

    let submitedToken = req.get('Auth-token');

    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        res.json({
            success : "OK"
        });
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
});

//Reception de tous les loves reçus par l'utilisateur
app.get('/lovegos/loves', (req, res)=>{
    let submitedToken = req.get('Auth-token');

    //récupérer les loves reçus dans la base 

    //examples
    let receivedLoves = [
        {
            id : 25,
            dateHeure : new Date('December 13, 2017 19:22:00'),
            vu : true,
            expediteur : {
                id: 4,
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
            }
        },
        {
            id : 135,
            dateHeure : new Date('May 14, 2018 15:02:00'),
            vu : false,
            expediteur : {
                id: 7,
                dateNaissance: new Date('October 30, 2003 08:32:00'), // objet Date js
                geoLoc: {
                    lat: 232323,
                    long: 454443
                },
                photo: "URL encore d'un autre image", // URL de l'image
                nom: "Liu",
                prenom: "Yan",
                motifs: ["amour","chatting"],
                //ce qu'il cherche sur lovegos (amour, sexe...)
                trancheAgeRecherche: [24,30],
                genresRecherches: ["homme"],
                presentation: "chow chow I am looking for U ;)",
                // Texte de présentation..
                genre: "femme"
            }
        }
    ];
    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        res.json(receivedLoves);
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
});

//Reception des loves non vus de l'utilisateur
app.get('/lovegos/loves-non-vus', (req, res)=>{
    let submitedToken = req.get('Auth-token');

    //récupérer les loves non-vus dans la base 

    //examples
    let nonSeenLoves = [
        {
            id : 135,
            dateHeure : new Date('May 14, 2018 15:02:00'),
            vu : false,
            expediteur : {
                id: 7,
                dateNaissance: new Date('October 30, 2003 08:32:00'), // objet Date js
                geoLoc: {
                    lat: 232323,
                    long: 454443
                },
                photo: "URL encore d'un autre image", // URL de l'image
                nom: "Liu",
                prenom: "Yan",
                motifs: ["amour","chatting"],
                //ce qu'il cherche sur lovegos (amour, sexe...)
                trancheAgeRecherche: [24,30],
                genresRecherches: ["homme"],
                presentation: "chow chow I am looking for U ;)",
                // Texte de présentation..
                genre: "femme"
            }
        }
    ];
    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        res.json(nonSeenLoves);
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
});

//CONVERSATIONS
//Liste des conversations
app.get('/lovegos/conversations', (req, res)=>{
    let submitedToken = req.get('Auth-token');

    //récupérer les conversations de l'user triées par date décroissante dans la base 

    //examples
    let conversations = [
        {
            id : 117,
            titre : "Bonne anniversaire!"
        },
        {
            id : 89,
            titre : "Fête de la musique^^"
        },
        {
            id : 24,
            titre : "Hello chou-chou..."
        }
    ];
    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        res.json(conversations);
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
});

//Charger une conversation
app.get('/lovegos/conversation/:id', (req, res)=>{
    console.log('Here is OK too...');
    var thisId = req.params.id;
    let submitedToken = req.get('Auth-token');

    //récupérer la conversation avec le bon ID dans la base 

    //example
    let conversation = {
        id : thisId,
        titre : "Bonne anniversaire!",
        messages : [
            {
                contenu: "Bonne anniversaire ma chou-chou",
                dateEnvoi: new Date('Juin 22, 2015 14:14:14'),
                dateLecture: new Date('Juin 22, 2015 22:22:22'),
                auteur: {
                    nom: "Bond",
                    prenom: "James",
                    photo: "une image URL"
                }
            },
            {
                contenu: "Merci mon bogos <3",
                dateEnvoi: new Date('Juin 22, 2015 22:23:24'),
                dateLecture: new Date('Juin 22, 2015 23:23:23'),
                auteur: {
                    nom: "Diaz",
                    prenom: "Cameron",
                    photo: "une belle image URL"
                }
        }],
        participants : [
            {
                nom: "Bond",
                prenom: "James",
                photo: "une image URL"
            },
            {
                nom: "Diaz",
                prenom: "Cameron",
                photo: "une belle image URL"
        }]
    };

    //vérifier si le token est bon
    if (submitedToken == rightToken) {
        res.json(conversation);
    } else {
        res.json({
            "message" : "Token non valid!"
        });
    }
});

//MAIN APP
app.use('/lovegos', router);

app.listen(3000, ()=>{
    console.log("Server Lovegos now is Live at Port 3000");
})