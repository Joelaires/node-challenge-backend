const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

const Task = {
  getAllTasks: function(callback) {
    db.all('SELECT * FROM tasks', callback);
  },
  getTaskById: function(id, callback) {
    db.get('SELECT * FROM tasks WHERE id = ?', id, callback);
  },
  createTask: function(task, callback) {
    db.run('INSERT INTO tasks (title, description) VALUES (?, ?)', [task.title, task.description], callback);
  },
  updateTask: function(id, task, callback) {
    db.run('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [task.title, task.description, id], callback);
  },
  deleteTask: function(id, callback) {
    db.run('DELETE FROM tasks WHERE id = ?', id, callback);
  }
};

module.exports = Task;
