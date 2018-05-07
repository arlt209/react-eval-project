import {SET_STARS} from 'constants/actionTypes'

export function setStars (d) {
  return (dispatch) => {
    dispatch({
      type: SET_STARS,
      stars: d.stargazers_count,
      starsRepoName: d.name
    })
  }
}
