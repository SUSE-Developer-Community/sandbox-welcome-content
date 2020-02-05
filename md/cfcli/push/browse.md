Regardless of which language your wrote your app in, the last few lines of the output should look something like this:

```log
name:              nodejs_sample
requested state:   started
routes:            nodejssample.trial.cap.suse.dev
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

