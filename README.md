# react-smart-countdown [![Travis][build-badge]][build] [![Codecov][codecov-badge]][codecov]
`smart` react countdown component.

## use
```jsx
// by passing a function children, you use any react component as countdown html template
// suggested way to use it by ref `ref={ref => this.countdown = ref}`
// then this.countdown.start() .pause() .resume() .reset() ...
// but still you can change the countdown by pass changer and state
import SmartCountDown from 'react-smart-countdown'
export default class App extends Component {

	state = {

    //trigger rerender by change changer value
    changer: 0, 

    //how many seconds to countdown
    count: 2, 

    //React.PropTypes.oneOf(['init', 'start', 'pause', 'resume', 'reset'])
    //by passing state to trigger countdown function
    state: 'init' 
  }

  onClick = e => {
    let {countdown} = this
    countdown.start()
  }

	render() {
    let {count, changer, state} = this.state
		return (
			<div
        style={{
          margin: '30px auto',
          width: 800
        }}
      >
				<SmartCountDown
          count={count}
          state={state}
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
```

## get/dev
```bash
git clone git@github.com:zxdong262/react-smart-countdown.git
cd react-smart-countdown
npm i  
npm i react react-dom
# start dev and open demo in browser
npm start
# then edit src/*.jsx to see changes

# build (auto rebuild when code change)
npm run build

# test and create code coverage
npm run test

```

## License
MIT

[build-badge]: https://img.shields.io/travis/zxdong262/react-smart-countdown/master.svg?style=flat-square
[build]: https://travis-ci.org/zxdong262/react-smart-countdown
[codecov-badge]: https://img.shields.io/codecov/c/github/zxdong262/react-smart-countdown/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/zxdong262/react-smart-countdown