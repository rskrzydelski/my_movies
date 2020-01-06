export const get = url =>
  new Promise(
    (resolve, reject) => {
      fetch(url, {
        headers: {
          'Authorization': 'Token ' + localStorage.token
        },
      })
      .then(response => response.json())
      .then(json => resolve(json)).catch()
    }
  )


const apiCall = (url, method, body, resolve, reject) =>
  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
  }).then(response => {
      response.json()
      .then(json => resolve(json))
  }).catch( error => console.error(error))

export const post = (url, body) =>
  new Promise(
    (resolve, reject) => apiCall(url, 'POST', body, resolve, reject)
)

const authApiCall = (url, method, body, resolve, reject) =>
  fetch(url, {
    method: method,
    headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Token ' + localStorage.token
      },
      body: JSON.stringify(body)
  }).then(response => {
      response.json()
      .then(json => resolve(json))
  }).catch( error => console.error(error))

export const authPost = (url, body) =>
  new Promise(
    (resolve, reject) => authApiCall(url, 'POST', body, resolve, reject)
  )

  const authApiDelete = (url, resolve, reject) =>
  fetch(url, {
    method: 'DELETE',
    headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Token ' + localStorage.token
      },
  }).then(response => {
      resolve(response)
  }).catch( error => console.error(error))

export const authDelete = (url) =>
  new Promise(
    (resolve, reject) => authApiDelete(url, resolve, reject)
  )
