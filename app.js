var Disqus = require('disqus'),
    cronJob = require('cron').CronJob,
    hipchat = require('./hipchat.js');

var disqus = new Disqus({
    api_secret : process.env.DISQUS_API_SECRET,
    api_key : process.env.DISQUS_API_KEY,
    access_token : process.env.DISQUS_API_ACCESS_TOKEN
});

var disqus_options = {
    forum: process.env.DISQUS_FORUM,
    related: 'thread',
    order: 'asc'
};

var lastTimestamp = new Date();

new cronJob('*/10 * * * * *', function (){

    disqus_options.since = lastTimestamp.toISOString();

    disqus.request('posts/list', disqus_options, function(data) {

        lastTimestamp = new Date();
        if(data.error) {
            console.log('Something went wrong...');
            console.log(data);
        }else{
            hipchat.sendComment(data);
        }
    });

}, null, true, null);

