var Hipchat = require('node-hipchat');
var hip = new Hipchat(process.env.HIPCHAT_API_KEY);

var sendComment = function (data) {

    var response = JSON.parse(data);
    var responseLength = response.response.length;
    if(responseLength > 0){
        for(var i=0; i < responseLength; i++){

            var comment = response.response[i];
            var commentDate = new Date(comment.createdAt);

            var url = comment.thread.link + '#comment-' + comment.id;

            var message = '<p><b>' + comment.author.name + '</b> created <a href="'+ url +'"> a new comment</a>';
            message += ' on entry <a href="'+ comment.thread.link +'">' +  comment.thread.title + '</a>:</p><br>';
            message += comment.message;
            var params = {
                from: 'Disqus',
                message: message,
                color: 'green'
            };

            var rooms = process.env.HIPCHAT_ROOM_ID.split('-');
            for(var k=0; k < rooms.length; k++){

                params.room = rooms[k];

                hip.postMessage(params, function(data) {
                    console.log('New Disqus comment!. Message sent to Hipchat room.');
                });
            }


            if(process.env.HIPCHAT_ROOM_MENTION){
                for(var k=0; k < rooms.length; k++){
                    var mentionsVar = process.env.HIPCHAT_ROOM_MENTION.split('-');
                    var mentions = '';
                    for(var j=0; j < mentionsVar.length; j++){
                        mentions += ' @' + mentionsVar[j];
                    }
                    var mentionMessage = 'Alerting' + mentions + ' about new comment.';

                    params.message = mentionMessage;
                    params.message_format = 'text';
                    params.room = rooms[k];

                    hip.postMessage(params, function(data) {
                        console.log('Mentioning alert sent.');
                    });
                }
            }

        }
    }else{
        console.log('Nothing new to send');
    }
}


module.exports.sendComment = sendComment;
