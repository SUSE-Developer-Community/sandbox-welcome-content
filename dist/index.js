"use strict";

var _showdown = _interopRequireDefault(require("showdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fs = require('fs');

var converter = new _showdown["default"].Converter();
var inDir = process.argv[2] + '/';
var outFile = process.argv[3];
var contents = JSON.parse(fs.readFileSync("".concat(inDir, "document.json"), 'utf8'));

var readAndConvert = function readAndConvert(_ref) {
  var content = _ref.content;
  return converter.makeHtml(fs.readFileSync(inDir + content, 'utf8'));
};

var readTemplates = function readTemplates(_ref2) {
  var header = _ref2.header,
      footer = _ref2.footer;
  return {
    header: fs.readFileSync(inDir + header, 'utf8'),
    footer: fs.readFileSync(inDir + footer, 'utf8')
  };
};

var readTabs = function readTabs(tabs) {
  return tabs.map(function (_ref3) {
    var title = _ref3.title,
        sections = _ref3.sections;
    return {
      title: title,
      section: sections.map(readSection)
    };
  }).reduce(function (_ref4, _ref5) {
    var titles = _ref4.titles,
        sections = _ref4.sections;
    var title = _ref5.title,
        section = _ref5.section;
    return {
      titles: titles.concat(title),
      sections: sections.concat(section)
    };
  }, {
    titles: [],
    sections: []
  });
};

var createTabs = function createTabs(_ref6) {
  var tabs = _ref6.tabs,
      id = _ref6.id;

  var _readTabs = readTabs(tabs),
      titles = _readTabs.titles,
      sections = _readTabs.sections;

  var titlesHTML = titles.map(function (title) {
    return "\n    <div class=\"tab\">".concat(title, "</div>\n  ");
  }).reduce(function (acc, curr) {
    return acc.concat(curr);
  });
  var sectionsHTML = sections.map(function (section) {
    return "\n    <div class=\"tab-section\">".concat(section, "</div>\n  ");
  }).reduce(function (acc, curr) {
    return acc.concat(curr);
  });
  return "\n    <div class=\"tab-bar\">\n      ".concat(titlesHTML, "\n    </div>\n    <div class=\"tab-content\">\n      ").concat(sectionsHTML, "\n    </div>\n  ");
};

var readSection = function readSection(section) {
  switch (section.type) {
    case "text":
      return readAndConvert(section);

    case "tab":
      return createTabs(section);
  }
};

var out = contents.sections.map(readSection).reduce(function (acc, section) {
  return acc.concat("\n    <section>\n      ".concat(section, "\n    </section>\n  "));
}, '');

var _readTemplates = readTemplates(contents),
    header = _readTemplates.header,
    footer = _readTemplates.footer;

var html = "".concat(header, out, footer);
fs.writeFileSync(outFile, html);