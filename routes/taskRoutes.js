const express=require('express')
const router=express.Router()

const {tasksreg} = require('../controllers/taskControllers')

router.post('/tasksreg',tasksreg)

module.exports=router