import { SET_STARS } from 'constants/actionTypes'

const initialState = []

export default function stars (state = initialState, action) {
  switch (action.type) {
    case SET_STARS:
      return {
        stars: action.stars,
        starsRepoName: action.starsRepoName
      }
    default:
      return state
  }
}
