/* Express App */
const path = require('path');

require('dotenv').config({ path:  path.resolve(".env") });


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

// Get a valid Realm user access token to authenticate requests
async function getAuthToken() {
  console.log("API KEY IS " + API_KEY)
  console.log("Env is " + process.env.NODE_ENV)
    let res = await axios.post('https://realm.mongodb.com/api/client/v2.0/app/react-quiz-app-yyduf/auth/providers/api-key/login', {
      key: API_KEY,
    })

    return res.data
}

async function getQuiz(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    let res = await axios.post('https://realm.mongodb.com/api/client/v2.0/app/react-quiz-app-yyduf/graphql', allItemsQuery, {
      headers: headers
    })
    return res.data
}
export default function expressApp(functionName) {
  const app = express()
  const router = express.Router()

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
          <a href='/.netlify/functions/${functionName}/users'>View /users route</a>
        </div>

        <div>
          <a href='/.netlify/functions/${functionName}/hello'>View /hello route</a>
        </div>

        <div>
        <a href='/.netlify/functions/${functionName}/quiz'>View /quiz route</a>
      </div>

        <br/>
        <br/>

        <div>
          <a href='/'>
            Go back to demo homepage
          </a>
        </div>

        <br/>
        <br/>

        <div>
          <a href='https://github.com/DavidWells/netlify-functions-express' target='_blank'>
            See the source code on github
          </a>
        </div>
      </body>
    </html>
  `
    res.send(html)
  })

  router.get('/users', (req, res) => {
    res.json({
      users: [
        {
          name: 'steve',
        },
        {
          name: 'joe',
        },
      ],
    })
  })

  router.get('/hello/', function (req, res) {
    res.send('hello world')
  })

  router.get('/quiz', async (req, res) => {
    try {
    const token = await getAuthToken()
    console.log(token)
    const graphQLData = await getQuiz(token.access_token)
    console.log(graphQLData)
    res.send(graphQLData);
    // res.send("hello")
  } catch (err) {
    console.log(err);
  }

  });

  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))
  const { createProxyMiddleware } = require('http-proxy-middleware');

  app.use(createProxyMiddleware('/.netlify/functions',
    {
      target: 'http://localhost:9000', "pathRewrite": {
        "^/\\.netlify/functions": ""
      }
    }
  ));

  return app
}