
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Define as informações de conexão do banco de dados
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dbapi'
});

// Conecta ao banco de dados
conexao.connect(function(err) {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');
});

// Define as rotas da API

// Lista todos os usuários
console.log('oi1');

app.get('/tbusuarios', function(req, res) {

  conexao.query('SELECT * FROM tbusuarios', function(err, resultados) {
    if (err) throw err;
    res.send(resultados);
  });
});

// Pesquisa um usuário por login
app.get('/tbusuarios/:login', function(req, res) {
  const login = req.params.login;

  conexao.query('SELECT * FROM tbusuarios WHERE login = ?', [login], function(err, resultados) {
    if (err) throw err;
    if(resultados == ''){
    res.send('Login: '+login+' não cadastrado no banco de dados');
    } else {
      res.send(resultados);
    }
  });
});

// Adiciona um novo usuário
app.post('/tbusuarios', function(req, res) {
  const usuario = req.body;
  conexao.query('INSERT INTO tbusuarios SET ?', usuario, function(err, resultado) {
    if (err) throw err;
    res.send(resultado);
  });
});

// Atualiza um usuário existente
app.put('/tbusuarios/:id', function(req, res) {
  const id = req.params.id;
  const novoUsuario = req.body;
  conexao.query('UPDATE tbusuarios SET ? WHERE id = ?', [novoUsuario, id], function(err, resultado) {
    if (err) throw err;
    res.send(resultado);
  });
});

// Exclui um usuário existente
app.delete('/tbusuarios/:id', function(req, res) {
  const id = req.params.id;
  conexao.query('DELETE FROM tbusuarios WHERE id = ?', [id], function(err, resultado) {
    if (err) throw err;
    res.send(resultado);
  });
});

// Inicia o servidor da API
app.listen(3000, function() {
  console.log('Servidor da API iniciado na porta 3000');
});
