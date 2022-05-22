const PEXEL_BASE_URL = "https://api.pexels.com/v1/search"

const callPexelApi = async (searchTerm) => {
  const urlParams = new URLSearchParams({
    query: searchTerm,
    per_page: 50,
  })
  const requestUrl = `${PEXEL_BASE_URL}?${urlParams}`
  let response = await fetch(requestUrl, {
    headers: {
      Authorization: "563492ad6f91700001000001c21483ced7314857a65d0994a6d98a7c"
    }
  });

  if (response.ok) {
    let json = await response.json();
    return(json)
  } else {
    alert("HTTP-Error: " + response.status);
  }

}

export {callPexelApi}