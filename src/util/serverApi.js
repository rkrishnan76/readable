const api =  'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Whatever-I-Want',
  'Content-Type': 'application/json',
}

export const getServerCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(ret => ret.categories)
}

export const getServerPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then(response => response.json())
}

export const getServerPostsByCategory = (category) => {
  // Returns the posts as an array
  return fetch(`${api}/${category}/posts`, { headers })
    .then(response => response.json())
}

export const getServerComments = (id) => {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(response => response.json())
}

export const getServerComment = (id) => {
  return fetch(`${api}/comments/${id}`, { headers })
    .then(response => response.json())
}

export const deleteServerComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
}

export const addServerComment = (addComment) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(addComment)
  })
}


export const editServerComment = (id, editComment) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(editComment)
  })
}

export const voteServerComment = (id, option) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: option
    })
  })
}



export const addServerPost = (addPost) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(addPost)
  })
}

export const editServerPost = (id, editPost) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(editPost)
  })
}

export const getServerPost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { headers })
    .then(response => response.json())
}

export const voteServerPost = (id, option) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: option
    })
  })
}

export const deleteServerPost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
}
