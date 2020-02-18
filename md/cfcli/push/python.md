Let's create a quick sample application using Python!

For simplicity, we will use the [Flask](https://www.palletsprojects.com/p/flask/) framework to serve a Hello World application.

Create a new project:

```bash
mkdir python_sample
cd python_sample
```

Create a [requirements file](https://pip.pypa.io/en/latest/user_guide/#requirements-files) called requirements.txt

```
Flask==1.1.1
```

<!-- (Optional) Install Flask for local development and testing

```
pip install -r requirements.txt
```

-->
Create a new file called hello.py

```python
from flask import Flask
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
```

*Note that the port we are listening on is 8080. While this can be changed, it's rarely needed to be different.*
*Note that the default port we are listening on is 8080. While this can be changed, it's rarely needed to be different. In case it is different, listening to the port exposed on the `PORT` environment variable takes care of this.*

We need to specify the right start script for our application. Create a new file
called Procfile

```
web: python hello.py
```

To run this code, now all you need to do is run:

```bash
cf push python_sample
```
