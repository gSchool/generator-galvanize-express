(function() {

  'use strict';

  const yeoman = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');

  module.exports = yeoman.Base.extend({
    prompting: function() {
      this.log(yosay(
        'Welcome to the finest ' + chalk.red('generator-galvanize-express') + ' generator!'
      ));
      const prompts = [
        {
          name: 'name',
          message: 'What\'s your name?',
          required: true
        },
        {
          type: 'confirm',
          name: 'notify',
          message: 'Do you want to use Gulp Notify?',
          default: false
        },
        {
          type: 'confirm',
          name: 'knex',
          message: 'Do you want to use Knex?',
          default: true
        },
        {
          when: function(response) {
            return response.knex;
          },
          name: 'database',
          message: 'What\'s the name of the db?'
        }
      ];
      return this.prompt(prompts).then(function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
    },
    writingFiles: function() {
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
      if (this.props.notify) {
        this.fs.copy(
          this.templatePath('gulpfile_notify.js'),
          this.destinationPath('gulpfile.js')
        );
      } else {
        this.fs.copy(
          this.templatePath('gulpfile.js'),
          this.destinationPath('gulpfile.js')
        );
      }
      if (this.props.database) {
        this.fs.copyTpl(
          this.templatePath('knexfile.js'),
          this.destinationPath('knexfile.js'),
          {
            database: this.props.database
          }
        );
      }
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
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
    writingFolders: function() {
      this.fs.copy(
        this.templatePath('src/'),
        this.destinationPath('src/')
      );
      this.fs.copy(
        this.templatePath('test/'),
        this.destinationPath('test/')
      );
      if (this.props.database) {
        this.fs.copy(
          this.templatePath('src/'),
          this.destinationPath('src/')
        );
      }
    },
    removeFolders: function() {
      if (!this.props.database) {
        this.fs.delete(
          this.destinationPath('src/server/db/knex.js')
        );
      }
    }
  });

}());
