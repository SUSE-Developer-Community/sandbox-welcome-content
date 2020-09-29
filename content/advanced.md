---
title: Advanced Concepts
menu:
  nav:
    name: "Advanced"
    url: "/advanced/"
    weight: 100
---


## Rabbit MQ

With the introduction of [Minibroker 1.0](https://github.com/kubernetes-sigs/minibroker/releases/tag/v1.0.0) we are offering Rabbit MQ in our service marketplace.

[Rabbit MQ](https://www.rabbitmq.com) is an open source message broker. It's very useful for splitting work across processes and treating the system as a flow of data. Splitting this work over an event bus allows you to better control scaling of tasks that might take significant processing time without blocking new requests coming in. 



### Sample Application

For an amazingly basic sample application, let's build the sample `longtime_add` Celery application in CAP and then expose it via HTTP using flask. 

{{<callout title="Note">}}
This is not at all production code and is only intended to show how to set up Celery workers in Python.   
{{</callout>}}

We will create a few files in your project. 

Firstly, let's write our dependencies to `requirements.txt`: 

```requirements.txt
flask
celery
```

Then pick Python 3 in `runtime.txt`:
```runtime.txt
python-3.x
```

These will tell the buildpack to install all the right packages and run with the right version of Python.
#### Worker Setup


Next let's set up the RabbitMQ <-> Celery link and define our `longtime_add` task in `tasks.py`. As you can see we are using a similar VCAP_SERVICES chunk of code as documented in [the cli guide](/cli/).

```tasks.py
from __future__ import absolute_import
from celery import Celery
import time

import json
import os

if 'VCAP_SERVICES' in os.environ:
  vcap_services = json.loads(os.environ['VCAP_SERVICES'])
  if 'rabbitmq' in vcap_services:
    credentials = vcap_services['rabbitmq'][0]['credentials']
  else:
    print("No Rabbit info found in VCAP_SERVICES! Are you sure you created and bound the service to your app?")

rabbit_uri = credentials['uri']

app = Celery( "tasks",
             broker=rabbit_uri,
             backend='rpc://')

@app.task
def longtime_add(x, y):
    print('long time task begins')
    # sleep 5 seconds
    time.sleep(5)
    print('long time task finished')
    return x + y
```


This task will take 5 seconds to add two numbers.

To call this we need to import the function and call `.delay()` on it. When called in this style, the function will actually run on the worker and a future is returned. 

With the returned future, we can either call `.get()` to block and get the value or `.ready()` to see if the result is ready. 

#### Flask Setup

Let's use a extremely simple flask application to see this in action:
```server.py
from flask import Flask, redirect, render_template, request
from tasks import longtime_add

app = Flask(__name__)

@app.route('/')
def index():
  x = request.args.get('x', default = 2, type = int)
  y = request.args.get('y', default = 3, type = int)
  fut = longtime_add.delay(x, y)
  return str(fut.get())

if __name__ == '__main__':
  app.run(host="0.0.0.0", port=8080)
```

Lastly, we need to actually run these in CF. Since we actually have two different applications here (web and worker) we can define both in the same manifest. We just need to make sure we share the same service instance.

{{<callout title="Note">}}
Since the worker doesn't need a URL, we can set `no-route: true`.
{{</callout>}}

```manifest.yml
applications:
- name: PythonTestWeb
  buildpacks: 
  - python_buildpack
  random-route: true
  services:
  - rabbit-test
  command: python3 server.py
  
- name: PythonTestWorker
  health-check-type: process
  services:
  - rabbit-test
  buildpacks: 
  - python_buildpack
  no-route: true
  command: celery -A tasks worker
```

You can find the route that gets assigned to PythonTestWeb by using `cf routes`. When you browse to it, the page should take roughly 5 seconds to load then returns `5`. 

This example is obviously contrived. But, using a message queue to think about your data moving through a pipeline is an amazingly useful concept. In this example, we waited for the return to reply. However, you instead pass the message on and not wait. When used correctly, this can lead to both better usability in the User Experience as well as more maintainable code due to the separation of concerns.
