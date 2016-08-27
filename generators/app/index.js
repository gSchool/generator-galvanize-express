(function() {

  'use strict';

  var yeoman = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');

  module.exports = yeoman.Base.extend({
    prompting: function () {
      this.log(yosay(
        'Welcome to the finest ' + chalk.red('generator-galvanize-express') + ' generator!'
      ));
    },
    writingFiles: function () {
      this.fs.copy(
        this.templatePath('.env'),
        this.destinationPath('.env')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('.jscsrc'),
        this.destinationPath('.jscsrc')
      );
      this.fs.copy(
        this.templatePath('.jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('.travis.yml'),
        this.destinationPath('.travis.yml')
      );
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
    },
    writingFolders: function () {
      this.fs.copy(
        this.templatePath('src/'),
        this.destinationPath('src/')
      );
      this.fs.copy(
        this.templatePath('test/'),
        this.destinationPath('test/')
      );
    }
  });

}());
