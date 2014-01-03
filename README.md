#diqus-hipchat
***
This simple application monitors a Disqus forum and sends a notification to a HipChat room when a new comment is made in said forum. Can be easily deployed to Heroku. You only need to set the following enviroment variables:

```
DISQUS_API_KEY=disqus_api_key
DISQUS_API_SECRET=api_secret
DISQUS_API_ACCESS_TOKEN=api_access_token
DISQUS_FORUM=your_disqus_forum
HIPCHAT_API_KEY=hipchat_api_key
HIPCHAT_ROOM_ID=123456
DISQUS_COMMENT_LIMIT=10
```

The server will request every 10 seconds the most 10 recent comments from the forum. You could change the interval to a smaller value but remember that Disqus API is limited to 1000 requests per hour.

The `DISQUS_COMMENT_LIMIT` variable is set to 10 by default assuming that in 10 seconds (the cron scheduled period) there should be no more than 10 comments, this way the response from the Disqus API will be smaller and faster. Change it to a higher value if you have a really busy forum that may have more than 10 new comments in a 10 second period.


