# Organizations and Spaces

The applications and users of a Cloud Foundry platform are split into Organizations and Spaces. This gives a way to built a multi-tenant environment with minimal headache since each of these organizations and spaces can be given it's own resource quotas and access controls.

As part of your free trial, you have administrator rights for your own organization with a few different spaces by default. By default, there are a few applications running in the "sample" space (selected at login).

To check which apps are running, run:

```bash
cf apps
```

This should show a list of applications, their state, how many instances are running, their quotas, and any URLs being routed to them.

You can also check out the services provided in our environment, by running:

```bash
cf marketplace
```

Which will return the services, the plans offered, any description, and which broker is providing the service. These will be revisited later.

To find more information about a single subcommand, use the help command. For example to get more information about the marketplace command, run:

```bash
cf help marketplace
```

There are a ton of commands accessible through the cf-cli. To get a list of available commands, you can run:

```bash
cf help -a
```
