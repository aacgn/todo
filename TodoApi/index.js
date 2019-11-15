const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const express = require('express');
const app = express();

const tasks = [
  {
    'id': 1,
    'userName': 'Feijão',
    'title':  'Fazer PoC',
    'description': 'Preciso construir uma PoC com uma arquitetura de desenvolvimento angular em 3 camadas',
    'isComplete': false
  },
  {
    'id': 2,
    'userName': 'João',
    'title':  'Dormir',
    'description': 'Lembrar de ir dormir de 00:00 para ter pelo menos 6 horas de sono.',
    'isComplete': true
  },
  {
    'id': 3,
    'userName': 'Fernando',
    'title':  'Preciso dormir pqp',
    'description': 'Mermão vá dormir ja são 01:00.',
    'isComplete': true
  }
];
const refreshTokens = {};
const SECRET = 'VERY_SECRET_KEY!';
const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if(expirationDate < new Date()) {
    return done(null, false);
  }
  done(null, jwtPayload);
}))

passport.serializeUser(function (user, done) {
  done(null, user.username)
});

app.post('/api/v1/login', function (req, res) { 
    const {username, password} = req.body;
    const user = { 
        'username': username, 
        'role': 'admin'
    };
    const token = jwt.sign(user, SECRET, { expiresIn: 600 }) 
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = username;
    return res.json({jwt: token, refreshToken: refreshToken});
});

app.post('/api/v1/logout', function (req, res) { 
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) { 
    delete refreshTokens[refreshToken];
  } 
  return res.sendStatus(204); 
});

app.post('/api/v1/refresh', function (req, res) {
    const refreshToken = req.body.refreshToken;
    

    if (refreshToken in refreshTokens) {
      const user = {
        'username': refreshTokens[refreshToken],
        'role': 'admin'
      }
      const token = jwt.sign(user, SECRET, { expiresIn: 600 });
      return res.json({jwt: token})
    }
    else {
      return res.sendStatus(401);
    }
});

// app.get('/api/v1/tasks', passport.authenticate('jwt'), function (req, res) {
//   res.json({value: tasks });
// })

app.get('/api/v1/task', function (req, res) {
  return res.json(tasks);
})

app.post('/api/v1/task', function (req, res) {
  const {userName, title, description, isComplete} = req.body;
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1: 1,
    userName,
    title,
    description,
    isComplete
  };
  try {
    tasks.push(newTask);
    return res.json(newTask);
  } catch {
    return res.sendStatus(500);
  }
})

app.put('/api/v1/task/:id', function (req, res) {
  let hasTaskFound = false;
  const taskId = +req.params.id;
  const { id, userName, title, description, isComplete } = req.body;
  const updateTask = {
    id,
    userName,
    title,
    description,
    isComplete
  };
  try {
    const index = tasks.map(t => t.id).indexOf(taskId);
    if (index != -1) {
      tasks[index] = updateTask;
      return res.json(updateTask);
    } else {
      return res.sendStatus(404);
    }
  } catch {
    return res.sendStatus(500);
  }
})

app.listen(8080);