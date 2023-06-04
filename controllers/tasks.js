const { response } = require('express');
const Tasks = require('../models/Tasks');

const getAllTasks = async(req, res = response) => {

  try {
    const query = {
        active: true
    };
    const tasks = await Tasks.find(query);

    return res.json({
        ok: true,
        tasks: tasks
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con administrador'
    });
  }
}


const createTask = async(req, res = response) => {
    
  const task = new Tasks( req.body );

  try {

    const taskSave =  await task.save();

    return res.status(201).json({
        ok: true,
        task: taskSave
    });

  } catch(error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con administrador'
    });
  }
}

const deleteTask = async(req, res = response) => {
  const taskId = req.params.id;

  try {
      
    const task = await Tasks.findById(taskId);

    if ( !task ) {
        return res.status(404).json({
            ok: false,
            msg: 'Task no existe por ese Id'
        });
    }

    await Tasks.findByIdAndDelete(taskId);
    res.json({
        ok: true,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con administrador'
    });
  }
}


const editTask = async(req, res = response) => {

  const taskId = req.params.id;

  try {
      
    const task = await Tasks.findById(taskId);

    if ( !task ) {
        return res.status(404).json({
            ok: false,
            msg: 'Task no existe por ese Id'
        });
    }

    const nuevaTask = {
        ...req.body
    }

    const updateTask = await Tasks.findByIdAndUpdate( taskId, nuevaTask, { new: true } );
    res.json({
        ok: true,
        task: updateTask
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con administrador'
    });
  }
}

const changeStatus = async(req, res = response) => {

  const taskId = req.params.id;

  try {
      
    const task = await Tasks.findById(taskId);

    if ( !task ) {
        return res.status(404).json({
            ok: false,
            msg: 'Task no existe por ese Id'
        });
    }

    const newStatus = req.body.status;
    console.log('newStatus', newStatus);

    const updateTask = await Tasks.updateOne( { _id: taskId }, { $set: { status: newStatus } } );
    if(updateTask.modifiedCount === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'Lo siento. No se puedo cambiar el estado'
    });
    }

    return res.json({
      ok: true,
      task: 'Se cambio el estado con exito'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con administrador'
    });
  }
}


module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  editTask,
  changeStatus,
}