import {combineReducers} from 'redux'
import repos from './reposReducer'
import user from './userReducer'
import stars from './starsReducer'
import forks from './forksReducer'

export default combineReducers({
  repos,
  user,
  stars,
  forks
})
