There are a few steps that happen when you run `cf push`:

 * The current working directory gets zipped up
 * This file gets uploaded to the server
 * The server starts running the code through a series of "build packs"
 * Each buildpack determines if it can do anything with the code
 * If one can, it builds the code into a container and instructs the scheduler how to run the new application
 * The scheduler runs the freshly built application
 