const session = require('express-session')
const Keycloak = require('keycloak-connect')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak({ store: memoryStore })


app.use(session({
  secret: 'this-will-encrypt-the-cookies',
  resave: false,
  saveUninitialized: false,
  store: memoryStore
}))
app.use(keycloak.middleware());

const MY_ENDPOINT = '/my_endpoint'
app.get('/', (req, res) => {
  res.send("<a href=" + MY_ENDPOINT + ">Private section</a>")
})

app.get(MY_ENDPOINT, keycloak.protect(), myEndpointHandler)
function myEndpointHandler(req, res) {
  const answer = "Welcome to the secret place!\n" +
                "I got this information for you:\n" +
                JSON.stringify(req.kauth.grant.access_token.content)
  res.send(answer)
}

app.listen(8000, () => console.log("Running on port 8000"))
