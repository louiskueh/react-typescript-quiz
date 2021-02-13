/* Express App */
const path = require('path');

require('dotenv').config({ path: path.resolve(".env") });

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import axios from 'axios'
const API_KEY = process.env.API_KEY

const allItemsQuery = {
  query: `
    query {
      quiz {
        _id
        name
        youtube
        questions {
          question,
          answers {
            content
            type
          }
        }
      }
    }
    `
}

function propertyFromQuizzesQuery(property) {
  return {
    query: `
    query {
      quizzes {
       ` + property + `
      }
    }
    `}
}

function getQuiz(quizName) {
  return {
    query: `
    query {
      quiz(query: {name:"` + quizName +`"}) {
        _id
        name
        questions {
          question,
          answers {
            content
            type
          }
        }
        youtube
      }
    }`}
}


// Get a valid Realm user access token to authenticate requests
async function getAuthToken() {
  console.log("API KEY IS " + API_KEY)
  console.log("Env is " + process.env.NODE_ENV)
  let res = await axios.post('https://realm.mongodb.com/api/client/v2.0/app/react-quiz-app-yyduf/auth/providers/api-key/login', {
    key: API_KEY,
  })

  return res.data
}

async function runQuery(token, query) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  let res = await axios.post('https://realm.mongodb.com/api/client/v2.0/app/react-quiz-app-yyduf/graphql', query, {
    headers: headers
  })
  return res.data
}

export default function expressApp(functionName) {
  const app = express()
  const router = express.Router()
  router.use(cors())
  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV === 'dev' ? `/${functionName}` : `/.netlify/functions/${functionName}/`

  /* define routes */
  router.get('/', (req, res) => {
    const html = `
    <html>
      <head>
        <style>
          body {
            padding: 30px;
          }
        </style>
      </head>
      <body>
        <h1>Express via '${functionName}' ⊂◉‿◉つ</h1>

        <p>I'm using Express running via a <a href='https://www.netlify.com/docs/functions/' target='_blank'>Netlify Function</a>.</p>

        <p>Choose a route:</p>

        <div>
          <a href='/.netlify/functions/${functionName}/quizzes/name'>Get names of all quizzes in database /quizzes/{name}</a>
        </div>

        <div>
        <a href='/.netlify/functions/${functionName}/quiz'>View /quiz route</a>
      </div>
      </body>
    </html>
  `
    res.send(html)
  })

  router.get('/quiz', async (req, res) => {
    try {
      const token = await getAuthToken()
      const graphQLData = await runQuery(token.access_token, allItemsQuery)
      res.send(graphQLData);
      // res.send("hello")
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/quiz/:name', async (req, res) => {
    try {
      const token = await getAuthToken()
      const graphQLData = await runQuery(token.access_token, getQuiz(req.params.name))
      console.log(graphQLData)
      res.send(graphQLData);
      // res.send("hello")
    } catch (err) {
      console.log(err);
    }
  });


  router.get('/quizzes/:property', async (req, res) => {
    console.log("property is " + JSON.stringify(propertyFromQuizzesQuery(req.params.property)))
    const dynamicPropertyQuery = propertyFromQuizzesQuery(req.params.property)
    try {
      const token = await getAuthToken()
      const graphQLData = await runQuery(token.access_token, dynamicPropertyQuery)
      res.send(graphQLData);
      // res.send("hello")
    } catch (err) {
      console.log(err);
    }
  });

  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  return app
}