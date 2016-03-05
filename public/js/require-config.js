requirejs.config({
  baseUrl: 'js',
  paths: {
    d3: 'vendor/d3.min',
    foundation: 'foundation/foundation',
    jquery: 'vendor/jquery',
    jqueryDataTables: 'vendor/jquery.dataTables',
    lodash: 'vendor/lodash',
    modernizr: 'vendor/modernizr',
    nvd3: 'vendor/nv.d3.min'
  },
  shim: {
    foundation: ['jquery', 'modernizr'],
    jqueryDataTables: ['jquery'],
    nvd3: ['d3']
  }
});

// Load the main app module to start the app
requirejs(["main"]);
