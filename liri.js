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
    testAPI();

    axios.get(queryUrlBIT).then(
        function(response)
        {
            for (var i = 0; i < response.data.length; i++)
            {
                var artist = "artist: " + response.data[i].lineup;
                console.log(artist);

                var venue = "venue: " + response.data[i].venue.name;
                console.log(venue);

                var venueLoc = "location: " + response.data[i].venue.city + ", " + response.data[i].venue.country;
                console.log(venueLoc);
                var dateArray = response.data[i].datetime.split("T");
                var date = dateArray[0];
                var time = dateArray[1];
                var properDate = moment(date);

                var eventDate = "date: " + properDate.format("MM/DD/YYYY");
                console.log(eventDate);

                var eventTime = "time: " + time;
                console.log(eventTime);

                var lineBreak = "\n------------------------------\n";
                console.log(lineBreak);

                var dataBIT = "BANDS IN TOWN DATA:" + "\n" + artist + "\n" + venue + "\n" + venueLoc + "\n" + eventDate + "\n" + eventTime + "\n" + lineBreak;

                logit(dataBIT);
            }
        })
        .catch(function(error)
        {
            if (error.response) 
            {
                console.log("error error error");
                console.log(error.response.status);
            } 
        
            else if (error.request)
            {
                console.log(error.request);
            } 
        
            else
            {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
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