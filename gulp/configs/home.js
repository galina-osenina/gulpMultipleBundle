module.exports = [{
    app: { baseName: 'index' },
    page: 'index',
    sass: {
      src: ['src/sass/base.scss'],
    },
    buildLocations: {
      css: './build/styles/'
    }
  },
  {
    app: { baseName: 'about-us' },
    page: 'about-us',
    sass: {
      src: ['src/sass/base.scss', 'src/sass/normalize.scss'],
    },
    buildLocations: {
      css: './build/styles/'
    }
  }
];
