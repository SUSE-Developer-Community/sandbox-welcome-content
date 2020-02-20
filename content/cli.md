
For day to day use, a developer will likely use the cf-cli often. With it's ability to push any code directly to your developer space, 
you can rapidly iterate on your applciation. This allows you to test code without needing to commit every single thought to git. 

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
To install the cf-cli on a Debian based system (Ubunty, Debian, Mint, etc.), add the repo and install with the following script:

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
If none of the other methods work for you, there are already 

These can be found at [Here](https://github.com/cloudfoundry/cli#installers-and-compressed-binaries).

Or, if you want to build it yourself, the Golang source can be found [Here](https://github.com/cloudfoundry/cli).

{{< /tab >}}
{{< /tabs >}}
  
  
# Login To Your Account

Once you have installed the cf-cli, we need to log in. In this sandbox environment, we need to log in though our Single Sign On portal. To start the sign on, run:

```bash
cf login -a < TODO  url> --sso 
```
TODO: Fact Check
This will give you a URL to browse to and log in. After you log in, you will get a single use token to copy and paste back into your terminal.

TODO: Maybe have a space that the samples live in as well as the standard dev/test/prod?
With that terminal, you should get the option of which Organization and Space you want to use. For now, select "samples". 

TODO: screenshot
  
# Organizations and Spaces

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

To find more information about a single subcommand, use the help command. For example to get more information about the marketplace command, run:

```bash
cf help marketplace
```

There are a ton of commands accessible through the cf-cli. To get a list of available commands, you can run:

```bash
cf help -a
```

  
# Pushing Applications

From a developer's perspective, Cloud Foundry can be summed up in a single command. All it takes to run an application is `cf push`. 

Let's run a simple app (use the tabs to select your language of choice): 

  

{{< tabs tabTotal="2" tabID="1"  tabName1="Theory" tabName2="Node.js" >}}
      
{{< tab tabNum="1" >}}
There are a few steps that happen when you run `cf push`:

 * The current working directory gets zipped up
 * This file gets uploaded to the server
 * The server starts running the code through a series of "build packs"
 * Each buildpack determines if it can do anything with the code
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
cf push nodejs_sample
```


{{< /tab >}}
{{< /tabs >}}
  
  
Regardless of which language your write your app in, the last few lines of the output should look something like this:

```log
name:              nodejs_sample
requested state:   started
routes:            nodejssample.cap.explore.suse.dev
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

# Logging

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


# Persistence / Service Brokers / Service Binding

TODO: write about persistence

# Updating an Application

As you are developing an app you likely would like to continually write code and see it running easily and quickly.

To update your application you can run your cf push again.

```bash
cf push
```



# Debugging

TODO: write about debugging
  
# Clean up

If you want to clean up unused apps or services, we can delete them from the command line.

To delete an app you can run:

```bash
cf delete <app name>
```

Depending on the app, you might get a few prompts.

TODO: see what prompts might happen

TODO: what else should we clean up?
  

# Next Steps

TODO: What Next Steps?
