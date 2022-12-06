// Loading
const loader = document.querySelector('.preload');

movie = {title: "Ponyo", year: "2008", genre: "Animation, Adventure, Comedy", plot: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.", rated: "G"};



// function addMovie() {
//     let newMovie = {
//         title: "Ponyo",
//         year: "2008",
//         genre: "Animation, Adventure, Comedy",
//         plot: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
//         rated: "G"
//     }
//     $.ajax('https://determined-unleashed-ixia.glitch.me/movies', {
//         method: "POST",
//         data: newMovie
//     })
//     console.log('Movie added');
// }
// addMovie();

// Glitch Database
fetch('https://determined-unleashed-ixia.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            console.log('Glitch:', data);
            document.querySelector(".preload").style.display = "none"; // stop the load
            document.querySelector(".display").style.display = "block"; // show the main
        }, 3000);
    })

function getMovies() {
    fetch('https://determined-unleashed-ixia.glitch.me/movies').then((response) => {
        console.log('Movies:', response.json());
    });
}
getMovies();

// Remove a Movie
function removeMovie(id) {
    fetch('https://determined-unleashed-ixia.glitch.me/movies' + "/" + id, {
        method: 'DELETE'
    }).then(() => {
        console.log('removed');
    }).catch(err => {
        console.error(err)
    });
}
// removeMovie();

// OMDB Pull Function
function omdbData() {
    return fetch(omdbKey).then(response => response.json()) // Converts the response into a json
}
//--------------------- Create Movie Search Card ---------------------------
// function creates card html for searched movie and assigns to a variable

function makeMovieProfile() {
    //********* Need to feed searched movie info into variables below ************
    let movieProfile = '<div class="card movieProfile" style="width: 18rem;">';
    movieProfile += '<img src="' + /* (Poster) Image Variable Here */ +'" className="card-img-top" alt="...">';
    movieProfile += '<div class="card-body">'
    movieProfile += '<h5 class="card-title headerFont"> '+ /* Movie Title Variable Here */ +' </h5>'
    movieProfile += '<p class="card-text">' + /* (Actors) Movie Info Block Variable Here */ + ' roast</p>'
    movieProfile += '<p class="card-text">' + /* (Director) Movie Info Block Variable Here */ + ' roast</p>'
    movieProfile += '<p class="card-text">' + /* (Plot) Movie Info Block Variable Here */ + ' roast</p>'
    movieProfile += '<p class="card-text">' + /* (Genre) Movie Info Block Variable Here */ + ' roast</p>'
    movieProfile += '</div>'
    movieProfile += '</div>'

    return movieProfile;
}
// Pushes searched movie card to HTML container
function loadMovieProfile() {
    // ******* Need to call
    let searchMovieContainer = document.querySelector('#movie-search-container');
    searchMovieContainer.innerHTML = makeMovieProfile();

}
//******* Still need to create HTML container assigned to container to feed to ******
//--------------------- End Movie Search Card ---------------------------
//--------------------- Start Search a Movie ----------------------------------
let userMovieSearch = document.querySelector('#movie-search-btn');

userMovieSearch.addEventListener('click', function (){

    event.preventDefault();

    let titleSearch = document.querySelector('#movie-search-input').value
    let omdbKey2 = "http://www.omdbapi.com/?t=" + titleSearch + "&apikey=850df038"

    fetch(omdbKey2).then((response) => {
        console.log('OMDB:', response.json());
    });
})
// --------------------- End Movie Search ----------------------------------
$.get("https://determined-unleashed-ixia.glitch.me/movies").done(function (data) {
    omdbData().then( data => {
        console.log('OMDB:', data);

        // Details from OMDB
        let {Title, Year, Genre, Rated, Plot, Poster} = data;
        // console.log(Title, Year, Genre, Rated, Plot, Poster);

        // Pushes to the Card
        $('#title').html(Title);
        $('#year').html(Year);
        $('#genre').html(Genre);
        $('#rated').html(Rated);
        $('#plot').html(Plot);
        $('#img').html(`<img src="${Poster}" class="rounded-start img-fluid">`);

    });
});
//------------ Add a Movie Function ----------------
let movieAddBtn = document.querySelector('#movie-add-btn');
movieAddBtn.addEventListener('click', addMovie);
// function makes post request to glitch db
function addMovie(title, year, genre, plot, rated) {
    event.preventDefault();

    let newTitle = document.querySelector('#new-movie-title').value
    let newYear = document.querySelector('#new-movie-year').value
    let newGenre = document.querySelector('#new-movie-genre').value
    let newPlot = document.querySelector('#new-movie-plot').value
    let newRated = document.querySelector('#new-movie-rated').value
    let newPoster = document.querySelector('#new-movie-poster').value

    $.post('https://determined-unleashed-ixia.glitch.me/movies', {
        title, year, genre, plot, rated
    }).done(function() {
        console.log(newTitle, newYear, newGenre, newPlot, newRated);
        console.log('Movie added');
    });

    console.log(getMovies());
}

//------------- Add Movie End -----------------------
// Specifications
// Your application should:
//
//      On page load:
//      Completed: Display a "loading..." message
//      Completed: Make an AJAX request to get a listing of all the movies
//      Completed: When the initial AJAX request comes back, remove the "loading..." message and
//      replace it with HTML generated from the json response your code receives
//
//      Allow users to add new movies:
//      TODO: Create a form for adding a new movie that has fields for the movie's title and           rating
//      TODO: When the form is submitted, the page should not reload / refresh, instead, your           javascript
//       should make a POST request to /movies with the information the user put into the form
//
//      Allow users to edit existing movies:
//      TODO: Give users the option to edit an existing movie
//      TODO: A form should be pre-populated with the selected movie's details
//      TODO: Like creating a movie, this should not involve any page reloads, instead your javascript
//       code should make an ajax request when the form is submitted.
//
//      Delete movies:
//      TODO: Each movie should have a "delete" button
//      TODO: When this button is clicked, your javascript should send a DELETE request
//
//      Bonuses:
//      TODO: Add a disabled attribute to buttons while their corresponding ajax request is still pending.
//      TODO: Show a loading animation instead of just text that says "loading...".
//      TODO: Use modals for the creating and editing movie forms.
//      TODO: Add a genre property to every movie.
//      TODO: Allow users to sort the movies by rating, title, or genre (if you have it).
//      TODO: Allow users to search through the movies by rating, title, or genre (if you have it).
//      TODO: Use a free movie API like OMDB to include extra info or render movie posters.