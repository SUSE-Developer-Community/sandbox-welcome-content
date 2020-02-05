import showdown from 'showdown'
var fs = require('fs');

const converter = new showdown.Converter()

const inDir = process.argv[2]+'/'
const inFile = inDir + process.argv[3]
const outFile = process.argv[4]

var contents = JSON.parse(fs.readFileSync(inFile, 'utf8'));


const readAndConvert = ({content})=>(converter.makeHtml(fs.readFileSync(inDir+content, 'utf8')))
const readTemplates = ({header, footer})=>({
  header:fs.readFileSync(inDir + header, 'utf8'),
  footer:fs.readFileSync(inDir + footer, 'utf8')
})

const readTabs = (tabs)=>(
  tabs.map(({title,sections})=>({
    title,
    section:sections.map(readSection)
  })).reduce(({titles,sections}, {title,section})=>({
    titles:titles.concat(title),
    sections:sections.concat(section)
  }),{titles:[],sections:[]})
)

const createTabs = ({tabs, id})=>{
  const {titles, sections} = readTabs(tabs)

  const titlesHTML = titles.map((title)=>(`
    <div class="tab">${title}</div>
  `)).reduce((acc,curr)=>(acc.concat(curr)))

  const sectionsHTML = sections.map((section)=>(`
    <div class="tab-section">${section}</div>
  `)).reduce((acc,curr)=>(acc.concat(curr)))

  return `
    <div class="tab-bar">
      ${titlesHTML}
    </div>
    <div class="tab-content">
      ${sectionsHTML}
    </div>
  `
}

const readSection = (section)=>{
  switch(section.type){
    case "text":
      return readAndConvert(section)
    case "tab":
      return createTabs(section)
  }
}

const out = contents.sections.map(readSection).reduce((acc, section)=>{
  return acc.concat(`
    <section>
      ${section}
    </section>
  `)
},'')
const {header, footer} = readTemplates(contents)


const html = "".concat(header,out,footer)

fs.writeFileSync(outFile, html)