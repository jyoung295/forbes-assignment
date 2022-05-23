// called when the page is loaded or when a new search happens
// defaults to showing the first page of the new gallery
const buildInitialGallery = (galleryData => {
  clearGallery()
  clearPagination()

  const numPhotos = galleryData.per_page
  const photos = galleryData.photos
  const pages = 5
  const perPage = numPhotos / pages

  buildPagination(photos, perPage, pages)
  buildPage(photos, perPage, 1)
})

// takes array of photos data, number of photos per page, and the page number then adds photos to the gallery from that page of photo data.
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
    photoElement.loading  = "lazy"
    photoElement.classList.add('gallery__photos--thumbnail')
    photoElement.addEventListener('click', handleModalOpen)


    // build the modal element, add the image, photo credit, and close button
    let photoModal = document.createElement('div')
    photoModal.classList.add('gallery__photos--modal')
    photoModal.setAttribute('data-id', photoId)

    let photoModalImg = document.createElement('img')
    photoModalImg.src = photoLarge
    photoModalImg.alt = photoAlt
    photoModalImg.loading  = "lazy"
    photoModalImg.classList.add('gallery__photos--modal-image')

    let photoModalCredit = document.createElement('a')
    photoModalCredit.href = photoCreditLink
    photoModalCredit.innerText = `Credit: ${photoCredit}`
    photoModalCredit.target = "_blank"
    photoModalCredit.classList.add('gallery__photos--modal-credit')

    let photoModalClose = document.createElement('button')
    photoModalClose.innerText = "x"
    photoModalClose.classList.add('gallery__photos--modal-close')
    photoModalClose.addEventListener('click', handleModalClose)

    photoModal.appendChild(photoModalImg)
    photoModal.appendChild(photoModalCredit)
    photoModal.appendChild(photoModalClose)


    // add the image to the grid then add the corresponding modal.
    photosContainer.appendChild(photoElement)
    photosContainer.appendChild(photoModal)
  });

  const previousPage = document.querySelector('.gallery__pagination--button.selected')
  const selectedPage = document.querySelector(`.gallery__pagination--button[data-page="${page}"]`)
  previousPage?.classList.remove('selected')
  selectedPage?.classList.add('selected')
}

// adds the pagination buttons at the bottom of the gallery
const buildPagination = (photos, perPage, pages) => {
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
}

// clears all gallery photos
const clearGallery = () => {
  const photosContainer = document.querySelector('.gallery__photos')

  while(photosContainer.firstChild) {
    photosContainer.removeChild(photosContainer.firstChild)
  }
}

// clears the current pagination so that duplicates are not added.
const clearPagination = () => {
  const pagination = document.querySelector('.gallery__pagination')

  while(pagination.firstChild) {
    pagination.removeChild(pagination.firstChild)
  }
}

const handleModalOpen = (e) => {
  e.preventDefault()

  const photoId = e.target.id
  const modalToOpen = document.querySelector(`.gallery__photos--modal[data-id="${photoId}"]`)

  modalToOpen.classList.add("open")
}

const handleModalClose = (e) => {
  e.target.parentElement.classList.remove("open")
}

export {buildInitialGallery, clearGallery, clearPagination}