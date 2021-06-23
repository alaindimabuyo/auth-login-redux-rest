import {combineReducers} from 'redux'
import {loginReducer} from './loginReducer'

const reducers = combineReducers({
    loginReducer: loginReducer  
})

export default reducers