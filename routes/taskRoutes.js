const express = require('express');
const router=express.Router();
const {createTask,getTask,getTaskById,updateTask, updateTaskPatch, deleteTask}=require('../controller/taskController');
const {protect}=require('../middleware/authmiddleware');
// const { route } = require('./authRoutes'); 
//middleware should denote before controller..then only tha MW will collect details and get back to controller
router.post('/newtask',protect,createTask);//protect
router.get('/getTask',protect,getTask);
router.get('/getTask/:id',protect,getTaskById);
router.put('/updateTask/:id',protect,updateTask);//ok
router.patch('/updateTaskPatch/:id',protect,updateTaskPatch);//ok
router.delete('/deleteTask/:id',protect,deleteTask);
 // ':' (colon) dynamically changes the value

module.exports=router;