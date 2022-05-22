
const buildInitialGallery = (galleryData => {
  clearGallery()
  clearPagination()

  const numPhotos = galleryData.per_page
  const photos = galleryData.photos
  const pages = 5
  const perPage = numPhotos / pages

  const paginationContainer = document.querySelector('.gallery__pagination')

  // add pagination to gallery
  for (let i = 0; i < pages; i++) {
    let paginationButton = document.createElement('li')
    paginationButton.innerText = `${i + 1}`
    paginationButton.setAttribute('data-page', `${i + 1}`)
    paginationButton.classList.add('gallery__pagination--button')

    paginationButton.addEventListener('click', (e) => {
      e.preventDefault()
      const dataPage = e.target.dataset.page
      buildPage(photos, perPage, dataPage)
    })

    paginationContainer.appendChild(paginationButton)
  }



  buildPage(photos, perPage, 1)
})

const buildPage = (photos, perPage, page) => {
  clearGallery()

  const sliceStart = (page - 1) * perPage
  const sliceEnd = sliceStart + perPage

  const pageToPrint = photos.slice(sliceStart, sliceEnd)
  console.log(pageToPrint)

  const photosContainer = document.querySelector('.gallery__photos')

  pageToPrint.forEach(photo => {
    // get info needed for thumbnails in the gallery
    let photoThumb = photo.src.tiny
    let photoAlt = photo.alt
    let photoId = photo.id

    // get info needed for modals
    let photoLarge = photo.src.large
    let photoCredit = photo.photographer
    let photoCreditLink = photo.photographer_url

    // build the img element for the gallery.
    let photoElement = document.createElement('img')
    photoElement.src = photoThumb
    photoElement.alt = photoAlt
    photoElement.id  = photoId
    photoElement.classList.add('gallery__photos--thumbnail')

    // add the image to the grid
    photosContainer.appendChild(photoElement)
  });

  const previousPage = document.querySelector('.gallery__pagination--button.selected')
  const selectedPage = document.querySelector(`.gallery__pagination--button[data-page="${page}"]`)
  previousPage?.classList.remove('selected')
  selectedPage.classList.add('selected')
}

const clearGallery = () => {
  const photosContainer = document.querySelector('.gallery__photos')

  while(photosContainer.firstChild) {
    photosContainer.removeChild(photosContainer.firstChild)
  }
}
const clearPagination = () => {
  const pagination = document.querySelector('.gallery__pagination')

  while(pagination.firstChild) {
    pagination.removeChild(pagination.firstChild)
  }
}

export {buildInitialGallery, clearGallery}