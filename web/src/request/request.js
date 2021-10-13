import config from '../config.json'
import axios from 'axios'

const request = {
  get: (path) => {
    return fetch(config.apiGameEndpoint + path)
  },
}

// -------------------------------------------------------------------------------- EXPOSE
export { request }
