import { callPexelApi } from "./pexel-api"

const handleSearch = async (e) => {
  e.preventDefault()
  
  // get the searech box depending on which event was fired
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