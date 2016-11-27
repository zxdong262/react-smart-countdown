
import React, { PropTypes } from 'react'

class SmartCountDown extends React.Component {

  static propTypes = {
    changer: PropTypes.number,
    state: React.PropTypes.oneOf(['init', 'start', 'pause', 'resume', 'reset']), // 'init', 'start', 'pause', 'reset'
    children: PropTypes.func,
    count: PropTypes.number
  }

  static defaultProps = {
    count: 60, //60 seconds
    state: 'init',
    children: ({ count, onCountdown }) => {
      return (
        <button
          type="button"
          disabled={onCountdown}
        >{count}s</button>
      )
    }
  }

  constructor(props) {
    super(props)
    let {count} = this.props
    this.state = {
      total: count + 0,
      count,
      state: 'init',
      onCountdown: false,
      pause: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let {changer, state} = nextProps
    if (changer === this.props.changer) return
    this.setState({
      state
    })
    this[state]()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  init = () => {
    this.reset()
  }

  pause = () => {
    this.setState({
      pause: true
    })
  }

  resume = () => {
    this.setState({
      pause: false
    })
  }

  reset = () => {
    clearTimeout(this.timer)
    this.setState({
      pause: false,
      count: this.state.total,
      onCountdown: false,
      state: 'init'
    })
  }

  count = () => {
    let {count, pause} = this.state
    let nextCount = count - 1
    if (nextCount < 0) nextCount = 0

    let state = {
      count: nextCount
    }

    if (!nextCount) {
      return this.reset()
    }

    if(!pause) {
      this.setState(state)
    }

    this.timer = setTimeout(this.count, 1000)
  }

  start = () => {
    this.setState({
      onCountdown: true
    })
    this.timer = setTimeout(this.count, 1000) 
  }

  render() {
    let {children} = this.props
    return (
      children(this.state)
    )
  }

}

module.exports = exports.default = SmartCountDown