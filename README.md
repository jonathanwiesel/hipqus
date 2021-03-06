#hipqus
***
> This application uses the Hipchat API v1, I also have it using the API v2, you can check out [hipqus-v2](https://github.com/jonathanwiesel/hipqus-v2) 

This simple application monitors a Disqus forum and sends a notification to a HipChat room when a new comment is made in said forum. Can be easily deployed to Heroku. You only need to set the following enviroment variables:

```
DISQUS_API_KEY=disqus_api_key
DISQUS_API_SECRET=api_secret
DISQUS_API_ACCESS_TOKEN=api_access_token
DISQUS_FORUM=your_disqus_forum
DISQUS_COMMENT_COUNT=10
HIPCHAT_API_TOKEN=hipchat_api_token
HIPCHAT_ROOM_ID=123456-123457                       # separate multiple rooms by a dash (-)
HIPCHAT_ROOM_MENTION=JonathanWiesel-here-all-...    # optional
```

The server will request every 10 seconds the 10 most recent comments (according to what's stated in the `DISQUS_COMMENT_COUNT` variable). If you consider that your forum could recieve more than 10 new comments in a 10 second window, feel free to increase that variable's number.

The `HIPCHAT_ROOM_MENTION` variable is **optional**, it will send an additional message to the channel mentioning those specified (separated by a dash). Remember `all` will mention every member on the channel and `here` will mention every available room members.
(It cannot be sent along the original message because the first one is HTML-formated and the HipChat API states that to use @mentions the message needs to be text-formated).

You can get your `HIPCHAT_API_TOKEN` from:

Group Admin tab -> API -> Create new **notification** token

***

##Notes
This application was built using:
* [node-disqus](https://github.com/hay/node-disqus)
* [node-hipchat](https://github.com/nkohari/node-hipchat)
* [cron](https://github.com/ncb000gt/node-cron)

