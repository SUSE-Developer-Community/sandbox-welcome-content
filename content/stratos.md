---
title: Introduction to Stratos
menu:
  nav:
    name: "web"
    url: "/stratos/"
    weight: 50
---

Stratos is a great way to manage our Cloud Foundry applications. It's a great tool for looking at configuration, logging, and resource utilization.

## Logging in

To get started, we first need to sign in to Stratos at https://stratos.cap.explore.suse.dev/login. (If you haven't changed your password already, check out [Changing your Password](/password/))

![Logging In](/images/stratos/login.png)

When we first log in, we will be greeted by a list of applications and pages we have "favorited". As this is our first time logging in, it will be empty.
![Applications 1](/images/stratos/favorites-init.png)

## Applications

To see a list of currently running applications, click on the Applications tab on the left of the page. 
![Applications 1](/images/stratos/applications-init.png)

## Organizations and Spaces


Cloud Foundry uses the concept of Organizations (often abbreviated as "Orgs") and Spaces to enable multi-tenancy with minimal headache since each of these organizations and spaces can be given it's own resource quotas and access controls. Each app belongs to a space in an org. A user can have access across a system and permissions control which orgs and spaces they can access.

As part of your free trial, you have been set up administrator rights for your own personal organization with a few different spaces by default (dev, test, prod, and sample).


## Forking Example on GitHub

While we can deploy applications by zipping up some files and uploading them, it's much easier in the long run to tie a release into a git repository. This will make switching between deployed commits significantly easier. (This is a reason that the CLI is much better for active development but Stratos does very well for managing production deployments)

For these instructions, we can use an existing project. If you want to follow along with the example, fork the project found [here](https://github.com/scf-samples/python-mongodb-blog) to your personal space. 

### Manifest

Stratos and Cloud Foundry will look for a `manifest.yml` file to know some basic information about how to build and deploy the application.


For future projects (or if you want to use your own project in this guide), you need to add a `manifest.yml`. The most basic example is:

```yaml
applications:
- name: Example Application
```

Manifest files can be a lot richer than this simple example. For more information take a look at the [Cloud Foundry Documentation on manifests]/(https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html). 


## Deploying an Application

To deploy your example application, start on the applications page and click the `+` in the top right:

![Application Page](/images/stratos/deploy1.png)

Click `Public GitHub`:

![Public GitHub](/images/stratos/deploy2.png)

Select the `dev` space in the third drop down and click `Next`:

![Space Selection](/images/stratos/deploy3.png)

Enter your github username (or organization) and `/` to get a drop down of publicly available repos in that organization.
Select the example from the drop down (or just type it in):

![Project Selection](/images/stratos/deploy4.png)

Select the branch you want to use. For this example, the default branch is `scf` and is kept up to date. Then click `Next`:

![Branch Selection](/images/stratos/deploy5.png)

Pick the top commit and click `Next`:

![Commit Selection](/images/stratos/deploy6.png)

Here you can customize the application deployment. Any settings set in your manifest can be overridden at this step.  

For our sandbox, please select `Create a random route` and click `Deploy`: (The deploy will produce an error if there is a naming collision with another route used on the system - routes have one common namespace across all orgs, spaces and users.)

![Deploy Setting](/images/stratos/deploy7.png)

A live tail of the deployment log will be displayed:

At the end of it's output, we will see the URL printed: (This can be easily found again later so don't worry about copying it down)

At any time, clicking `Go to App Summary` will go to the Application Summary page:

![Deploy Logs](/images/stratos/deploy8.png)

To view your app, click the `Go to App Summary` button. On that page, click the `Visit` button:

![Visit Deployment](/images/stratos/deploy9.png)

You will see that the new app is live but has an error due to a lack of database connectivity. Let's add that next:


## Data Persistence / Service Brokers / Service Binding

While we like to talk a lot about "stateless" applications, that's not the reality for a lot of systems. For most systems, state needs to live somewhere and treating all state as ephemeral like the hyper-scalers is not fiscally responsible for all but the largest systems.

