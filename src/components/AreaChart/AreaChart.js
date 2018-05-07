
import './areaChart.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

export default class Dashboard extends Component {
  static propTypes = {
    repoNames: PropTypes.array.isRequired,
    watchers: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
    forks: PropTypes.array.isRequired
  }
  componentDidMount () {
    setTimeout(() => {
      this._renderChart()
    }, 1003)
  }

  /**
   * Method creates a new area chart
   * and takes in the repoName, watchers, stars, and forks arrays that are
   * passed in from the parent component. it then uses those arrays to set the
   * labels, and data values for the graph.
   * 
   * need to research a better way to instantiate the chart.
   * @name _renderChart
   * @type method
   */
  _renderChart () {
    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
      // sets the graph to be responsive to the parent containers height and width.
      responsive: true,
      // chart type
      type: 'line',
      data: {
        // labels and data for area chart data and labels are arrays passed in as props.
        labels: this.props.repoNames,
        datasets: [{
          data: this.props.watchers,
          label: 'Watchers',
          borderColor: '#D56E44',
          fill: false
        }, {
          data: this.props.stars,
          label: 'Stars',
          borderColor: '#EAB46F',
          fill: false
        }, {
          data: this.props.forks,
          label: 'Forks',
          borderColor: '#419296',
          fill: false
        }
        ]
      },
      options: {
        // maintainAspectRatio is set to false so that the graph resizes correctly
        maintainAspectRatio: false,
        scales: {
          // controls the x-axis color and options
          xAxes: [{
            ticks: {
              fontColor: '#fff'
            }
          }],
          // controls the y-axis color and options
          yAxes: [{
            ticks: {
              fontColor: '#fff'
            }
          }]
        },
        // controls the title and options
        title: {
          display: true,
          text: 'Git Hub Data Visualized',
          fontColor: '#fff'
        },
        // controls the legend and options
        legend: {
          labels: {
            fontColor: '#ffffff'
          }
        }
      }
    })
  }

  render () {
    return (
      <canvas id='myChart' width='100%' height='100%' />
    )
  }
}
