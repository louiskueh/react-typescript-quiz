const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const serverless = require('serverless-http');
const axios = require('axios')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

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
  let res = await axios.post('https://realm.mongodb.com/api/client/v2.0/app/react-quiz-app-yyduf/auth/providers/api-key/login', {
    key:API_KEY ,
  })

  return res.data
}

async function getQuiz(token) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  let res = await axios.post('https://realm.mongodb.com/api/client/v2.0/app/react-quiz-app-yyduf/graphql', allItemsQuery,{
    headers: headers
  })
  return res.data
}

app.get('/quiz', async (req, res) => {
    const token = await getAuthToken()
    console.log (token)
    const graphQLData = await getQuiz(token.access_token)
    console.log(graphQLData)
    res.send(graphQLData);
});

app.listen(3001, () =>
  console.log('Express server is running on port 3001')
);

module.exports.handler = serverless(app);
