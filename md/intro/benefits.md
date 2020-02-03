# Benefits to a Platform

Imagine you just got a new laptop. First thing you do is slab your favourite OS on it and then the fun begins. You have to install your favourite editor or IDE, compilers, libraries, debug tools and what have you. Fast forward a few hours and you're slowly getting to a point where your new tool becomes usable. Couple of weeks later something in your toolchain breaks and you have to spend time to fix it. Updates need to be made, dependencies to be considered and managed and so on. Bottomline is, you need to invest a certain amount of your valuable time into building and maintaining your development environment, your workbench so to speak. And this time gets taken away from the time you have to do actually productive things, i.e. write code. 

(find numbers how much time developers spend maintaining their environment)

And so far we have just talked about an individual developer. Imagine your teammates doing the same thing. Which not only causes the time spent on maintaining dev environments to multiply across your team, it also makes everybody end up with a different environment - even if they install exactly the same set of software. There will be version differences of some sort. Security patches come every day. New library versions get published every day. Generally speaking, there's always the possibility that code that runs on your machine doesn't run on your colleague's machine. So additional time needs to be spent on integration work. 

Platform as a Service addresses all those problems. 

Looking at it from an individual developer's point of view, a PaaS makes it possible (but by no means necessary) to avoid composing and maintaining a local build toolchain, since the platform takes care of building your code at deployment time. The only thing you really need locally is an editor or an IDE. You can then push your code to your PaaS cluster and the rest will be taken care of by the platform

In case of Cloud Foundry, there is a concept called build packs (add reference to explanation what build packs are), which essentially provides a standardized build environment. Cloud Foundry will inspect your code directory when you push it, automatically detect the right buildpack. In a nutshell, CF tries to detect which programming language you use and if your code base makes any assumptions on build tools. 

This concept becomes even more beneficial when it comes to harmonizing development environments across teams. Having code built by a buildpack ensures that the build environment is exactly the same every time a developer pushes a code change to the platform. Changes to the build environment can be done in a controlled way (by updating the buildpack) and happen at the same time for all involved developers. 

(At this point the reader probably wonders how this impacts debugging. While this is beyond this article's scope, I'd like to have a pointer to another article that explains how debugging an app on CF works.)
