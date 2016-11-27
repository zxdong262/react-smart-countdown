import { Component } from 'react'
import SmartCountDown from './react-smart-countdown.jsx'
import moment from 'moment'

export default class App extends Component {

	state = {
    changer: 0,
    count: 2,
  }

  onClick = e => {
    let {countdown} = this
    countdown.start()
  }

	render() {
    let {count, changer} = this.state
		return (
			<div
        style={{
          margin: '30px auto',
          width: 800
        }}
      >
				<SmartCountDown
          count={count}
          changer={changer}
          ref={ref => this.countdown = ref}
        >
        {({ count, onCountdown }) => {
          let text = onCountdown
            ? moment.duration(count, 'seconds').asSeconds()
            : 'click to start count'
          return (
            <button
              className="btn btn-primary"
              type="button"
              disabled={onCountdown}
              onClick={this.onClick}
            >{text}</button>
          )
        }}
        </SmartCountDown>
        <hr />
        <p>
          <button className="btn btn-danger mr-1" onClick={() => this.countdown.pause()}>pause</button>
          <button className="btn btn-success" onClick={() => this.countdown.resume()}>resume</button>
        </p>
			</div>
		)
	}
	
}