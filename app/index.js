var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var GalvanizeExpreessGenerator = yeoman.generators.Base.extend({

  promptUser: function() {
    // greeting
    console.log(chalk.magenta("Welcome to Galvanize's Node/Express Generator"));
  },

  createApp: function(){
    this.copy('client/js/main.js', 'client/js/main.js');
    this.copy('client/css/main.css', 'client/css/main.css');
    this.copy('server/bin/www', 'server/bin/www');
    this.copy('server/routes/index.js', 'server/routes/index.js');
    this.copy('server/views/error.html', 'server/views/error.html');
    this.copy('server/views/index.html', 'server/views/index.html');
    this.copy('server/views/layout.html', 'server/views/layout.html');
    this.copy('server/app.js', 'server/app.js');
    this.copy('package.json');
    this.copy('_gitignore', '.gitignore');
    this.copy('_gulpfile.js', '.gulpfile.js');
  },

});

module.exports = GalvanizeExpreessGenerator;
