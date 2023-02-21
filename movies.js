import { getLocaLStorage, addToLocalStorage, removeFromLocalStorage, checkedLocaLStorage } from "./utilities.js"

let movieContainerEl = document.getElementById("movie-container")
let watchlistContainerEl = document.getElementById("watchlist-container")

export let movieResultArray = []
export var watchListArray = []

export async function searchMovie(movieSearch) {
    getLocaLStorage()
    loadingScreen()
    setTimeout(async () => {
        const resp = await fetch(`https://www.omdbapi.com/?apikey=9dd16ffd&s="${movieSearch}"&type="movie"`)
        const data = await resp.json()
        if (!data.Search) {
            const movieNotFoundHtml = `
            <div class="no-movies-found-container">
                <p>We were unable to find any movies with the name "${movieSearch}"...</p>
            </div>
            `
            movieContainerEl.innerHTML = movieNotFoundHtml
        } else {
            const movieIdArray = data.Search.map(movie => movie.imdbID)
            movieResultArray = await getMovieById(movieIdArray)
            renderMovies(movieResultArray)
        }
    }, "2500")
}

export async function getMovieById(movieIdArray) {
    const movieArray = []
    for(const movieId of movieIdArray){
        const resp = await fetch(`https://www.omdbapi.com/?apikey=9dd16ffd&i=${movieId}`)
        const data = await resp.json()
        movieArray.push(data)
        }
    return movieArray
}

export function inWatchlist(movieId) {
    return watchListArray.find(movie => movie.imdbID === movieId)
}

export function addToWatchlist(movieId) {
    movieResultArray.forEach(movie => {
        if(movie.imdbID === movieId) {
            watchListArray.push(movie)
            addToLocalStorage(movie)
        }
    })
}

export function removeFromWatchlist(movieId) {
    watchListArray.forEach(movie => {
        if(movie.imdbID === movieId) {
            const index = watchListArray.indexOf(movie)
            watchListArray.splice(index, 1)
            removeFromLocalStorage(movie)
        }
    })
}

export function renderMovies(movieArray) {
    let movieHtml = ""
    movieArray.forEach(movie => {
        if(!inWatchlist(movie.imdbID)){
            movieHtml += `
                <div class="movie">
                    <div class="movie-img-container">
                        <img class="movie-img" src="${movie.Poster}">
                    </div>
                    <div class="movie-item-container">
                        <div class="movie-header-container">
                            <h1 class="title">${movie.Title}</h1>
                            <i class="fa-solid fa-star"></i>
                            <p class="rating">${movie.imdbRating}</p>
                        </div>
                        <div class="movie-details-container">
                            <p class="runtime">${movie.Runtime}</p>
                            <p class="genre">${movie.Genre}</p>
                            <p class="watchlist-btn" data-add="${movie.imdbID}">
                                <i class="fa-solid fa-circle-plus"></i>
                                Watchlist
                            </p>
                        </div>
                        <div class="movie-plot-container">
                            <p class="plot">${movie.Plot}</p>
                        </div>
                    </div>
                </div>
            `
        } else {
            movieHtml += `
            <div class="movie">
                <div class="movie-img-container">
                    <img class="movie-img" src="${movie.Poster}">
                </div>
                <div class="movie-item-container">
                    <div class="movie-header-container">
                        <h1 class="title">${movie.Title}</h1>
                        <i class="fa-solid fa-star"></i>
                        <p class="rating">${movie.imdbRating}</p>
                    </div>
                    <div class="movie-details-container">
                        <p class="runtime">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <p class="watchlist-btn" data-remove="${movie.imdbID}">
                            <i class="fa-solid fa-circle-minus"></i>
                            Watchlist
                        </p>
                    </div>
                    <div class="movie-plot-container">
                        <p class="plot">${movie.Plot}</p>
                    </div>
                </div>
            </div>
        `
        }
    });
    movieContainerEl.innerHTML = movieHtml
}

export function renderWatchlist() {
    if(!checkedLocaLStorage()) {
        getLocaLStorage()
    }

    let movieHtml = ""
    if(watchListArray.length != 0) {
        watchListArray.forEach(movie => {
            movieHtml += `
                <div class="movie">
                    <div class="movie-img-container">
                        <img class="movie-img" src="${movie.Poster}">
                    </div>
                    <div class="movie-item-container">
                        <div class="movie-header-container">
                            <h1 class="title">${movie.Title}</h1>
                            <i class="fa-solid fa-star"></i>
                            <p class="rating">${movie.imdbRating}</p>
                        </div>
                        <div class="movie-details-container">
                            <p class="runtime">${movie.Runtime}</p>
                            <p class="genre">${movie.Genre}</p>
                            <p class="watchlist-btn" data-remove="${movie.imdbID}">
                                <i class="fa-solid fa-circle-minus"></i>
                                Watchlist
                            </p>
                        </div>
                        <div class="movie-plot-container">
                            <p class="plot">${movie.Plot}</p>
                        </div>
                    </div>
                </div>
            `
        })
    } else {
        movieHtml = `
            <div class="watchlist-text">
                <p>Your watchlist is looking a little empty...</p>
                <a href="./index.html" class="link">
                    <i class="fa-solid fa-circle-plus"></i>
                    Let's add some movies!
                </a>
            </div>
        `
    }
    watchlistContainerEl.innerHTML = movieHtml 
}

function loadingScreen() {
    let loadingHtml = ""
    loadingHtml +=  `
        <div class="loading-container">
            <img class="loading-icon" src="images/loadingIcon.gif">
            <p class="loading-text">Give us a moment as we search for your movie</p>
        </div>
    `
    movieContainerEl.innerHTML = loadingHtml
}