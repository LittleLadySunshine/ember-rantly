/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'rantly-front',
    environment: environment,
    baseURL: '/',
    adapterURL: process.env.ADAPTER_URL,
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

contentSecurityPolicy: {
  'default-src': "'none'",
  'script-src': "'self'",
  'font-src': "'self' http://fonts.gstatic.com http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.woff2?v=4.3.0",
  'connect-src': "'self' localhost:3000",
  'img-src': "'self' http://www.gravatar.com",
  'style-src': "'self' 'unsafe-inline' http://css-spinners.com/css/spinner/spinner.css http://fonts.googleapis.com http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.ttf?v=4.3.0",
  'media-src': "'self'"
},

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
