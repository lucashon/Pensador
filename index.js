const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const conn = require('./db/conn')

// Import Models

// Import routes

// Import Controller

// Configurar engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
// configurar JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// Middleware para as sessões
app.use(session({
  name: 'session',
  secret: 'nosso_secret', //Quanto maior  a crypto melhor
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function (){},
    path: require('path').join(require('os').tmpdir(),'session')
  }),
  cookie:{
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}))
// Importar as flash
app.use(flash())
// Importar os arquivos estáticos
app.use(express.static('public'))
// Armazenar as sessões nas rotas
app.use((request,response)=>{
  if(request.session.userId){
    response.locals.session = request.session
  }
  next()
})
// rotas

// Conexão de criação das telas do banco
conn.sync().then(()=>{
  app.listen(3333)
  console.log('rodando')
}).catch((err)=>{
  console.log(err)
})