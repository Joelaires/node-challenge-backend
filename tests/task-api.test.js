const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../index');

chai.use(chaiHttp);

const Task = require('../models/Task');

describe('Task API', () => {
  beforeEach((done) => {
    Task.deleteTask({}, () => {
      done();
    });
  });

  describe('GET /tasks', () => {
    it('Deve retornar todas as tarefas', (done) => {
      chai.request(server)
        .get('/tasks')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  describe('GET /tasks/:id', () => {
    it('Deve retornar uma tarefa pelo ID', (done) => {
      const task = { title: 'Tarefa 1', description: 'Descrição da tarefa 1' };
      Task.createTask(task, (err, savedTask) => {
        chai.request(server)
          .get('/tasks/' + savedTask.id)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.title).to.equal('Tarefa 1');
            expect(res.body.description).to.equal('Descrição da tarefa 1');
            done();
          });
      });
    });

    it('Deve retornar um erro 404 se a tarefa não existir', (done) => {
      const nonExistentTaskId = 'nonexistenttaskid';

      chai.request(server)
        .get('/tasks/' + nonExistentTaskId)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Tarefa não encontrada');
          done();
        });
    });
  });

  describe('POST /tasks', () => {
    it('Deve criar uma nova tarefa', (done) => {
      const task = {
        title: 'Nova Tarefa',
        description: 'Descrição da nova tarefa'
      };

      chai.request(server)
        .post('/tasks')
        .send(task)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('Deve retornar um erro 400 se o título ou descrição estiverem faltando', (done) => {
      const task = {
        title: 'Nova Tarefa'
      };

      chai.request(server)
        .post('/tasks')
        .send(task)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Título e descrição são campos obrigatórios');
          done();
        });
    });
  });

  describe('PUT /tasks/:id', () => {
    it('Deve atualizar uma tarefa existente', (done) => {
      const task = { title: 'Tarefa antiga', description: 'Descrição da tarefa antiga' };
      Task.createTask(task, (err, savedTask) => {
        const updatedTask = {
          title: 'Tarefa atualizada',
          description: 'Nova descrição da tarefa'
        };

        chai.request(server)
          .put('/tasks/' + savedTask.id)
          .send(updatedTask)
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
      });
    });

    it('Deve retornar um erro 400 se o título ou descrição estiverem faltando', (done) => {
      const task = { title: 'Tarefa antiga', description: 'Descrição da tarefa antiga' };
      Task.createTask(task, (err, savedTask) => {
        const updatedTask = {
          title: 'Tarefa atualizada'
        };

        chai.request(server)
          .put('/tasks/' + savedTask.id)
          .send(updatedTask)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.error).to.equal('Título e descrição são campos obrigatórios');
            done();
          });
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('Deve excluir uma tarefa existente', (done) => {
      const task = { title: 'Tarefa para exclusão', description: 'Descrição da tarefa para exclusão' };
      Task.createTask(task, (err, savedTask) => {
        chai.request(server)
          .delete('/tasks/' + savedTask.id)
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
      });
    });
  });
});
