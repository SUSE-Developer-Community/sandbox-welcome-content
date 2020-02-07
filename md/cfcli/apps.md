# Organizations and Spaces

The applications and users of a Cloud Foundry platform are split into Organizations and Spaces. This gives a way to built a multi-tenant environment with minimal headache since each of these organizations and spaces can be given it's own resource quotas and access controls.

As part of your free trial, you have administrator rights for your own organization with a few different spaces by default. By default, there are a few applications running in the "sample" space (selected at login).

To check which apps are running in the current org and space, run:

```bash
cf apps
```

This should show a list of applications, their state, how many instances are running, their quotas, and any URLs being routed to them.

To switch to the "dev" space, use 

```bash
cf target -s dev
```
