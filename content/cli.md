---
title: Introduction to the CLI 
menu:
  nav:
    name: "computer"
    url: "/cli/"
    weight: 50
    icon: color_lens
---

For day to day use, most developers will likely use the Cloud Foundry cli (cf-cli) often. With it's ability to push any code directly to your developer space, 
you can rapidly iterate on your application. This allows you to test code without needing to commit every single thought to git. 

## Installation
It can be run on a variety of systems. Pick the system you are using to install on:

{{< tabs tabTotal="6" tabID="1"  tabName1="SUSE Linux" tabName2="Mac OS X" tabName3="Windows" tabName4="Debian" tabName5="RPM" tabName6="Source" >}}
{{< tab tabNum="1" >}}
To install on SUSE linux (either OpenSUSE or SUSE Linux Enterprise Server), you can install the cf-cli package with zypper:

```bash
sudo zypper in cf-cli
```
{{< /tab >}}
  
{{< tab tabNum="2" >}}
To install the cf-cli on a Mac, the package is available in homebrew. 

If you haven't installed homebrew, install it with:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then install the package with:

```bash 
brew install cloudfoundry/tap/cf-cli
``` 

{{< /tab >}}
{{< tab tabNum="3" >}}
To install the CLI on Windows, download the zip file from the link below and run the installer that's inside it. Warning, the link below will start the download.

