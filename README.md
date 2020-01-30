# Welcome Content for SUSE Dev Sandbox

For our users who aren't experts in Cloud Foundry (Read: most everyone), we would like to provide a good, stress-free introduction. To accomodate different learning styles, each piece of content should be both written examples and recorded videos.

## Why are there a lot of files?
To ease writing and editing of content, I'm splitting up the markdown into many files and including a cli tool to build the document. The tool allows for creation of tabbed content as well to make reading the document significantly easier.

To build the html locally, run 
```
npm install
npm run build
npm run mdToHtml md out.html
```

Likely the Content and the npm project will be split up in the near future.
