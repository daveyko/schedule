const shortid = require('shortid')

let tasksRaw = ['algorithms', 'job app', 'exercise', 'js/css questions', 'hacktive', 'open-source']
let colors = ['#273674', '#99c655', '#e9bcd7', '#c56f51', '#72cfd0', '#c14654']
let seconds = [12600, 1800, 3600, 5400, 7200, 5400]
let tasksId = tasksRaw.map((task, i) => {
  return {
    id: shortid.generate(),
    task,
    color: colors[i],
    seconds: seconds[i]
  }
})


module.exports = {
  tasksId
}
