
import axios from 'axios'

const SetAuthToken = token => {
    if (token !== 'undefined') {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default SetAuthToken