Let's create a quick sample application using node.js! 

For easy readability, we will use the [express](http://expressjs.com/) framework to serve a Hello World Application.

Create a new project and install [express](http://expressjs.com/) into it:

```bash 
mkdir nodejs_sample 
cd nodejs_sample
npm init -y
npm install express
```

Create a new file called index.js

```js index.js
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(8080)
```

*Note that the port we are listening on is 8080. While this can be changed, it's rarely needed to be different.* 

We need to specify the right start script by editing the package.json file to include the start script: 

```json
{
  "name": "nodejs_sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start":"node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

To run this code, now all you need to do is run:

```bash
cf push nodejs_sample
```

