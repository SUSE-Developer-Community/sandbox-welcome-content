---
title: Welcome
menu:
  nav:
    name: home
    url: "/"
    weight: 10
---

Welcome to the SUSE CAP Sandbox!

{{<callout>}}
If you would like to skip the introduction and just get logged in and start playing around, [click here](/quickstart/)
{{</callout>}}

## Key Developer Benefits to Platform as a Service

Imagine you just got a new (employer provided) laptop. First thing you do is slap your favorite OS on it and then the fun begins. You have to install your favorite editor or IDE, compilers, libraries, debug tools and what have you. Fast forward a few hours and you're slowly getting to a point where your new tool becomes usable. Couple of weeks later something in your tool-chain breaks and you have to spend time to fix it. Updates need to be made, dependencies to be considered and managed and so on. Bottom line is, you need to invest a certain amount of your valuable time into building and maintaining your development environment, your workbench so to speak. And this time gets taken away from the time you have to do actually productive things, i.e. write code. 

Recent surveys have shown, that developers actually only spend about one third of their time coding, while the rest of the time is packed with tedious tasks around maintenance, preparation and planning. [Click here for more information](https://thenewstack.io/how-much-time-do-developers-spend-actually-writing-code/)

And so far we have just talked about an individual developer. Imagine your teammates doing the same thing. Which not only causes the time spent on maintaining dev environments to multiply across your team, it also makes everybody end up with a different environment - even if they install exactly the same set of software. There will be version differences of some sort. Security patches come every day. New library versions get published every day. Generally speaking, there's always the possibility that code that runs on your machine doesn't run on your colleague's machine. So additional time needs to be spent on integration work. 

Platform as a Service addresses all those problems. 

Looking at it from an individual developer's point of view, PaaS makes it possible (but by no means necessary) to avoid composing and maintaining a local build toolchain, since the platform takes care of building your code at deployment time. The only thing you really need locally is an editor or an IDE. You can then push your code to your PaaS cluster and the rest will be taken care of by the platform. 

### Build Packs
In case of Cloud Foundry, there is a concept called [build packs](https://docs.cloudfoundry.org/buildpacks/), which standardizes your build environment. Cloud Foundry will inspect your code directory when you push it, and automatically detect the right build pack to use (you can manually override that if you want). In a nutshell, CF tries to detect which programming language you use and if your code makes any assumptions on required build tools like Maven or Gradle. 

This concept becomes even more beneficial when it comes to harmonizing development environments across teams and insuring conformance to any security or regulatory rules. Having code built by a build pack ensures that the build environment is exactly the same every time a developer pushes a code change to the platform. Changes to the build environment can be done in a controlled way (by updating the build pack) and happen at the same time for all involved developers. 


### Ecosystem

Another advantage of Platform as a Service is that it can rid a developer to maintain adjacent components as part of the test tool-chain. The platform operator usually offers a number of services such as databases, search and analytics engines, etc. Imagine you want to use a database in your app. Normally you would have to install and configure that database yourself. With a PaaS, your platform operator can offer readily available database instances as services that you can bind to your app. So the only thing you need to worry about is the API calls to the database interface in your code. 

### Services

Cloud Foundry uses the Open Service Broker API spec to allow external services to give an easy way to be created and attached to applications. We then give a way for applications to define which services they expect to exist and specify how to receive credentials for those services.

This set of features gives a really easy way to connect your application to external services without a lot of additional set up work. This allows you to get started on your code with much less headache.

### Autoscaling

Yet another benefit of PaaS is that it helps you avoid writing certain kinds of code that you don't want to write. For example, platforms usually have built-in load balancers and autoscaling capabilities so that the platform can launch additional app instances automatically - you don't have to write the code that does this anymore. This is a very complex topic though, and if you want to dive more into those aspects...
  
## Stratos vs Command Line

There are two main ways to interact with SUSE Cloud Application Platform: through the GUI (Stratos) or through the cf-cli command line tool. 

Each has it's benefits and target user. For example, the GUI allows you to pull a project directly from git and switch between commits easily while the command line allows you to quickly iterate and test changes that you might not want to commit to git.

Which experience would you like to try out first?

[Stratos](/stratos/) or 
[Command Line](/cli/)
