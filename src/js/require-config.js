requirejs.config({
  baseUrl: 'js',
  paths: {
    d3: 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min',
    foundation: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.3/js/foundation.min',
    jquery: 'https://code.jquery.com/jquery-2.2.1.min',
    jqueryDataTables: 'https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min',
    lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.6.1/lodash.min',
    modernizr: 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min',
    nvd3: 'https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.2/nv.d3.min'
  },
  shim: {
    foundation: ['jquery', 'modernizr'],
    jqueryDataTables: ['jquery'],
    nvd3: ['d3']
  }
});

// Load the main app module to start the app
requirejs(["main"]);
