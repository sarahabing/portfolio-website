const username = "test"
const password = "abcd@1234"

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json + " password ", password))