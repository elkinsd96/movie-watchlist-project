import { watchListArray } from "./movies.js"


let localStorageBool = false

export function checkedLocaLStorage() {
    if(!localStorageBool) {
        localStorageBool = true
        return false
    }
    return true
}

export function getLocaLStorage() {
    for(let i = 0; i < localStorage.length; i++) {
        let movie = localStorage.key(i)
        watchListArray.push(JSON.parse(localStorage.getItem(movie)))
    }
}

export function addToLocalStorage(movie) {
    window.localStorage.setItem(movie.imdbID, JSON.stringify(movie))
}

export function removeFromLocalStorage(movie) {
    window.localStorage.removeItem(movie.imdbID)
}
