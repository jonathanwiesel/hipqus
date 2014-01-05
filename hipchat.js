var Hipchat = require('node-hipchat');
var hip = new Hipchat(process.env.HIPCHAT_API_KEY);

var buildMessage = function (comment){

    var commentDate = new Date(comment.createdAt);

    var url = comment.thread.link + '#comment-' + comment.id;

    var message = '<p><b>' + comment.author.name + '</b> created <a href="'+ url +'"> a new comment</a>';
    message += ' on entry <a href="'+ comment.thread.link +'">' +  comment.thread.title + '</a>:</p><br>';
    message += comment.message;

    sendMessage(message);
}


function sendMessage(message){

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
        sendMetions(rooms, params);
    }
}


function sendMetions(rooms, params){
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


module.exports.buildMessage = buildMessage;
