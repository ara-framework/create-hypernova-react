const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default: `Another Hypernova React project`
      },
      {
        name: 'hasSSR',
        type: 'confirm',
        message: 'Do you want to include Server-Side Rendering (SSR)',
        default: true
      },
    ]
  },
  actions: function() {
    return [
      {
        type: 'add',
        files: '**',
        filters: {
          'webpack.client.config.js': !this.answers.hasSSR,
          'package.client.json': !this.answers.hasSSR
        }
      },
      {
        type: 'move',
        patterns: {
          'webpack.client.config.js' : 'webpack.config.js',
          'package.client.json' : 'package.json',
          [`src/${this.answers.hasSSR ? 'index': 'client'}.js`]: 'src/index.js'
        }
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore'
        }
      }
    ]
  },
  async completed() {
    await this.npmInstall()
    this.showProjectTips()
  }
}
