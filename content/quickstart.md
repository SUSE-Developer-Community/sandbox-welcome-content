# Quickstart

You can access the SUSE CAP Sandbox via the Cloud Foundry command line interface or via the Stratos Web interface. 

## CLI access

I'm assuming you already installed the Cloud Foundry CLI (check here for installation instructions). 

Start the login process with:
``` bash
cf login -a https://api.cap.explore.suse.dev -sso
```

This will return a URL you need to copy into your browser, which will take you to the login page. After logging in there, you will receive a one-time token, which you need to copy into your terminal like:
``` bash
cf login -sso-passcode <your token>
API endpoint: https://api.cap.explore.suse.dev

Authenticating...
OK

Targeted org <your_org_name>

Targeted space dev



API endpoint:   https://api.trial.cap.suse.dev (API version: 3.73.0)
User:           tim.irnich@suse.com
Org:            tim
Space:          dev
```

## Accessing the graphical web user interface Stratos

The Stratos Web UI can be accessed at https://stratos.cap.explore.suse.dev. 

## Where to get help

> TODO: decide what to provide here. 

## Further reading

More detailed instructions and inspiration what to try out can be found here. 
