require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var apiParam = process.argv[3];
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

function app()
{
    if (command === undefined)
    {
        console.log("please enter a valid command");
        return;
    }

    switch(command.toLowerCase())
    {
        case "concert-this":
            bands();
            break;

        case "spotify-this-song":
            console.log("spot")
            spotifyThis();
            break;

        case "movie-this":node
            omdb();
            break;

        case "do-what-it-says":
            whatItSays();
            break;

        default:
            console.log("you did a bad thing");
            break;
    }
}

function spotifyThis()
{
    testAPI();

    spotify.search(
        {
            type: 'track', 
            query: apiParam
        }, 
        function(err, data)
        {
            if (err)
            {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < data.tracks.items.length; i++)
            {
                var artist1 = "Artist: " + data.tracks.items[i].artists[0].name;
                console.log(artist1);

                var song = "Song: " + data.tracks.items[i].name;
                console.log(song);

                var album = "Album: " + data.tracks.items[i].album.name;
                console.log(album);

                var preview = "Preview Link: " + data.tracks.items[i].preview_url;
                console.log(preview);

                var lineBreak1 = "\n------------------------------\n"
                console.log(lineBreak1);

                var dataSpot = "SPOTIFY DATA:" + "\n" + artist1 + "\n" + song + "\n" + album + "\n" + preview + "\n" + lineBreak1;

                logIt(dataSpot);
            }
        }
    );
}

function whatItSays()
{
 console.log("what it says!")
 fs.readFile("./random.txt", "utf8", function(error, data)
 {
     if (error)
     {
         return console.log(error);
     }

     var data1 = data.split(",");
 
     command = data1[0];
     apiParam = data1[1];
 
     spotify();
 });
}

function bands()
{
    console.log("band bois in town")
}

function omdb()
{
    console.log("omdb yo")
}

function logIt(data)
{
    fs.appendFile("./log.txt", data, function (err)
    {

        if (err) throw err;

    });
}

function testAPI()
{
    if (apiParam === undefined)
    {
        switch(command)
        {
            case "spotify-this-song":
                apiParam = "NEW MAGIC WAND";
                break;
        }
    }
}

app();