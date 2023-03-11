//importing quiz data 
import('./quiz.js');


// Variable as a place holder until Team Browns has their variable 
let recommendedMovie = "Grease";
let movieID = "";

// API URL Variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL;

// Variable Elements from HTML
let trailerSourceEl = document.getElementById('src');
let trailerVideoEl = document.getElementById('video');
let trailerEl = document.getElementById('link-to-trailer');
let videoLink;
// let trailerContainerEl = document.getElementById('trailer-container');


// SM - Mobile Menu -- Code from Bulma documentation example js
$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

// SM - Check for click events on signup button, pop up modal

$("#signupbutton").click(function() {
// Toggle is-active class on login modal
$("#sign-up-modal").addClass("is-active");
console.log("test");
});

$(".modal-background").click(function() {
$("#sign-up-modal").removeClass("is-active");
});

// CL
console.log(movieID);

// CL - call getMovie Function
getMovieID();

// CL & SS - Function to call GET Search Movies to get Movie ID
function getMovieID (title){
    recommendedMovie = title;
    console.log(title);
    idURL= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMBD + "&language=en-US&query=" + recommendedMovie + "&page=1&include_adult=false";
    fetch(idURL)
    .then(function(response){
        if (response.ok) {
            // need to look at other examples to make sure the .then below is correct as instructor said this isn't happening
            response.json().then(function (data) {
                console.log("API call was a success!");
                console.log(data.results[0].id);
                movieID=data.results[0].id;
                Trailers(movieID);                
              });
            }      
        })
    console.log(movieID)
    
}

console.log(movieID);

// CL - Function for Trailers API
// Function to populate Trailer with movie ID

function Trailers (movieID) {
    console.log(movieID);
    let trailerURL = "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + apiKeyTMBD + "&language=en-US";
    // Chelsea's back up plan if trailerURL doesn't work
    // let videoURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKeyTMBD + "&append_to_response=videos,images";
   
    fetch(trailerURL)
    .then(function(response){
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                // Pull they video key from the API Trailer Array
                 let videoKey = data.results[0].key;
                //  console.log(videoKey);
                let trailerMovieName =data.results[0].name;
                console.log(trailerMovieName);
                //  Create the Youtube Link with the key of the video
                let YoutubeLink = "https://www.youtube.com/watch?v=" + videoKey;
                console.log(YoutubeLink);

                // Update Trailer element in HTML to have the new Youtube Link
                // trailerSourceEl.setAttribute('src', YoutubeLink);
                // trailerSourceEl.textContent = YoutubeLink;
                // trailerContainerEl.textContent = YoutubeLink;
                
                // Create organized list element
                let trailerListEl = document.createElement("ol");
                // Add class to the trailerListEl
                trailerListEl.setAttribute("class","pad-8");
                trailerListEl.setAttribute("id","trailer-list");
                // Creates trailer Link list Element
                let li1 = document.createElement("li");
                // Add text to link
                li1.innerHTML ='<a href=' +YoutubeLink + '>Watch the trailer video: '+ trailerMovieName + '</a>'
                // li1.textContent = "Watch the trailer video!"
                // Update href link with new YoutubeLink Variable
                // li1.href = "YoutubeLink";
                // Appends trailer Link Element as a child of the results element
                trailerEl.appendChild(trailerListEl);
                // Append list items to ordered trailerListEl
             
                trailerListEl.appendChild(li1);
            
                // resultsEl.append(linkTrailerEl.href = YoutubeLink);

                // 
                // for (var i = 0; i < 5; i++) {
                //     linkTrailerEl[i].href = YoutubeLink;
                //     var count = i + 1;
                // }
            });   

            } else {
                // linkTrailerEl.css("display", "none");
                console.log('getVideos API call not working');
            }
        
    })


}    

        // Function to play the movie trailer
        function playTrailer (params) {
            
        }

// SM - Function for trending movie data
let trendingListEl = $("#trending-container");

$(function () {
    let trendingUrl = "https://api.themovidedb.org/3/movie/popular?api_key=" + apiKeyTMBD + "&language=en-US&page=1";
    fetch(trendingUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
})

