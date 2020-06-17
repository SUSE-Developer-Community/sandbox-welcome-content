---
title: FAQ
menu:
  nav:
    name: help
    url: "/faq/"
    weight: 100
---

## Purpose

### What is this sandbox?

We wanted to make it easier for developers to get started with playing around and using our version of Cloud Foundry. Since most developers don't want to install an entire Kubernetes cluster just to try out a platform, it made more sense to bring it to you! 

Whether you are an experienced developer or brand new to the idea, we hope this sandbox can be place to try random ideas and see if they work. Share with us what you build or ask for help on the [SUSE Developer Forum](https://forums.suse.com/)!

### Does it cost anything?

No. The Developer Sandbox is free. 

### Will my access expire some time?

No. Your Developer Sandbox will be available to you as long as you need it. 

If your account is inactive for more than 3 months, we may delete it though in order to ensure a good user experience for all users of the system. Check our [Developer Sandbox Terms & Conditions](https://www.explore.suse.dev/cap-developer-sandbox-terms-conditions/) for details. 

### What can I build in this sandbox?

Anything! This getting started guide has some very simple examples, but you can host very complex applications in Cloud Foundry.

If you want some suggestions on what to build, join us on our [forums](https://forums.suse.com/) to see what others are building!

### What languages are supported?

We support the build packs for: 
 - Java
 - Ruby
 - Node.js
 - Golang
 - Python
 - Php
 - .Net Core
 - Static Files
 - and binary applications

 If you are interested in helping expand this list, let us know!

## Rules and Quotas

### What resource quotas exist?

##### Applications 
10 Instances 

##### RAM
2 GB of total requested RAM

##### Services 
4 Services from the marketplace. This should give you enough to try each.

##### Tasks
5 Tasks

##### Routes

10 Routes. If you run into an issue, you likely just need to do some [clean up](/cli/#clean-up).

### What happens to my Applications if I forget them?

The sandbox runs on a shared instance of SUSE Cloud Application platform. To ensure a good user experience, we are monitoring usage of the system in accordance with our [Privacy Policy](https://www.explore.suse.dev/privacy/). If required, we may turn off Applications that appear unused to us. We will not delete them or any data associated with them at that point, and you will be notified if this happens. You can then simply turn them back on via the web UI or the command line client if you need them running again. 


### Can I do everything that is available in Cloud Foundry?

No, this is specifically a *Developer* Sandbox. We are not allowing access to operator functionality such as:

 - User and Team Management
 - Blue/Green Deployments
 - Any Kubernetes or Helm features in Stratos
 - NFS files systems mounts
 - 

Let us know if you require access to features beyond the baseline set, we're happy to discuss how we can help.

### Can I install my own Open Service Broker? 

Talk to us! If it's something that we think would be interesting to the whole community, we would likely be willing to help.

### Can I route non-HTTP routes. 

Yes, this is a feature of Cloud Foundry, but we have it turned off by default. Let us know if this is limiting you, we are happy to look into ways to support your use case.

### I want to try something bigger, can I request more capacity?

Yes, depending on the request we can work with you to get more capacity (or more likely help set up your own cluster.)


## User Management

### What is my username and password?

When you requested a sandbox account, you were prompted for a username and password to use. Please note that these credentials are different from your suse.com credentials. 

### How can I change my password?

Follow [these instructions](/password/).


### How can I reset my password if I forgot it?

At the moment, you will need to [email us](developers@suse.com) and have us change it to a temporary password. 
