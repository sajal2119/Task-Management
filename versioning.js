var Version = require("node-version-assets");
var versionInstance = new Version({
    assets: ['dist/bundle.js', 'dist/public/css/main.css', 'dist/public/css/materialize.css'],
    grepFiles: ['dist/index.html']
});

versionInstance.run();