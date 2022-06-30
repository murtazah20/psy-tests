import {combineReducers} from 'redux'
import guestScreenReducer from './guestScreen'
import mainQuizReducer from './mainQuizReducer'

export default combineReducers({
    allTests: guestScreenReducer

})