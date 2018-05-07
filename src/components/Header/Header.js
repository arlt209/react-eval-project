import './header.scss'
import PropTypes from 'prop-types'
import FaAlignRight from 'react-icons/lib/fa/align-right'
import FaSearch from 'react-icons/lib/fa/search'
import FaStarO from 'react-icons/lib/fa/star-o'
import IoIosGearOutline from 'react-icons/lib/io/ios-gear-outline'
import FaAngleDown from 'react-icons/lib/fa/angle-down'

import React, {Component} from 'react'

export default class Header extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  state = {}

  // styleName='icon-container'
  // .icon-container {
  //   display: flex;
  //   justifyContent: center;
  //   align-items: center; 
  //   width: 70px;
  //   height: 60px;
  //   background-color: #D65868 ;
  // }

  render () {
    return (
      <div styleName='header'>
        <div styleName='row-container'>
          <div styleName='icon-container-left'>
            <div><FaAlignRight size={30} /></div>
          </div>
          <div styleName='header-name'>
            {this.props.name}<span style={{ color: '#BCBCBC', 'font-weight': '100' }}> / Dashboard</span>
          </div>
        </div>
        <div style={{ height: '100%', 'flex-grow': '1' }} />
        <div styleName='icon-container'>
          <FaSearch size={20} />
        </div>
        <div styleName='icon-container'>
          <FaStarO size={20} />
        </div>
        <div styleName='icon-container'>
          <IoIosGearOutline size={20} />
        </div>
        <div styleName='image-container'>
          <img src={this.props.avatar} alt='Avatar' styleName='avatarImage' />
        </div>
        <div style={{width: '15px'}}>
          <FaAngleDown />
        </div>
      </div>
    )
  }
}
