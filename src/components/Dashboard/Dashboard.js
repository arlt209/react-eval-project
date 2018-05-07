import './dashboard.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { setStars } from '../../actions/starsActions'
import { setForks } from '../../actions/forksActions'
import StarsBarGraph from '../StarsBarGraph'
import ForksBarGraph from '../ForksBarGraph'
import GoMarkGithub from 'react-icons/lib/go/mark-github'
import AreaChart from '../AreaChart'

const mapStateToProps = state => ({
  stars: state.stars.stars,
  starsRepoName: state.stars.starsRepoName,
  forks: state.forks.forks,
  forksRepoName: state.forks.forksRepoName
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  setStars,
  setForks
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)

export default class Dashboard extends Component {
  static propTypes = {
    repos: PropTypes.array.isRequired,
    userData: PropTypes.object.isRequired,
    setStars: PropTypes.func.isRequired,
    setForks: PropTypes.func.isRequired,
    stars: PropTypes.number.isRequired,
    starsRepoName: PropTypes.string.isRequired,
    forks: PropTypes.number.isRequired,
    forksRepoName: PropTypes.string.isRequired,
    totalStars: PropTypes.number.isRequired,
    totalForks: PropTypes.number.isRequired
  }

  state = {}

  componentDidMount () {
    // used setTimeOut as i was unable to trigger the dom to reRender without using a promise on the api call
    // and setting some sort of success action to trigger the re rendering of the the dome
    // so for the sake of time i just used set timeout to ensure that the data was loaded before the component rendered
    setTimeout(() => {
      this.setData()
    }, 1002)
  }

  /**
   * Gets the repo data and iterates over it and pushes the values
   * name, forks_count, stargzers_count and watchers into their own arrays whicha are
   * then saved to local state and passed down into the area graph component
   * @name setData
   * @type method
   */
  setData () {
    let forksArr = []
    let starsArr = []
    let watchersArr = []
    let repoNameArr = []
    this.props.repos.map((repo) => {
      repoNameArr.push(repo.name)
      forksArr.push(repo.forks_count)
      starsArr.push(repo.stargazers_count)
      watchersArr.push(repo.watchers)
    })
    this.setState(() => {
      return {
        forksArr: forksArr,
        starsArr: starsArr,
        watchersArr: watchersArr,
        repoNameArr: repoNameArr
      }
    })
  }

  render () {
    return (
      <div styleName='dashboard-container'>
        <div styleName='top-row-container'>
          <div styleName='yellow-container'>
            <div styleName='wrapper'>
              <div id='starsTip' />
              <div styleName='inner-container'>
                <div styleName='text-container'>
                  <div styleName='text-medium'>
                    {this.props.starsRepoName}
                  </div>
                  <div styleName='text-small'>
                    Stars
                  </div>
                  <div styleName='text-large'>
                    {this.props.stars}
                  </div>
                </div>
                <div styleName='graph-container'>
                  <StarsBarGraph repos={this.props.repos} setStars={this.props.setStars} />
                </div>
              </div>
              <div styleName='bottom-text-container'>
                {this.props.totalStars + ' Stars on GitHub'}
              </div>
            </div>
          </div>
          <div styleName='blue-contaioner'>
            <div styleName='wrapper'>
              <div id='forksTip' />
              <div styleName='inner-container'>
                <div styleName='text-container' >
                  <div styleName='text-medium'>
                    {this.props.forksRepoName}
                  </div>
                  <div styleName='text-small'>
                    Forks
                  </div>
                  <div styleName='text-large'>
                    {this.props.forks}
                  </div>
                </div>
                <div styleName='graph-container'>
                  <ForksBarGraph repos={this.props.repos} setForks={this.props.setForks} />
                </div>
              </div>
              <div styleName='bottom-blue-text-container'>
                { this.props.totalForks + ' Forks on GitHub'}
              </div>
            </div>
          </div>
          <div styleName='orange-container'>
            <div styleName='wrapper'>
              <div styleName='orange-inner-container'>
                <div styleNanem='orange-text-container'>
                  <div styleName='orange-text-bold'>{this.props.userData.followers} Followers </div>
                  <div styleName='orange-text-bold'>{this.props.userData.following} Following </div>
                  <div styleName='orange-text'>id:{this.props.userData.id}</div>
                </div>
                <div styleName='orange-graph-container'>
                  <div styleName='orange-graph-wrapper'>
                    <h3><GoMarkGithub /></h3>
                  </div>
                  <div styleName='orange-username-text'>
                    {this.props.userData.login}
                  </div>
                </div>
              </div>
              <div styleName='orange-bottom-text-container'>
                Click For More Info
              </div>
            </div>
          </div>
        </div>
        <div styleName='area-graph-container'>
          <AreaChart repoNames={this.state.repoNameArr} stars={this.state.starsArr} forks={this.state.forksArr} watchers={this.state.watchersArr} />
        </div>
      </div>
    )
  }
}
