const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('O servidor está sendo executado na porta 3000');
});


module.exports = app;