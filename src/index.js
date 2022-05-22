import { handleSearch } from "./js/get-gallery"
import { buildInitialGallery, clearGallery } from "./js/build-gallery"

// add search box event listeners
const searchButton = document.querySelector('.search--button')
const searchBox = document.querySelector('.search--box')

searchButton.addEventListener('click', handleSearch)
document.addEventListener('keypress', (e) => {
  if (e.key === "Enter" && searchBox === document.activeElement) {
    handleSearch(e).then((galleryData) => {
      buildInitialGallery(galleryData)
    })
  }
})

// build gallery after initial dom render if a gallery is already saved in localStorage
// This is just for use while testing as to avoid breaking the api request limit - 200 per hour
if(localStorage.getItem('last_gallery') !== null) {
  const galleryData = JSON.parse(localStorage.getItem('last_gallery'))
  buildInitialGallery(galleryData)
}
