var disqus = require('./lib/disqus-node.js');

var dotenv = require('dotenv');
dotenv.load();

console.log(process.env.API_KEY);
var dq = disqus(process.env.API_KEY, 'json', '3.0', true);

dq.call('posts', 'list', null, function (response) {
    console.log(response.toString());
});

