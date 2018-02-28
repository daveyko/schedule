import React, {Component} from 'react'
import axios from 'axios'
import Todo from './Todo.jsx'


class  Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      todo: []
    }
    this.remove = this.remove.bind(this)
  }

  componentDidMount(){
    let shuffledData
    axios.get('/api/tasks')
    .then(data => {
      shuffledData = this.shuffleCopy(data.data)
      this.setState({
        todo: shuffledData
      })
    })
  }

  shuffleCopy(arr){
    let copied = arr.slice()
    let currIdx = copied.length - 1
    let randIdx
    let temp
    while (currIdx > 0){
      randIdx = Math.floor(Math.random() * currIdx)
      temp = copied[currIdx]
      copied[currIdx] = copied[randIdx]
      copied[randIdx] = temp
      currIdx--
    }
    return copied
  }

  remove(id){
    let newTodo = this.state.todo.filter(listitem => listitem.id !== id)
    this.setState({
      todo: newTodo
    })
  }

  render(){
    return (
      <div className = "wrapper">
      {this.state.todo.length ? this.state.todo.map(item => {
        return (
          <Todo key = {item.id} todo = {item.task} color = {item.color} id = {item.id} seconds = {item.seconds} remove = {this.remove} />
        )
      }) : null}
      </div>
    )
  }
}

export default Main
