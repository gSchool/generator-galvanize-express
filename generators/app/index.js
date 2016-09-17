(function() {

  'use strict';

  const yeoman = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const fs = require('fs');
  const path = require('path');

  module.exports = yeoman.Base.extend({
    prompting: function() {
      this.log(yosay(
        'Welcome to the finest ' + chalk.red('ExpressJS') + ' generator on the market!'
      ));
      const prompts = [
        {
          name: 'name',
          message: 'Your name (for the LICENSE)?',
          required: true,
          default: 'Change Me'
        },
        {
          name: 'project',
          message: 'Project name (for package.json)?',
          required: true,
          default: 'Change Me'
        },
        {
          type: 'confirm',
          name: 'notify',
          message: 'Do you want to use Gulp Notify?',
          default: false
        },
        {
          type: 'list',
          name: 'database',
          message: 'Do you want to use pg-promise or Knex?',
          choices: [
            {
              name: 'pg-promise',
              value: 'pg-promise'
            },
            {
              name: 'knex',
              value: 'knex'
            },
            {
              name: 'neither',
              value: null
            }
          ],
          default: 'neither'
        },
        {
          when: function(response) {
            if (response.database) {
              return response.database;
            }
          },
          name: 'databaseName',
          message: 'Database name?'
        }
      ];
      return this.prompt(prompts).then(function(props) {
        this.props = props;
      }.bind(this));
    },
    generatePackageDotJSON: function() {
      const readFilePath = path.join(
        __dirname, 'templates', '_example.package.json');
      const writeFilePath = path.join(
        __dirname, 'templates', 'package.json');
      fs.readFile(readFilePath, (err, data) => {
        if (err) {
          throw err;
        }
        const jsonObject = JSON.parse(data);
        const sansSpaces = (this.props.project).replace(/\s/g, '');
        jsonObject.name = sansSpaces;
        if (this.props.database) {
          if (this.props.database === 'pg-promise') {
            jsonObject.dependencies['pg-promise'] = '5.3.2';
          } else if (this.props.database === 'knex') {
            jsonObject.dependencies.knex = '^0.11.10';
            jsonObject.dependencies.pg = '6.1.0';
          }
        }
        if (this.props.notify) {
          jsonObject.devDependencies['gulp-notify'] = '^2.2.0';
        }
        const stringifiedObject = JSON.stringify(jsonObject, null, 2);
        fs.writeFile(writeFilePath, stringifiedObject, (err, data) => {
          if (err) {
            throw err;
          }
          this.fs.copy(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
          );
        });
      });
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
    },
    createDatabase: function() {
      if (this.props.database) {
        if (this.props.database === 'pg-promise') {
          this.fs.copyTpl(
            this.templatePath('_db.connection.pg.js'),
            this.destinationPath('src/server/db/connection.js'),
            {
              database: this.props.databaseName
            }
          );
        } else if (this.props.database === 'knex') {
          this.fs.copyTpl(
            this.templatePath('knexfile.js'),
            this.destinationPath('knexfile.js'),
            {
              database: this.props.databaseName
            }
          );
          this.fs.copyTpl(
            this.templatePath('_db.connection.knex.js'),
            this.destinationPath('src/server/db/connection.js')
          );
        }
      }
    }
  });

}());
