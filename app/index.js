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
    this.copy('client/*', 'client/*');
    this.copy('server/*', 'server/*');
    this.copy('package.json');
    this.copy('.gitignore');
  },

});

module.exports = GalvanizeExpreessGenerator;