[https://packages.cloudfoundry.org/stable?release=windows64&source=github](https://packages.cloudfoundry.org/stable?release=windows64&source=github)

{{< /tab >}}
  
{{< tab tabNum="4" >}}
To install the cf-cli on a Debian based system (Ubuntu, Debian, Mint, etc.), add the repo and install with the following script:

```bash 
wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
sudo apt-get update
sudo apt-get install cf-cli
``` 

{{< /tab >}}
  
{{< tab tabNum="5" >}}
To install the cf-cli on a RPM based system (Centos, Red Hat, etc.), add the repo and install with the following script:

```bash 
sudo wget -O /etc/yum.repos.d/cloudfoundry-cli.repo https://packages.cloudfoundry.org/fedora/cloudfoundry-cli.repo
sudo yum install cf-cli
``` 

{{< /tab >}}
  
{{< tab tabNum="6" >}}
If none of the other methods work for you, there are binaries precompiled for you to use. 

These can be found at [Here](https://github.com/cloudfoundry/cli#installers-and-compressed-binaries).

Or, if you want to build it yourself, the Golang source can be found [Here](https://github.com/cloudfoundry/cli).

{{< /tab >}}
{{< /tabs >}}

  
## Login To Your Account

Once you have installed the cf-cli, we need to log in. In this sandbox environment, we need to log in though our Single Sign On portal. To start the sign on, run:

```bash
cf login -a < TODO  url> -u <Email used in developer portal> 
```

This will prompt you for your password. This is the random password delivered along with your welcome email. Remember to use your updated password in case you changed it in Stratos. 

The next prompt will be to select which space you want to target. Select "4" (or Samples) for now. 

```bash
user:~/Projects/ $ cf login -u test@example.com -p <redacted>
API endpoint: https://api.cap.explore.suse.dev
Authenticating...
OK

Targeted org text_example_com

Select a space (or press enter to skip):
1. dev
2. prod
3. samples
4. test

Space> 3
Targeted space samples


                
API endpoint:   https://api.cap.explore.suse.dev (API version: 2.138.0)
User:           test@example.com
Org:            text_example_com
Space:          samples

```
  
## Organizations and Spaces

The applications and users of a Cloud Foundry platform are split into Organizations and Spaces. This gives a way to built a multi-tenant environment with minimal headache since each of these organizations and spaces can be given it's own resource quotas and access controls.

As part of your free trial, you have administrator rights for your own organization with a few different spaces by default. By default, there are a few applications running in the "sample" space (selected at login).

To check which apps are running in the current org and space, run:

```bash
cf apps
```

This should show a list of applications, their state, how many instances are running, their quotas, and any URLs being routed to them.

To switch to the "dev" space, use 

```bash
cf target -s dev
```

  
You can also check out the services provided in our environment, by running:

```bash
cf marketplace
```

Which will return the services, the plans offered, any description, and which broker is providing the service. These will be revisited later.

To find more information about a single sub-command, use the help command. For example to get more information about the marketplace command, run:

```bash
cf help marketplace
```

There are a ton of commands accessible through the cf-cli. To get a list of available commands, you can run:

```bash
cf help -a
```

  
## Pushing Applications

From a developer's perspective, Cloud Foundry can be summed up in a single command. All it takes to run an application is `cf push`. 

Let's run a simple app (use the tabs to select your language of choice): 

  

{{< tabs tabTotal="4" tabID="lang"  tabName1="Theory" tabName2="Node.js" tabName3="Java" tabName4="Python" >}}
      
{{< tab tabNum="1" >}}
There are a few steps that happen when you run `cf push`:

 * The current working directory gets zipped up
 * This file gets uploaded to the server
 * The server starts running the code through a series of "build packs"
 * Each build pack determines if it can do anything with the code
 * If one can, it builds the code into a container and instructs the scheduler how to run the new application
 * The scheduler runs the freshly built application
 
{{< /tab >}}
  
{{< tab tabNum="2" >}}
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

```js
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
cf push mysample --random-route
```

Note: The ```--random-route``` flag is useful here in this multi-tenant environment to eliminate collisions of people running the same examples and requesting the same route from different apps. Please use it when working in our sandbox!

{{</tab >}}

{{<tab tabNum="3">}}
TODO: Java Example
{{</tab >}}

{{<tab tabNum="4">}}
Let us create a simple static website as an example Cloud Foundry application written in Python. 

First, let's create a simple HTML file that will serve as our home page, and save as index.html:

```html
  <html>
      <head>
          <title>Python says Hello World!</title>
      </head>
      <body>
          <h1>And this is running on the SUSE Cloud Application Platform developer sandbox</h1>
          <p>Update this page and simply run cf push to get your changes online within seconds!</p>
      </body>
  </html>
```

Now let's create a simple web server like this:
```Python
import http.server
import socketserver

PORT = 8080
HOST = "0.0.0.0"
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
```

Save this as `server.py`. Since this code assumes Python 3 but the Cloud Foundry Python build pack defaults to Python 2.7, we need to add a `runtime.txt` file to our app directory:

```txt
python-3.x
```

And now we still need to tell Cloud Foundry what to do to start our app. Looking at the [Python build pack documentation](https://docs.cloudfoundry.org/buildpacks/python/index.html), we find that there are three ways to do this: provide a Procfile, a manifest.yaml or specify the start command when pushing with the -c switch. We'll use the Procfile option in this example. 

```txt
web: python server.py
``` 

{{</tab >}}

{{</tabs >}}
  
  
Regardless of which language you write your app in, the last few lines of the output should look something like this:

```bash
name:              my_sample_app
requested state:   started
routes:            mysample.cap.explore.suse.dev
last uploaded:     Wed 05 Feb 14:57:40 PST 2020
stack:             sle15
buildpacks:        nodejs

type:            web
instances:       1/1
memory usage:    1024M
start command:   npm start
     state     since                  cpu    memory    disk      details
#0   running   2020-02-05T22:57:51Z   0.0%   0 of 1G   0 of 1G   
```

In the line starting with `routes:`, we can get a link to our newly created application. Go ahead and check that it's up by browsing to it or using curl.

## Logging

After you've pushed your app, you may want to check the logs to debug any issues 
or just too see the event history.

To view a stream of your app's logs, run: 

```bash
cf logs <app name>
```

If you want to get a dump of your app's recent logs instead, run:

```bash
cf logs --recent <app name>
```

TODO: screenshot

## Updating an Application

As you are developing an app you likely would like to continually iterate on code and see it running easily and quickly.

It's important to note that when an app that is already running is pushed again, the original app will be stopped and the new one built and deployed. For active development this is unlikely to cause any problems but would definitely be a concern when deploying to production.

The way around this is to use multiple app names to give a blue green deployment and use the "real" route to direct traffic between instances.  

{{<tabs tabTotal="4" tabID="updating_lang"  tabName1="Theory" tabName2="Node.js" tabName3="Java" tabName4="Python" >}}
{{<tab tabNum="1">}}
An update will act the same as any deploy however it will keep any additional settings that were added after the previous push. 
{{</tab>}}
{{<tab tabNum="2">}}
Let's assume that we really want something more interesting than "Hello, World!" as part of our application 
and we really want to be running a web service that turns random phrases into `cowsay`.

First let's add the cowsay npm module:

```bash
npm install cowsay
```

Then we can edit our index.js to include this new feature:

```js
const express = require('express')
const app = express()

const cowsay = require('cowsay')

app.get('/', function (req, res) {
  const msg = cowsay.say({text:'Helloooo, World!'})

  res.send(`<pre>${msg}</pre>`)
})
app.listen(8080)
```

Then to update the running application we can again run 
```bash 
cf push mysample
```

Note: This time, we can drop the ```--random-route``` as the configuration is persistent 

{{</tab>}}
{{<tab tabNum="3">}}
TODO: Updating in Java
{{</tab>}}
{{<tab tabNum="4">}}
TODO: Updating in Python
{{</tab>}}
{{</tabs>}}


## Manifest

There is a lot of configuration available while pushing an application using `cf push` and it can get a bit easy to typo. To make configuration easier and more portable, we can use a manifest file.

Create a file called ```manifest.yml``` and fill it with 

{{<tabs tabTotal="4" tabID="manifest"  tabName1="Theory" tabName2="Node.js" tabName3="Java" tabName4="Python" >}}
{{<tab tabNum="1">}}

There are a ton of options that can be set up in the manifest file.
```yaml
applications:
- name: "name"
  buildpacks:
  - [list of build packs can be found with `cf buildpacks`]
  random-route: true
  services:
  - [Services to connect]
  env:
    KEY: VALUE
```

A more complete list of options can be found [Here](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html)

{{</tab>}}
{{<tab tabNum="2">}}
```yaml
applications:
- name: mysample
  buildpacks: 
  - nodejs_buildpack
  random-route: true
  command: npm run start
  services:
  env:
```
{{</tab>}}
{{<tab tabNum="3">}}
TODO: Updating in Java
{{</tab>}}
{{<tab tabNum="4">}}
TODO: Updating in Python
{{</tab>}}
{{</tabs>}}

## Data Persistence / Service Brokers / Service Binding

While we like to talk a lot about "stateless" applications, that's not the reality for a lot of systems. For most systems, state needs to live somewhere and treating all state as ephemeral like the hyper-scalers is not fiscally responsible for all but the largest systems.

The way SUSE CAP approaches this problem is by pushing dependencies (including state) to the outside using services and suggesting that components follow the [12 Factor Application](https://12factor.net/) guidelines. This allows a lot of flexibility in development of components and allows you to develop as if in your production environment.


TODO: Write about file persistence?

### Open Service Broker

The [Open Service Broker API](https://www.openservicebrokerapi.org/) is an API standard that describes how to create and allow consumption of services. This can allow a provider of services to give some control over life-cycle to the users of the service.

### Service Marketplace

As part of the CAP Sandbox, we have included the [Minibroker](https://github.com/kubernetes-sigs/minibroker) to give access to a few different databases. Your account should have access to create up to 5 services. You can create a MariaDB, Postgres, Redis, or MongoDB database for developer use easily.

We can look at the services provided by running:
```bash
cf marketplace
```

This will give us a table view of the available services to run.

//TODO what is the expected output?

For our working example, let's create a redis instance:

```bash
cf create-service redis 4-0-10 myredis
```

This will kick off the creation of a new redis instance.

To see the state (and a list of current services),
run
```bash
cf services
```

Once that shows `create succeeded` under "last operation", you can bind the service to an application. There are two ways to go about that: add it to your `manifest.yml` and push again or use 

```bash
cf bind-service mysample myredis
cf restage mysample
```
To add the service and restage with any new environment variables needed. To see this, check out:

```bash
cf env mysample
```

### Service Binding

Once we have the service created and bound, we can consume it from our application.

Service binding information is passed to the app as a JSON blob in the VCAP_SERVICES environment variable.

{{<tabs tabTotal="4" tabID="service_lang"  tabName1="Theory" tabName2="Node.js" tabName3="Java" tabName4="Python" >}}
{{<tab tabNum="1">}}
Depending on the service being provided, the credentials provided will be different. All services passed in will have at least a name and some credentials object. (But typically more)

```json
{
  "service-type1":[
    {
      "name": "name",
      "credentials": {
        "username": "admin",
        "password": "password"
      }
    }
  ],
  "service-type2":[
    {
      "name": "name",
      "credentials": {
        "connectionString":"a:p@path.to/service"
      }
    }
  ]
}
```

These can be consumed in your applications code to know what services exist that it can use.

{{</tab>}}
{{<tab tabNum="2">}}
In a Node application, we can consume the services with something like this: 

```js
const getService = (type, name)=>(
  JSON.parse(process.env['VCAP_SERVICES'])[type]
  .find((service)=>(service.name==name))
)
```
//TODO: write a quick library and publish it?

With this, we can expand our sample program from a basic hello world to an (extremely) simple guestbook using redis:

```bash
npm install redis
```

```js
const getService = (type, name)=>(
  JSON.parse(process.env['VCAP_SERVICES'])[type]
  .find((service)=>(service.name==name))
)

const express = require('express')
const app = express()
const redis = require('redis').createClient(getService('redis','myredis').credentials.uri)

const { promisify } = require("util")
const lrange = promisify(redis.lrange).bind(redis)
const rpush = promisify(redis.rpush).bind(redis)

redis.on("error", function(error) {
  console.error('Redis Error: ', error);
});

app.get('/', function (req, res) {
  lrange('emails',0,-1).then((emails)=>{
    const list = (emails||[]).map((email)=>(`<li>${email}</li>`))
      .reduce((acc,curr)=>(acc.concat(curr)),'')
      .concat('<li><form method=POST action="/"><input name=email placeholder=email/><button type=submit>Add</button></form></li>')
    res.send(`<ul>${list}</ul>`)
  }).catch()
})
app.use(express.urlencoded());
app.post('/', function (req, res) {
  const email = req.body.email
  rpush('emails', email).then(()=>{
    res.redirect('/')
  })
})
app.listen(8080)
```


{{</tab>}}
{{<tab tabNum="3">}}
TODO: Reading VCAP_SERVICES in Java
{{</tab>}}
{{<tab tabNum="4">}}
TODO: Reading VCAP_SERVICES in Python
{{</tab>}}
{{</tabs>}}

## Debugging

There are a few methods of debugging a running application that can be used: logging, tracing, and remote debugging from your IDE.

We've already covered logging, this is an effective but typically painful way to debug application flow. It requires no setup 
but also allows little to no inspection of application state.

Tracing is a fantastic way to look back at previous errors and see what might have happened in the past. 
Hooking up a tracer is definitely useful but out of scope for this guide. 
There are third party venders who can build tracing instrumentation into the compiler, as well as OpenTracing servers that can be hooked up through an Open Service Broker.  

So that leaves us with attaching a debugger to the running application to monitor state as well as place breakpoints. 
Since any traffic going to the container running our application is routed through a reverse proxy, 
we need to be a little clever when attaching a remote debugger to the running application. 

TODO: clean up wording

{{<tabs tabTotal="4" tabID="debugging_lang"  tabName1="Theory" tabName2="Node.js" tabName3="Java" tabName4="Python" >}}
{{<tab tabNum="1">}}
The trick for most languages is to pipe through SSH using `cf ssh`. 
This will open up an SSH socket and host it on your local computer giving a secure way to access your application
{{</tab>}}
{{<tab tabNum="2">}}
Node.js has a debug mode available by starting with the `--inspect` flag.

The first step will be to change the start command in your `package.json` to enable the inspector. (Remember to remove this when pushing to Production...)

```json
...
  "scripts": {
    "start":"node --inspect index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

And push again by:

```bash
cf push
```

Then to allow access to the debugger, use the command:
```bash
cf ssh mysample -L 9221:localhost:9229
```

This will forward port 9211 on your local machine to port 9229 of the container. It will hold this port open until you exit the shell it creates. (This ssh connection can be useful for all sort of debugging as well)

You can then attach whichever debugger you prefer to 127.0.0.1:9221. For example, we can use VS Code with this `config/launch.json` file.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach To Remote on SUSE CAP",
            "address": "127.0.0.1",
            "port":9221
        }
    ]
}

With this file written, we can click on the 

TODO: Screenshot

```


{{</tab>}}
{{<tab tabNum="3">}}
TODO: Debugging in Java
{{</tab>}}
{{<tab tabNum="4">}}
TODO: Debugging in Python
{{</tab>}}
{{</tabs>}}

  
## Clean up

If you want to clean up unused apps or services, we can delete them from the command line.

To delete an app you can run:

```bash
cf delete <app name>
```

Depending on the app, you might get a few prompts.

TODO: see what prompts might happen

TODO: what else should we clean up?
  

## Next Steps

TODO: What Next Steps?
