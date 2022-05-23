import { clearGallery, clearPagination } from "./build-gallery"
import { callPexelApi } from "./pexel-api"

import loadingWheel from '../loading-45.gif'

const handleSearch = async (e) => {
  e.preventDefault()

  // clear the galery on search and append the loading wheel
  clearGallery()
  clearPagination()
  const photosContainer = document.querySelector('.gallery__photos')
  let loadingGif = document.createElement('img')
  loadingGif.src = loadingWheel
  loadingGif.classList.add('gallery__photos--loading')
  photosContainer.appendChild(loadingGif)

  
  // get the search box depending on which event was fired
  const searchBox = e.type === "keypress" ? e.target : e.target.parentElement.firstElementChild
  const searchValue = searchBox.value

  // force unfocus the text box
  searchBox.blur()
  
  // return response from Pexel API
  return callPexelApi(searchValue).then(gallery => {

    localStorage.setItem('last_gallery', JSON.stringify(gallery))
    return gallery
  })


}

export {handleSearch}