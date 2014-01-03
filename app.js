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
    limit: process.env.DISQUS_COMMENT_LIMIT,
    related: 'thread'
};

var lastTimestamp = new Date();

new cronJob('*/10 * * * * *', function (){

    disqus.request('posts/list', disqus_options, function(data) {

        if(data.error) {
            console.log('Something went wrong...');
            console.log(process.env.DISQUS_API_KEY);
            console.log(process.env.DISQUS_API_SECRET);
            console.log(process.env.DISQUS_COMMENT_LIMIT);
            console.log(process.env.HIPCHAT_ROOM_ID);
        }else{

            hipchat.sendComment(lastTimestamp, data);

            lastTimestamp = new Date();
        }
    });

}, null, true, null);