The way SUSE Cloud Application Platform approaches this problem is by pushing dependencies (including state) to the fringe using services and suggesting that components follow the [12 Factor Application](https://12factor.net/) guidelines. This allows a lot of flexibility in development of components and allows you to develop as if in your production environment.

### Open Service Broker

The [Open Service Broker API](https://www.openservicebrokerapi.org/) is an API standard that describes how to create and allow consumption of services. This can allow a provider of services to give some control over life-cycle to the users of the service.

### Service Marketplace

Stratos makes browsing the service marketplace very easy. To view the services available to use, Click on the `Marketplace` tab on the left.

![Service Marketplace](/images/stratos/marketplace.png)

Depending on the brokers installed, this list can vary. In our sandbox, we have included [minibroker](https://github.com/kubernetes-sigs/minibroker). This can give developers easy access to common databases (mariadb, mongodb, postgres, and redis). You have access to create up to 5 services at any given time. 


### Service Creation

If we click on one of the available services, we can see some information about it. 

![Service Marketplace](/images/stratos/marketplace-summary1.png)

If we click `Plans` on the left, you will see which version are available. With minibroker, these are versions but in other brokers, plans can be different distinctions. (For example, the AWS and Azure services tend to have separate plans for free and paid versions).

![MongoDB Plans](/images/stratos/mongo-plans.png)

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

If your application is currently running, you will need to restart it to get the application to read the new environment.

This can be done from the Application Summary page by clicking the `Restart` button in the middle of the top bar:

![Restart App](/images/stratos/restart-app.png)

Visiting the page again, should show the sample application running correctly now! (Albeit, a bit lonely)

![Restart App](/images/stratos/mongo-sample-1.png)

### Service Binding

We can bind a single service to multiple applications as well as keep a service across application deletions and creations.

If you want to bind existing services to an application, we can start from the application's summary page and click on Services on the left.

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


## Upgrading Application

To upgrade our application, first make a new commit in your GitHub repository. This can be done in GitHub by [editing a file](https://help.github.com/en/github/managing-files-in-a-repository/editing-files-in-your-repository).

I feel like a page with no content should have a little more instructions on what to do. So let's add that. 

Edit the file in git found at `./blog/templates/index.html` to look more like [this](https://github.com/agracey/python-mongodb-blog/blob/scf/blog/templates/index.html): 

Commit this change to the default branch (instead of requiring a Pull Request):

![Editing a File](/images/stratos/update1.png)


To upgrade the application to this new version, we need to go back to the application details on Stratos.

On the left, click the `GitHub` menu to see all the commits available to deploy: (If you don't see your new commit, click the refresh on the right of the panel)

![Commit Selection](/images/stratos/update2.png)

To switch which commit is deployed, click the `...` menu on the right of the row then `Deploy`:

![Commit Options](/images/stratos/update3.png)

Click `Next`:

![Commit Options](/images/stratos/update4.png)

Click `Redeploy`:

![Commit Options](/images/stratos/update5.png)

This will restage and restart our application with the selected commit. To roll back, do the same but pick an older commit message.


## Logging

To see a live view of the console output of our application, go to the application summary page and click `Log Stream` on the smaller left side bar.

If you scroll up in the logs, a button (`Scroll to Bottom`) will pop up allowing you to scroll to the most recent logs:

![Logging](/images/stratos/logging.png)


## Clean up

To delete an application, go to the Application summary page and click the `trashcan` icon.

![Application Deletion](/images/stratos/delete1.png)

If you don't plan on using the route again, select it for removal. Since they count against our organization's quota, it's helpful to clean routes up if they aren't being shared by other applications. 

Click `Next`:

![Application Deletion](/images/stratos/delete2.png)

Select the  services if any that you want to clean up as well, then click `Next`:
![Application Deletion](/images/stratos/delete3.png)

If everything looks correct, click `Delete`:

![Application Deletion](/images/stratos/delete4.png)

## Next Steps

Now that you've learned the buttons and menus of the GUI, you might be ready for some command line magic. Have a look at our [guide on the Cloud Foundry command line interface](/cli). 

This guide only covers rather basic use cases, but there are lots of sample applications on the Internet that can help you understand how to make use of Cloud Foundry's more advanced features. We've pulled together a couple of pointers to our favourites on the [SUSE Developer Portal](https://www.explore.suse.dev/application-platform/). 

If you're interested in how to set up your own SUSE Cloud Application Platform cluster on Microsoft Azure, check out [this blog post](https://www.suse.com/c/cloud-foundry-in-azure-made-easier/).
