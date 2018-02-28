import React, {Component} from 'react'
import Notification from 'react-web-notification'


class Todo extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      seconds: this.props.seconds,
      buttonText: 'start',
      notification: false
    }
    this.timer = 0
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.pause = this.pause.bind(this)

  }

  componentDidMount(){
    let time = this.secondsToTime(this.props.seconds)
    this.setState({
      time
    })
  }

  appendZeros(time){
    if (time < 10){
      return '0' + time
    } else {
      return time
    }
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60))
    let divisorForMinutes = secs % (60 * 60);
    let minutes = Math.floor(divisorForMinutes / 60);
    let divisorForSeconds = divisorForMinutes % 60;
    let seconds = Math.ceil(divisorForSeconds);

    let obj = {
      h: this.appendZeros(hours),
      m: this.appendZeros(minutes),
      s: this.appendZeros(seconds)
    };
    return obj;
  }


  startTimer(){
        this.timer = setInterval(this.countDown, 1000)
        this.setState({
          buttonText: 'pause'
        })
  }

  countDown(){
    let seconds = this.state.seconds - 1
    this.setState({
      time: this.secondsToTime(seconds),
      seconds
    })
    if (!seconds){
      clearInterval(this.timer)
      this.setState({
        notification: true
      })
      this.props.remove(this.props.id)
    }
  }

  pause(){
    clearInterval(this.timer)
    this.setState({
      buttonText: 'start'
    })
  }

  test(){
    this.setState({
      notification: true
    })
  }

  render(){
    return (
      <div style = {{backgroundColor: this.props.color}} className = "list-item">
        <h3>{this.props.todo}</h3>
        <h3>{this.state.time.h} : {this.state.time.m} : {this.state.time.s}</h3>
        <button onClick = {this.state.buttonText === 'start' ? this.startTimer : this.pause} className = "start-button">{this.state.buttonText}</button>
        <button onClick = {() => {this.props.remove(this.props.id)}} className = "start-button">remove</button>
        <Notification ignore = {!this.state.notification} title = {`finished ${this.props.todo}!`} timeout = {5000} />
        {this.state.notification ? <audio src = "https://s3.us-east-2.amazonaws.com/davidkosongs/slow-spring-board.ogg" autoPlay /> : null}
      </div>
    )
  }
}

export default Todo
