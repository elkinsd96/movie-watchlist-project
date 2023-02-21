import { renderWatchlist } from "./movies.js"
import { removeFromWatchlist } from "./movies.js"

document.addEventListener("click", function(e) {
     if (e.target.dataset.remove) {
        removeFromWatchlist(e.target.dataset.remove)
        renderWatchlist()
    }
})

renderWatchlist()