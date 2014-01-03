var Hipchat = require('node-hipchat');
var hip = new Hipchat(process.env.HIPCHAT_API_KEY);

var sendComment = function (lastTimestamp, data) {

    var response = JSON.parse(data);

    for(var i=0; i < response.response.length; i++){

        var comment = response.response[i];
        var commentDate = new Date(comment.createdAt);

        if(comment.createdAt > lastTimestamp){

            var url = comment.thread.link + '#comment-' + comment.id;
            var message = '<a href="'+ url +'"> A new Disqus comment has being registered.</a><br>';
            message += 'Post: ' + comment.thread.title + '<br>';
            message += 'Author: ' + comment.author.name + '<br>';
            message += 'Message: ' + comment.message;
            var params = {
                room: process.env.HIPCHAT_ROOM_ID,
                from: 'Disqus',
                message: message,
                color: 'green'
            };

            hip.postMessage(params, function(data) {
                console.log('New Disqus comment!. Message sent to Hipchat room');
            });

        }else{
            break;
        }
    }
}

module.exports.sendComment = sendComment;
