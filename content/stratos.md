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

Stratos and Cloud Foundry will look for this file to know some basic information about how to build and deploy the application.


For future projects (or if you want to use your own project in this guide), you need to create a file called `manifest.yml`. The most basic example is:

```yaml
applications:
- name: Example Application
```


## Deploying Application

To deploy your example application, start on the applications page

Click the `+` in the top right

Click `Public GitHub`

Select the `dev` space in the third drop down.

Click Next

Enter your github username and `/` to get a drop down of you publicly available repos.

Select the example from the drop down (or just type it in)

Make sure you have the master branch selected.

Click Next

Pick the top commit

Click `Create a random route`

Click Deploy

You will see a live tail of the deployment log. 

At the end of it's output, you will see the URL printed. (This can be found later)

At any time, you can click `Go to App Summary` to go to te application summary page.

## Logging

To see any console output of your application, go to the application summary page and click `Log Stream` on the second left side bar.

If you are scrolled up in the logs, a button will pop up allowing you to scroll to the most recent logs. 

![Logging]()

## Upgrading Application

To upgrade your application, first make a new commit in github. This can be done in GitHub by editing a file. 

TODO: what edit

For the purposes of this example, commit directly to master.


To upgrade the application to this new version, we need to go back to the application details on Stratos. 

On the left, click the `GitHub` menu to see all the commits available to deploy. (If you don't see your new commit, click the refresh on the right of the panel)

To switch which commit is deployed, click the `...` menu on the right of the row then `Deploy`.


## Data Persistence / Service Brokers / Service Binding

While we like to talk a lot about "stateless" applications, that's not the reality for a lot of systems. For most systems, state needs to live somewhere and treating all state as ephemeral like the hyper-scalers is not fiscally responsible for all but the largest systems.

The way SUSE CAP approaches this problem is by pushing dependencies (including state) to the outside using services and suggesting that components follow the [12 Factor Application](https://12factor.net/) guidelines. This allows a lot of flexibility in development of components and allows you to develop as if in your production environment.


TODO: Write about file persistence?

### Open Service Broker

The [Open Service Broker API](https://www.openservicebrokerapi.org/) is an API standard that describes how to create and allow consumption of services. This can allow a provider of services to give some control over life-cycle to the users of the service.

### Service Marketplace

Stratos makes browsing the service marketplace very easy. To view the services available to use, Click on the `Marketplace` tab on the left.

![Service Marketplace](/images/stratos/marketplace.png)

Depending on the brokers installed, this list can vary. In our sandbox, we have the minibroker installed. This gives developers easy access to common databases (mariadb, mongodb, postgres, and redis). You have access to create 


### Service Creation

If we click on one of the services, we can see some information about it. 

![Service Marketplace](/images/stratos/marketplace-summary1.png)

If we click `Plans` on the left, you will see which version are available. With minibroker, these are versions but in other brokers, plans can be different distinctions. (For example, the AWS and Azure services tend to have separate plans for free and paid versions).

//TODO: sync with rest of example
![MariaDB Plans](/images/stratos/mariadb-plans.png)

In the sandbox, we will only offer a single version of each service to keep things simple.

To create a new service instance, click the `+` in the top right of the service summary page.

Select the Space that you want to use the service in. (If you are following the example, select `dev`) Then click `Next`. 

![MongoDB Space Selection](/images/stratos/mongo-create1.png)

On this page we can select which version we would like to use. As there is only one being offered in the sandbox, it will be selected automatically. Click `Next`.

![MongoDB Plan Selection](/images/stratos/mongo-create2.png)


Next, we will be asked if we want to bind this new service to an existing application. Select your example application and click `Next`. (You can inject data about the service binding into the application here but we don't need to)

![MongoDB App Selection](/images/stratos/mongo-create3.png)

Lastly, we will name the service instance `MongoExample`. This will be the name that the application uses to bind in future deployments.

Some services allow you to customize the creation parameters, we don't need to worry about this for now.

Click `Finish`. This will create the instance and set up the application binding.
![MongoDB App Selection](/images/stratos/mongo-create4.png)


If your application is already running, you will need to restart it to get the application to read the new environment.

This can be done from the Application Summary page by clicking the `Restart` button in the middle of the top bar:
![Restart App](/images/stratos/restart-app.png)

### Service Binding

We can bind a single service to multiple applications as well as keep a service across application deletions and creations.

If you want to bind existing services to an application, we can start from the application's summary page and click on  Services on the left.

Here we can see any services that are bound to the application:

Click the `+` to start creating a new service binding.
![App Services](/images/stratos/bind1.png)

Select `Marketplace Service` (See [below](#user-provided-services) for User Provided Services)

![App Services](/images/stratos/bind2.png)

Select the type of service we would like to bind to and click `Next`

![App Services](/images/stratos/bind3.png)

Since there's only one version to pick from, just click `Next`
![App Services](/images/stratos/bind4.png)

We don't have any  specific binding parameters, so we just click `Next`
![App Services](/images/stratos/bind5.png)

We are binding to an existing Service Instance so click `Bind to an Existing Service Instance` and select the Service Instance you want to attach to.

Click Finish to bind the instance.
![App Services](/images/stratos/bind6.png)

Like above, if your application is already running, you will need to restart it to get the application to read the new environment.

This can be done from the Application Summary page by clicking the `Restart` button in the middle of the top bar:
![Restart App](/images/stratos/restart-app.png)

### User Provided Services

Not all services have Open Service Brokers available for them. In these cases we can create User Provided Services. This provides us with a way to pass in service URLs and credentials to an application in an easy to manage way (with out millions of separate environment variables).

## Clean up


## Next Steps
