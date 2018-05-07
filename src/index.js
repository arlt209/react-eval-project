import React from 'react'
import ReactDOM from 'react-dom'
import ApplicationNode from './ApplicationNode'
import {unregister} from './services/registerServiceWorker'
import store from './services/store'
import 'bootstrap/dist/css/bootstrap.css'

const render = (Component) => {
  ReactDOM.render(
    <Component store={store} />,
    document.getElementById('root')
  )
}

render(ApplicationNode)
unregister()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./ApplicationNode', () => {
    const NextApp = require('./ApplicationNode').default
    render(NextApp)
  })
}
