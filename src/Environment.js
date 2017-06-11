const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')

// Here you instantiate the required Store that will store the cached data.
const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj3svpvvv9qyu0151s49i8ju4', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
})

const environment = new Environment({
  network,
  store,
})

export default environment
