const router = require('express').Router()
const {tasksId} = require('../tasksData')

module.exports = router

router.get('/', (req, res) => {
  res.json(tasksId)
})
