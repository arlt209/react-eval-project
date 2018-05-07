import { SET_FORKS } from 'constants/actionTypes'

export function setForks (d) {
  return (dispatch) => {
    dispatch({
      type: SET_FORKS,
      forks: d.forks_count,
      forksRepoName: d.name
    })
  }
}
