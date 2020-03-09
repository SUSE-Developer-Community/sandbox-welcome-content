---
title: Introduction to Stratos
menu:
  nav:
    name: "web"
    url: "/stratos/"
    weight: 60
---

Stratos is a great way to manage your Cloud Foundry applications. While it might not be the most useful for "inner-loop" development cycles, it's a great tool for looking at configuration, logging, and resource utilization.

## Logging in

When you created your account, you should have been sent an email with a temporary password. 

Browse to https://stratos.cap.explore.suse.dev/login and sign in with this password and the same email as you used to sign up for the Developer Community Portal (also the one that the password got sent to).

![Logging In](/images/stratos/login.png)

When you first log in, you will be greeted by a list of applications and pages your have "favorited". As this is your first time logging in, it will be empty.
![Applications 1](/images/stratos/favorites-init.png)

## Applications

To see a list of currently running applications, click on the Applications tab on the left of the page. 
![Applications 1](/images/stratos/applications-init.png)

## Organizations and Spaces


The applications and users of a Cloud Foundry platform are split into Organizations and Spaces. This gives a way to built a multi-tenant environment with minimal headache since each of these organizations and spaces can be given it's own resource quotas and access controls.

As part of your free trial, you have administrator rights for your own organization with a few different spaces by default. By default, there are a few applications running in the "sample" space (selected at login).

When you first log in, you should see these 


## Forking Example on GitHub

While you can zip up some files and upload them, it's much easier in the long run to tie a release into your git repository. This will allow you to switch between deployed commits easily. 

For these instructions, we can use an existing project. If you want to follow along with the example, fork the project found at [Link](#) to your personal space.

### Manifest

For future projects (or if you want to use your own project in this guide), you need to add a file called `manifest.yml`. Stratos and Cloud Foundry will look for this file to know some basic information about how to build and deploy the application.


## Deploying App

## Logging

## Upgrading App


## Data Persistence / Service Brokers / Service Binding

While we like to talk a lot about "stateless" applications, that's not the reality for a lot of systems. For most systems, state needs to live somewhere and treating all state as ephemeral like the hyper-scalers is not fiscally responsible for all but the largest systems.

The way SUSE CAP approaches this problem is by pushing dependencies (including state) to the outside using services and suggesting that components follow the [12 Factor Application](https://12factor.net/) guidelines. This allows a lot of flexibility in development of components and allows you to develop as if in your production environment.


TODO: Write about file persistence?

### Open Service Broker

The [Open Service Broker API](https://www.openservicebrokerapi.org/) is an API standard that describes how to create and allow consumption of services. This can allow a provider of services to give some control over life-cycle to the users of the service.

### Service Marketplace


### Service Binding



## Clean up


## Next Steps
