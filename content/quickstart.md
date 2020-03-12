---
title: Quickstart
menu:
  nav:
    name: "primitive"
    url: "/quickstart/"
    weight: 50
---

You can access the SUSE CAP Sandbox via the Cloud Foundry command line interface or via the Stratos Web interface. Your user name is the e-mail address you used to create your SUSE developer community account, and the password is in the welcome e-mail you received after registering for access to the sandbox. 

## CLI access

The API endpoint URL is https://api.cap.explore.suse.dev. I'm assuming you already installed the Cloud Foundry CLI (check [here](/cli/) for instructions how to do that). 

Log your client in by:
``` bash
> cf login -a https://api.cap.explore.suse.dev -u <your_username> -p <your_password>
API endpoint: https://api.cap.explore.suse.dev

Authenticating...
OK

Targeted org <your_org_name>

Select a space:
1. prod
2. samples
3. dev
4. test

Space (enter to skip): 3
Targeted space dev



API endpoint:   https://api.cap.explore.suse.dev (API version: 3.79.0)
User:           <your_username>
Org:            <your_org_name>
Space:          dev
```

If you want to change your initial password:
``` bash
> cf passwd

Current Password> 

New Password> 

Verify Password> 
Changing password...
OK
Please log in again
```

There's a lot more you can do with the CLI client - check our detailed [CLI introduction](/cli/) for more information. 

## Accessing the graphical web user interface Stratos

The Stratos Web UI can be accessed at https://stratos.cap.explore.suse.dev. Credentials are the same as above, your SUSE Developer community account e-mail and password from the welcome mail.  

## Where to get help

If you get stuck or run into trouble, you can reach us in the #developersandbox channel on our Discord server, or write an email to devcommunity@suse.com. 

## Further reading

More detailed instructions and inspiration what to try out on the command line can be found [here](/cli/), and some exercises on the web UI Stratos can be found [here](/stratos). 

The Cloud Foundry [From Zero to Hero course](https://www.cloudfoundry.org/trainings/cloud-foundry-beginners-zero-hero/) is a classic starting point if you want to get even more serious.  

If you're interested in going deeper and maybe even get certified on SUSE Cloud Application Platform, have a look at our [training offerings](https://training.suse.com/certification/fa-suse-cap/). 
