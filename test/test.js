
import SmartCountDown from '../dist/react-smart-countdown.js'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

describe('add', function () {

	let scope, sandboxEl

	beforeEach(function () {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		$('#sandbox').remove()
	})

	function nextTick(run) {
		setTimeout(run, 100)
	}
	
	function prepare(_props = {}) {

		let mountNode = sandboxEl[0]

		class App extends Component {

      state = _props

      onClick = e => {
        let {countdown} = this
        countdown.start()
        window.countdown = countdown
        window.ctx = this
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
              changer={changer}
              state={state}
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

		ReactDOM.render(
			<App />,
			mountNode
		)

	}

	// Tests

	describe('basic', function () {

		it('click to start count', function(done) {
			prepare({
        changer: 0,
        count: 120,
      })
      expect($('.btn-primary').text()).to.equal('click to start count')
      $('.btn-primary').trigger('click')
			setTimeout(function() {
				expect($('.btn-primary').text()).to.equal('120')
				done()
			}, 100)

		})

    it('pause', function(done) {
      prepare({
        changer: 0,
        count: 120,
      })

      expect($('.btn-primary').text()).to.equal('click to start count')
      $('.btn-primary').trigger('click')

      setTimeout(function() {
        $('.btn-danger').trigger('click')

        setTimeout(function() {
          expect($('.btn-primary').text()).to.equal('120')
          done()
        }, 1500)
        
      }, 100)
    })

    it('resume', function(done) {
      this.timeout(8000)
      prepare({
        changer: 0,
        count: 120,
      })

      expect($('.btn-primary').text()).to.equal('click to start count')
      $('.btn-primary').trigger('click')

      setTimeout(function() {
        $('.btn-danger').trigger('click')

        setTimeout(function() {
          expect($('.btn-primary').prop('disabled')).to.equal(true)
          expect($('.btn-primary').text()).to.equal('120')

          $('.btn-success').trigger('click')
          setTimeout(function() {
            expect($('.btn-primary').text()).to.equal('119')
            done()
          }, 1100)

          
        }, 1500)
        
      }, 100)
    })

    it('on end', function(done) {
      this.timeout(8000)
      prepare({
        changer: 0,
        count: 2,
      })

      expect($('.btn-primary').text()).to.equal('click to start count')

      // setTimeout(function() {
      //   expect($('.btn-primary').text()).to.equal('2')
      // }, 300)

      setTimeout(function() {
        expect($('.btn-primary').prop('disabled')).to.equal(false)
        expect($('.btn-primary').text()).to.equal('click to start count')
        done()
      }, 2400)
    })

    it('pause by changer', function(done) {
      this.timeout(8000)
      prepare({
        changer: 0,
        count: 100,
        state: 'init'
      })

      expect($('.btn-primary').text()).to.equal('click to start count')
      $('.btn-primary').trigger('click')

      setTimeout(function() {
        expect($('.btn-primary').text()).to.equal('100')
        window.ctx.setState({
          changer: 1,
          state: 'pause'
        })
        setTimeout(function() {
          expect($('.btn-primary').text()).to.equal('100')
          done()
        }, 3000)
      }, 100)
    })

	})

	//end
})
