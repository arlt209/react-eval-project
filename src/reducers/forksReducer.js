import { SET_FORKS } from 'constants/actionTypes'

const initialState = []

export default function forks (state = initialState, action) {
  switch (action.type) {
    case SET_FORKS:
      return {
        forks: action.forks,
        forksRepoName: action.forksRepoName
      }
    default:
      return state
  }
}
