import './starsBarGraph.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class StarsBarGraph extends Component {
  static propTypes = {
    repos: PropTypes.array.isRequired,
    setStars: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.createStarsBarChart = this.renderBarGraph.bind(this)
  }

  state = {
    totalStars: null
  }

  componentDidMount () {
    setTimeout(() => {
      this.createStarsBarChart()
    }, 1002)
  }

  /**
   * Method creates a bar graph. Takes in the action setStars and repoData props that are
   * passed in from the parent component. It will then create the Svg element and iterate over the data,
   * then creating the bars for the bar graph. A tool tip will also be displayed. 
   * 
   * @name renderBarGraph
   * @type method
   */
  renderBarGraph () {
    let setStars = this.props.setStars
    let repoData = this.props.repos
    let width = 280
    let height = 300

    // set array of stars for each repo
    let starsArr = []
    repoData.map((repo) => {
      starsArr.push(repo.stargazers_count)
    })

    // create the SVG element
    let svg = d3.select('svg#barData')
      .attr('width', width)
      .attr('height', height)
    // appends class to SVG element
    let bars = svg.append('g')
      .classed('frontBar', true)
    // sets bar height
    let barHeight = 100
    // sets the Y scale to determine the min and max heights
    let yscale = d3.scaleLinear()
      .domain([0, d3.max(starsArr)])
      .range([barHeight, 0])
    // sets the bar width
    let barWidth = width / starsArr.length - 1
    // creates the SVG tool tip and applies styling
    let tip = d3.select('#starsTip').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)

    // creates the bars by iterating over the data passed in and creates bar graph
    // creates a click handler to open a new window the users currently selected repo.
    // on mouse over it will change the color of the hovered bar and fire the setForks action which will then
    // set the redux state, which will allow the parent component to display the currently selected amount of forks.
    // on mouseout the color will be changed back to the original bar color
    bars.selectAll('rect.frontRect')
      .data(repoData)
      .enter()
      .append('rect')
      .classed('frontRect', true)
      .style('fill', '#CC9A49')
      .attr('width', barWidth)
      .attr('height', (d) => {
        let starsCount = d.stargazers_count
        return barHeight - yscale(starsCount)
      })
      .attr('x', (d, i) => { return barWidth * i })
      .attr('y', d => { return yscale(d.stargazers_count) })
      .attr('stroke', '#EAB46F')
      .attr('stroke-width', '2')
      .on('click', function (d) {
        let url = d.html_url
        window.open(url)
      })
      .on('mouseover', function (d) {
        d3.select(this).attr('rect:frontbar', 10).style('fill', '#C9724D')
        tip.transition()
          .duration(200)
          .style('opacity', 0.9)
        tip.html('Click To Goto Repo')
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY - 30) + 'px')
          .style('color', '#fff')
          .style('font-weight', 'bold')
          .style('font-size', '18')
        setStars(d)
      })
      .on('mouseout', function (d) {
        d3.select(this).attr('rect:frontbar', 10).style('fill', '#CC9A49')
        tip.transition()
          .duration(500)
          .style('opacity', 0)
      })
  }

  render () {
    return (
      <div styleName='starsBarGraph' >
        <svg id='barData'
        />
      </div>
    )
  }
}
