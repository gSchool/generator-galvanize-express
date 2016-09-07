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
      var prompts = [
        {
          name: 'name',
          message: 'What\'s your name?',
          required: true
        }
      ];
      return this.prompt(prompts).then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
    },
    writingFiles: function () {
      this.fs.copy(
        this.templatePath('.env'),
        this.destinationPath('.env')
      );
      this.fs.copy(
        this.templatePath('dot-gitignore'),
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
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        {
          year: (new Date()).getFullYear(),
          name: this.props.name
        }
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
