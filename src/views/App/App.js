import './app.scss'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import Header from 'components/Header'
import {getUser} from 'actions/userActions'
import { getRepos } from 'actions/reposActions'
import { setStars } from 'actions/starsActions'
import { setForks } from 'actions/forksActions'
import Dashboard from 'components/Dashboard'

const mapStateToProps = state => ({
  userData: state.user,
  userAvatar: state.user.avatar_url,
  userName: state.user.login,
  userBio: state.user.bio,
  repoData: state.repos,
  starsRepoName: state.stars.starsRepoName,
  forksRepoName: state.forks.forksRepoName
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  getRepos,
  getUser,
  setStars,
  setForks
}, dispatch))

@withRouter
@connect(mapStateToProps, mapDispatchToProps)

export default class App extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    userAvatar: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    repoData: PropTypes.func.isRequired,
    setStars: PropTypes.func.isRequired,
    setForks: PropTypes.func.isRequired
  }

  state = {
    totalStars: 0,
    totalForks: 0
  }

  componentWillMount () {
    const {getUser, getRepos} = this.props
    getUser()
    getRepos()
  }

  componentDidMount () {
    // used setTimeOut as i was unable to trigger the dom to reRender without using a promise on the api call
    // and setting some sort of success action to trigger the re rendering of the the dome
    // so for the sake of time i just used set timeout to ensure that the data was loaded before the component rendered
    setTimeout(() => {
      this.count()
    }, 1002)
  }

  /**
   * Iterates over the repoData and sets local state for total stars and total forks
   * which are then passed down to the dashboard component to be used in the fork and stars containers
   * @name count
   * @type method
   */
  count () {
    let sumOfstars = 0
    let sumOfforks = 0
    this.props.repoData.map((repo) => {
      sumOfstars += repo.stargazers_count
      sumOfforks += repo.forks_count
    })

    this.setState(() => {
      return {
        totalStars: sumOfstars,
        totalForks: sumOfforks
      }
    })
  }

  render () {
    return (
      <div styleName='app'>
        <Header avatar={this.props.userAvatar} name={this.props.userData.name} />
        <Dashboard
          userData={this.props.userData}
          repos={this.props.repoData}
          setStars={this.props.setStars}
          totalStars={this.state.totalStars}
          totalForks={this.state.totalStars}
          setForks={this.props.setForks} />
      </div>
    )
  }
}
