require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var apiParam = process.argv[3];
var spotify = new Spotify(keys.spotify);
var queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";
var axios = require("axios");
var fs = require("fs");
var queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";
var moment = require("moment");

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

        case "movie-this":
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
                var artist1 = "artist: " + data.tracks.items[i].artists[0].name;
                console.log(artist1);

                var song = "song: " + data.tracks.items[i].name;
                console.log(song);

                var album = "album: " + data.tracks.items[i].album.name;
                console.log(album);

                var preview = "preview link: " + data.tracks.items[i].preview_url;
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
 
     spotifyThis();
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
    testAPI();

    axios.get(queryUrlOMDB).then(
        function(response)
        {
            var movieTitle = "title: " + response.data.Title;
            console.log(movieTitle);

            var releaseYear = "release: " + response.data.Year;
            console.log(releaseYear);

            var ratingIMDB = "IMDB rating: " + response.data.imdbRating;
            console.log(ratingIMDB);

            var ratingRT = "rotten tomatoes rating: " + response.data.Ratings[1].Value;
            console.log(ratingRT);

            var produced = "country produced: " + response.data.Country;
            console.log(produced);

            var plot = "plot: " + response.data.Plot;
            console.log(plot);

            var starring = "starring: " + response.data.Actors;
            console.log(starring);

            dataOMDB = "OMDB DATA:" + "\n" + movieTitle + "\n" + releaseYear + "\n" + ratingIMDB + "\n" + ratingRT + "\n" + produced + "\n" + plot + "\n" + starring;

            logit(dataOMDB);
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
            console.log("error", error.message);
            }
    
            console.log(error.config);
        }
    );
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
            case "concert-this":
                apiParam = "Porches";
                queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";
                break;

            case "spotify-this-song":
                apiParam = "NEW MAGIC WAND";
                break;

            case "movie-this":
                apiParam = "Star Wars";
                queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";
                break;
        }
    }
}

app();