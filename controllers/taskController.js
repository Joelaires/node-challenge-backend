const Task = require('../models/Task');

const TaskController = {
  getAllTasks: function(req, res) {
    Task.getAllTasks((err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
      } else {
        res.json(rows);
      }
    });
  },
  getTaskById: function(req, res) {
    const id = req.params.id;

    Task.getTaskById(id, (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
      } else if (!row) {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      } else {
        res.json(row);
      }
    });
  },
  createTask: function(req, res) {
    const title = req.body.title;
    const description = req.body.description;

    if (!title || !description) {
      res.status(400).json({ error: 'Título e descrição são campos obrigatórios' });
    } else {
      const task = {
        title: title,
        description: description
      };

      Task.createTask(task, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Erro do Servidor Interno' });
        } else {
          res.sendStatus(201);
        }
      });
    }
  },
  updateTask: function(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    if (!title || !description) {
      res.status(400).json({ error: 'Título e descrição são campos obrigatórios' });
    } else {
      const task = {
        title: title,
        description: description
      };

      Task.updateTask(id, task, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Erro do Servidor Interno' });
        } else {
          res.sendStatus(204);
        }
      });
    }
  },
  deleteTask: function(req, res) {
    const id = req.params.id;

    Task.deleteTask(id, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
      } else {
        res.sendStatus(204);
      }
    });
  }
};

module.exports = TaskController;
