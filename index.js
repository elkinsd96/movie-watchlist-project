import { searchMovie, addToWatchlist, removeFromWatchlist, renderMovies, movieResultArray} from "./movies.js"

const searchEl = document.getElementById("search")
const searchBtnEl = document.getElementById("search-btn")

if((searchBtnEl)){
    searchBtnEl.addEventListener("click", function(e) {
        e.preventDefault()
        searchMovie(searchEl.value)
    })
}

document.addEventListener("click", function(e) {
    if(e.target.dataset.add){
        addToWatchlist(e.target.dataset.add)
        renderMovies(movieResultArray)
    } else if (e.target.dataset.remove) {
        removeFromWatchlist(e.target.dataset.remove)
        renderMovies(movieResultArray)
    }
})
