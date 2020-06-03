---
title: Introduction to the CLI 
menu:
  nav:
    name: "computer"
    url: "/cli/"
    weight: 60
    icon: color_lens
---

For day to day use, most developers will likely use the Cloud Foundry cli (cf-cli) often. With it's ability to push any code directly to your personal developer space, 
you can rapidly iterate on your application. This allows you to test code without needing to commit every single thought or whitespace change to git!

## Installation
The command line client can be run on a variety of systems. To get started, pick the OS you are running:

{{< tabs tabTotal="6" tabID="1"  tabName1="SUSE Linux" tabName2="Mac OS X" tabName3="Windows" tabName4="Debian" tabName5="RPM" tabName6="Source" >}}
{{< tab tabNum="1" >}}
To install on SUSE linux (either OpenSUSE or SUSE Linux Enterprise Server), you can install the cf-cli package with `zypper`:

```bash
sudo zypper in cf-cli
```

This works on [OpenSUSE for WSL](https://en.opensuse.org/openSUSE%3AWSL) as well!
{{< /tab >}}
  
{{< tab tabNum="2" >}}
To install the cf-cli on a Mac, the package is available in homebrew. 

If you haven't installed [homebrew](https://brew.sh/), install it with:

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
If none of the other methods work for you, there are binaries pre-compiled available. 

These can be found at [Here](https://github.com/cloudfoundry/cli#installers-and-compressed-binaries).

Or, if you want to build it from source, the project can be found [Here](https://github.com/cloudfoundry/cli).

{{< /tab >}}
{{< /tabs >}}

  
## Login To Your Account

Once you have installed the cf-cli, we can log in. 

{{<callout title="note">}}
Your username and password is what you provided when creating your sandbox account. You can change your password by [following these instructions](/password/).
{{</callout>}}
```bash
cf login -a https://api.cap.explore.suse.dev -u <your_username> -p <your_password>
```

The next prompt will be to select which space you want to target. Select the option that corresponds to `samples` for now. 

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

All applications (and users) on a Cloud Foundry platform are split into Organizations and Spaces. This gives a way to build a multi-tenant environment with minimal headache since each organization and space can be given it's own resource quota and access control.

As part of your developer sandbox, you have administrator access for a personal organization with a few spaces. By default, there are a few applications running in the "samples" space (selected at login).

To check which apps are running in the current org and space, run:

```bash
cf apps
```

This will show a list of applications, their state, how many instances are running, their quotas, and any URLs being routed to them.

To switch to the "dev" space, use: 

```bash
cf target -s dev
```

{{<callout title="note">}}
If you are a member of more than one org (in this sandbox, your account will only be member of your own personal org), you can switch between them by using the `-o` switch. Note also that CF will prompt you for org or space selection when there are multiple orgs or spaces available. 
{{</callout>}}

## Help on Commands

There is a lot of commands with their own options in the cli. To find more information about a single sub-command, use the `cf help` command. For example to get more information about the marketplace command, run:

```bash
cf help marketplace
```

There are a ton of commands accessible through the cf-cli. To get a list of available commands, you can run:

```bash
cf help -a
```

  
## Pushing Applications

From a developer's perspective, Cloud Foundry can be summed up in a single command. All it takes to run an application is `cf push`. 


{{<callout title="Note">}}
The `--random-route` flag shown below is useful here in this multi-tenant environment. It eliminates collisions of people running the same examples (each trying to request same route from different apps). Please use it when working in our sandbox! 

You will get a randomly generated url for each new app that will stay consistent between app redeploys. 
{{</callout>}}

Let's run a simple app (use the tabs to select your language of choice): 

{{< tabs tabTotal="3" tabID="lang" tabName1="Node.js" tabName2="Java" tabName3="Python" >}}
      
{{< tab tabNum="1" >}}
Let's create a quick sample application using node.js! You'll need node and npm installed on your system for this example, instructions are [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). 

For easy readability, we will use the [express](http://expressjs.com/) framework to serve a Hello World Application.

Create a new project and install express into it:

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

To run this code, all you need to do is run:

```bash
cf push <app-name> --random-route
```

{{</tab >}}

{{<tab tabNum="2">}}
Let us start by creating a simple Java Spring Boot Application. 
First let us go to the spring initializer site https://start.spring.io/ and select the required dependencies. Enter the project name and details as follows:
  - Spring version 2.2.5
  - Group com.suse.cap
  - Artifact helloworld
  - Packaging jar
  - java 8
  - dependencies:
      - spring web

Then hit `generate` and download the project zip.

![Spring Page](/images/cli/spring1.png)

Unzip the project, open eclipse, and import the project.

In Eclipse navigate to the pom.xml and change version to 1.0 rather than 0.0.1-SNAPSHOT.

Now navigate to com.suse.cap.helloworld and there create HelloWorldController with the following content:

 ```Java
package com.suse.cap.helloworld;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/helloworld")
public class HelloWorldController {

	private static final Logger LOGGER = LoggerFactory.getLogger(HelloWorldController.class);
	@RequestMapping(value = "/sayHello/{name}", method = RequestMethod.GET)
	public String sayHello(@PathVariable String name) {
		LOGGER.info("Saying Hello to " + name);
		return "Hello "+name + " From Spring :)!";
	}
}
```

Now build the application using maven by running:

```bash
mvn clean install
```

Then push it to the platform with:

```bash
cf push mysample -p target/helloworld-0.0.1-SNAPSHOT.jar --random-route
```

Test it by pointing your browser to your application's assigned route followed by `helloworld/sayHello/<your name>` and you can see the Hello World message.

{{</tab >}}

{{<tab tabNum="3">}}
Let us create a simple static website as an example Cloud Foundry application written in Python. 

First, let's create a simple HTML file that will serve as our home page, and save it as `index.html`:

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

Save this as `server.py`. Since this code assumes Python 3 but the Cloud Foundry Python build pack defaults to Python 2.7, we need to add a `runtime.txt` file to our app directory, which contains the following line:

```txt
python-3.x
```

And now we still need to tell Cloud Foundry what to do to start our app. Looking at the [Python build pack documentation](https://docs.cloudfoundry.org/buildpacks/python/index.html), we find that there are three ways to do this: provide a [Procfile](https://docs.cloudfoundry.org/buildpacks/prod-server.html), a manifest.yaml or specify the app's start command with the -c switch to the `cf push` command. We'll use the Procfile option in this example. Create a file containing the following line and save it as `Procfile`:

```txt
web: python server.py
``` 

Now we are ready to push our app up to Cloud Foundry. If you followed our example step-by-step you might want to double-check on the space you're targeting first. Push your app with `cf push` and remember to specify that you want to use the Python build pack by using the -b switch. This is needed since the Python build pack looks for `requirements.txt` or `setup.py` to determine if it's facing a Python application and our very simple app doesn't need either of them. 

```bash
> cf target -s dev
api endpoint:   https://api.cap.explore.suse.dev
api version:    2.144.0
user:           <your_user_name>
org:            <your_org_name>
space:          dev

> cf push pythonhelloworld -b python_buildpack --random-route
```

{{</tab >}}
{{</tabs >}}

{{<callout title="Note">}}
There are a few steps that happen when you run `cf push`:

 * The current working directory gets zipped up
 * This file gets uploaded to the server
 * The server starts running the code through a series of "build packs"
 * Each build pack determines if it can do anything with the code
 * If one can, it builds the code into a container and instructs the scheduler how to run the new application
 * The scheduler runs the freshly built application
{{</callout>}}

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

In the line starting with `routes:`, we can get a link to our newly created application. Go ahead and check that it's up by browsing to it or using `curl`!


## Logging

After you've pushed your app, you may want to check the logs to debug any issues 
or just to see the event history.

To view a live stream of your app's logs, run: 

```bash
cf logs <app name>
```

If you want to get a dump of your app's recent logs instead, run:

```bash
cf logs --recent <app name>
```

## Updating an Application

As you are developing an app you likely would like to continually iterate on code and see it running easily and quickly. 

It's important to note that when an app that is already running is pushed again, the original app will be stopped and the new one built and deployed. For active development this is unlikely to cause any problems but would definitely be a concern when deploying to production. Digging into this would go beyond the scope of this introduction. In a nutshell, the way around this is to use multiple app names to give a blue green deployment and use the "real" route to direct traffic between instances.

Now let's see how we can update our running app. Note that an update will act the same as any deploy however it will keep any additional settings that were added after the previous push. 


{{<tabs tabTotal="3" tabID="updating_lang"  tabName1="Node.js" tabName2="Java" tabName3="Python" >}}
{{<tab tabNum="1">}}
Let's assume that we really want something more interesting than "Hello, World!" as part of our application 
and we really want to be running a web service that turns random phrases into `cowsay` (a nice article introducing cowsay can he found[here](https://opensource.com/article/18/12/linux-toy-cowsay)).

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

{{</tab>}}
{{<tab tabNum="2">}}

Let's assume that we really want something more interesting than just a hello world app.

We can edit the HelloWorldController.java file to be 
```Java
package com.suse.cap.helloworld;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/helloworld")
public class HelloWorldController {

  ArrayList<String> guestBook = new ArrayList<String>();

	private static final Logger LOGGER = LoggerFactory.getLogger(HelloWorldController.class);
	@RequestMapping(value = "/sayHello/{name}", method = RequestMethod.GET)
	public String sayHello(@PathVariable String name) {

    guestBook.add(name);

    String nameList = guestBook.stream().collect(Collectors.joining(", "));

		LOGGER.info("Saying Hello to " + name);
		return "Hello " + name + " From Spring :)!";
	}
}
```

{{</tab>}}

{{<tab tabNum="3">}}
Let's update our app's `index.html` home page as follows:
  ```html
  <html>
      <head>
          <title>Python says Hello World!</title>
      </head>
      <body>
          <h1>And this is running on the SUSE Cloud Application Platform developer sandbox</h1>
          <p>This page has been updated and pushing the update has been simple and fast!</p>
      </body>
  </html>
```

Then to update the running application we can again run 
```bash 
cf push pythonhelloworld
```
{{</tab>}}

{{</tabs>}}

Note: This time, we can drop the ```--random-route``` as the configuration is persistent. So Cloud Foundry will remember that you requested a random route the first time you pushed the app and will keep it that way in subsequent pushes. 

{{<callout title="Note">}}

This time, we can drop the ```--random-route``` as the configuration is persistent. So Cloud Foundry will remember that you requested a random route the first time you pushed the app and will keep it that way in subsequent pushes. 

{{</callout>}}

## Manifest

There is a lot of configuration available while pushing an application using `cf push` and it can get a bit easy to typo. To make configuration easier and more portable, we can use a manifest file. There are a ton of options that can be set up in the manifest file, see the [Cloud Foundry documentation on application manifests](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) for details.

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

Create a file called ```manifest.yml``` and fill it with:

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

Create `manifest.yaml` in your project's root folder with the following content:
```yaml
---
applications:
- name: mysample
  memory: 512M
  random-route: true
  path: target/helloworld-1.0.jar
  env:
    JBP_CONFIG_SPRING_AUTO_RECONFIGURATION: '{enabled: false}'
```

You can now drop the flags from your push command and just use:
```bash
cf push
```
{{</tab>}}
{{<tab tabNum="4">}}
```yaml
applications:
- name: pythonhelloworld
  buildpacks: 
  - python_buildpack
  random-route: true
  command: python server.py
  services:
  env:
```
With this application manifest in place, we can now omit the build pack specification with the `-b python_buildpack` switch and we do not need the `Procfile` anymore. It does not hurt to leave it in place though. 

{{</tab>}}
{{</tabs>}}

## Data Persistence / Service Brokers / Service Binding

While we like to talk a lot about "stateless" applications, that's not the reality for a lot of systems. For most systems, state needs to live somewhere and treating all state as ephemeral like the hyper-scalers is not fiscally responsible for all but the largest systems.

The way SUSE CAP approaches this problem is by pushing dependencies (including state) to the outside using services and suggesting that components follow the [12 Factor Application](https://12factor.net/) guidelines. This allows a lot of flexibility in development of components and allows you to develop as if in your production environment.

### Open Service Broker

The [Open Service Broker API](https://www.openservicebrokerapi.org/) is an API standard that describes how to create and allow consumption of services. This can allow a provider of services to give some control over life-cycle to the users of the service.

### Service Marketplace

As part of the CAP Sandbox, we have included the [Minibroker](https://github.com/kubernetes-sigs/minibroker) to give access to a few different databases. The [quota](https://docs.cloudfoundry.org/adminguide/quota-plans.html) associated to your sandbox account should allow you to create up to 5 services. You can create a MariaDB, Postgres, Redis, or MongoDB database for developer use easily.

We can look at the available services by running:
```bash
cf marketplace
```

This will give us a table view of the available services to run.

```bash
service      plans           description                 broker
mongodb      4-0-6           Helm Chart for mongodb      minibroker
postgresql   11-5-0          Helm Chart for postgresql   minibroker
redis        4-0-10, 5-0-7   Helm Chart for redis        minibroker
mariadb      10-1-34         Helm Chart for mariadb      minibroker
```

For our working example, let's create a redis instance:

```bash
cf create-service redis 4-0-10 myredis
```

This will kick off the creation of a new redis instance.

To see the state (and a list of current services), run
```bash
cf services
```

Once that shows `create succeeded` under "last operation", you can bind the service to an application. There are two ways to go about that: add it to your `manifest.yml` and push again or use 

```bash
cf bind-service <app-name> myredis
cf restage <app-name>
```
To add the service and restage with any new environment variables needed. To see your app's current environment, check out:

```bash
cf env <app-name>
```

### Service Binding

Once we have the service created and bound, we can consume it from our application.

Service binding information is passed to the app as a JSON blob in the VCAP_SERVICES environment variable. Parsing that blob will give a data structure looking like:

```json
{
  "service-type-1":[
    {
      "name": "name",
      "credentials": {
        "username": "admin",
        "password": "password"
      }
    }
  ],
  "service-type-2":[
    {
      "name": "name",
      "credentials": {
        "connectionUri":"a:p@path.to/service"
      }
    }
  ]
}
```
Depending on the service being provided, the credentials provided will be different. All services passed in will have at least a name and some credentials object. (But typically more)

These can be consumed in your applications code to know what services exist that it can use.

{{<tabs tabTotal="3" tabID="service_lang"  tabName1="Node.js" tabName2="Java" tabName3="Python" >}}
{{<tab tabNum="1">}}
In a Node application, we can consume the services with some code like this: 

```js
const getService = (type, name)=>(
  JSON.parse(process.env['VCAP_SERVICES'])[type]
  .find((service)=>(service.name==name))
)
```

With this, we can expand our sample program from a basic hello world to an (extremely) simple guestbook using redis:

```bash
npm install redis
```

Then adapting the application to use it:

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
{{<tab tabNum="2">}}

Spring Boot comes with [built in consumption of the VCAP_SERVICES environment variable](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/cloud/CloudFoundryVcapEnvironmentPostProcessor.html). This flattens the JSON tree so you can consume credentials easily.

Let's extend our example to persist the "guestbook" to a redis array to survive any restarts. 

Start by adding the [Jedis dependency](https://mvnrepository.com/artifact/redis.clients/jedis/3.2.0) to your pom.xml

```xml
...
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>
...
```

Then we can connect to the service with the following code:

```Java
package com.suse.cap.helloworld;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import redis.clients.jedis.Jedis;

@RestController
@RequestMapping(value = "/helloworld")
public class HelloWorldController {
	@Value("${vcap.services.myredis.credentials.uri:}")
	private String JEDIS_URI; 

	private static final String LIST_KEY = "guestbook"; 


	private static final Logger LOGGER = LoggerFactory.getLogger(HelloWorldController.class);
	@RequestMapping(value = "/sayHello/{name}", method = RequestMethod.GET)
	public String sayHello(@PathVariable String name) {
		
		Jedis jedis = new Jedis(JEDIS_URI);
		
		jedis.lpush(LIST_KEY, name);
		
		String nameList = jedis.lrange(LIST_KEY, 0, -1).stream().collect(Collectors.joining(", "));

		LOGGER.info("Saying Hello to " + name);
		return "Hello "+name + " From Spring :)! " + nameList + "  have all signed in!";
	}
}
```


{{</tab>}}
{{<tab tabNum="3">}}
To consume our Redis service from our Python example app we can use the following snippet:
```Python
import redis
import json
import os

if 'VCAP_SERVICES' in os.environ:
  vcap_services = json.loads(os.environ['VCAP_SERVICES'])
  if 'redis' in vcap_services:
    credentials = vcap_services['redis'][0]['credentials']
    redis_host = credentials['host']
    redis_port = credentials['port']
    redis_password = credentials['password']
  else:
    print("No Redis info found in VCAP_SERVICES! Are you sure you created and bound the service to your app?")

try:
  r = redis.Redis(
    host = redis_host,
    port = redis_port,
    password = redis_password
    )
except redis.ConnectionError:
  print("Error connecting to Redis database!")
  r = None
```

Let's demonstrate this by turning our static hello world example into a real web application that can store words in a database. We will use the [Flask](https://flask.palletsprojects.com) framework for this purpose. The home page will display a form for adding and removing strings to a database, and display the current content of the database as an unordered list. Here's the code (including the Redis database part above) for our new server.py:
```Python
from flask import Flask, redirect, render_template, request
import json
import os
import redis

APP_PORT = 8080
APP_HOST = "0.0.0.0"

app = Flask(__name__)

if 'VCAP_SERVICES' in os.environ:
  vcap_services = json.loads(os.environ['VCAP_SERVICES'])
  if 'redis' in vcap_services:
    credentials = vcap_services['redis'][0]['credentials']
    redis_host = credentials['host']
    redis_port = credentials['port']
    redis_password = credentials['password']
  else:
    print("No Redis info found in VCAP_SERVICES! Are you sure you created and bound the service to your app?")

try:
  r = redis.Redis(
    host = redis_host,
    port = redis_port,
    password = redis_password
    )
except redis.ConnectionError:
  print("Error connecting to Redis database!")
  r = None

@app.route('/')
def index():
  redis_words = r.lrange("mywords", 0, -1)
  return render_template('index.html', redis_words=list(redis_words))

@app.route('/addvalue', methods=['POST'])
def add_value():
  value = request.form['value']
  print("Received value " + value + ", adding to database...")
  r.rpush("mywords", value)
  return redirect("/", code=302)

@app.route('/removevalue', methods=['POST'])
def remove_value():
  value = request.form['value']
  print("Received value " + value + ", removing from database...")
  r.lrem("mywords", 0, value)
  return redirect("/", code=302)

if __name__ == '__main__':
  app.run(host=APP_HOST, port=APP_PORT)
```

To make this work we need to modify our `index.html` as follows:
```html
<html>
    <head>
        <title>Python says Hello World!</title>
    </head>
    <body>
        <h1>Python says Hello World!</h1>
        <p>And this is running on the SUSE Cloud Application Platform developer sandbox...</p>
        <p>Using a redis database is super easy with the Minibroker!</p>
        <p>
          <form method="POST" action="/addvalue">
            Add value <input type="text" name="value" placeholder="myvalue" /> <input type="submit" value="Add" /> to database! 
          </form>
          <form method="POST" action="/removevalue">
            Remove value <input type="text" name="value" placeholder="myvalue" /> <input type="submit" value="Remove" /> from database!
        </p>
        <p>Currently the database contains the following:</p>
        <ul>
          {% for word in redis_words %}
          <li>{{ word }}</li>
          {% endfor %}
        </ul>

    </body>
</html>
```

We also need to move `index.html` into the `templates` directory of our app root directory, since this is where Flask expects its web templates to be. Now we can simply update our app by doing anopther `cf push`.  
{{</tab>}}
{{</tabs>}}

## Debugging

There are a few methods of debugging a running application that can be used: logging, tracing, and remote debugging from your IDE.

We've already covered logging, which is an effective but typically painful way to debug application flow. It requires no setup 
but also allows little to no inspection of application state.

Tracing is a fantastic way to look back at previous errors and see what might have happened in the past. 
Hooking up a tracer is definitely useful but out of scope for this guide. 
There are third party vendors who can build tracing instrumentation into the compiler, as well as OpenTracing servers that can be hooked up through an Open Service Broker.  

Lastly, we can attach a debugger to the running application to monitor state as well as place breakpoints.

Since any traffic going to the container running our application is routed through a reverse proxy, 
we need to be a little clever when attaching a remote debugger to the running application. 

The trick for most languages is to pipe through SSH using `cf ssh <app name> -L <local port>:localhost:<remote port>` to open up a ssh port forward.

{{<tabs tabTotal="4" tabID="debugging_lang" tabName1="Node.js" tabName2="Java" tabName3="Python" >}}
{{<tab tabNum="1">}}

Node.js has a debug mode available by starting with the `--inspect` flag that we can use to attach the VS Code debugger.

The first step will be to change the start command in your `package.json` to enable the inspector. 

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
```

With this file written, we can click on the `Run and Debug` tab on the left of VS Code and press the green arrow to start the debugger.

You should see something similar to:

![VS Code Debugger](/images/cli/debugger1.png)


{{</tab>}}
{{<tab tabNum="2">}}

Java allows attaching a debugger to a remotely running application. To do this we need to restart the application with the following `JAVA_OPTS` in the manifest:

```yaml
applications:
- name: mysample
  memory: 512M
  random-route: true
  path: target/helloworld-1.0.jar
  env:
    JBP_CONFIG_SPRING_AUTO_RECONFIGURATION: '{enabled: false}'
    JAVA_OPTS: '-agentlib:jdwp=transport=dt_socket,address=:8000'
```

Then repush the app:
```bash 
cf push
```

To allow local access to the debugger through a ssh tunnel, run this in the background:
```bash
cf ssh mysample -L 8000:localhost:8000
```

Then, from eclipse, add a debug configuration by right clicking on your project, selecting `Debug As`, and `Debug Configurations...`:
![VS Code Debugger](/images/cli/eclipse1.png)

Then click `Remote Java Application` and create new one (button in the top left of this screenshot):

![VS Code Debugger](/images/cli/eclipse2.png)


{{</tab>}}
{{<tab tabNum="3">}}
TODO: debugging in Python
{{</tab>}}
{{</tabs>}}

{{<callout title="Note">}}
Don't forget to remove any debugger flags before pushing to production!
{{</callout>}}
  
## Clean up

If you want to clean up unused apps or services, you can delete them from the command line.

To delete an app you can run:

```bash
cf delete <app name>
```

You will be prompted to confirm the deletion and, depending on the app, you might get a few additional prompts.

If an app is deleted using `cf delete <app name>` the route created for the app will still persist.

To delete the route as well use -r, e.g. `cf delete -r <app name>`. 

If the route is not removed when the app is deleted, it can then be deleted afterwards with `cf delete-route <domain> -n <host>`. To bulk delete any routes that are not mapped in the current space use `cf delete-orphaned-routes`.
  

## Next Steps

Now that you've learned a lot about how to handle Cloud Foundry from the command line, you might want to take a look at our [introduction to the SUSE Cloud Application Platform web interface Stratos](/stratos). 

This guide only covers rather basic use cases, but there are lots of sample applications on the Internet that can help you understand how to make use of Cloud Foundry's more advanced features. We've pulled together a couple of pointers to our favourites on the [SUSE Developer Portal](https://www.explore.suse.dev/application-platform/).

If you're interested in how to set up your own SUSE CLoud Application Platform cluster on Microsoft Azure, check out [this blog post](https://www.suse.com/c/cloud-foundry-in-azure-made-easier/).
