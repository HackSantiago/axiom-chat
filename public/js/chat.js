(function($, _){

  var template = _.template(
    '<% _.each(messages, function(message) { %>' +
      '<b>* <%= message.user_name %>:</b> <%= message.text %><br/>' +
    '<% }); %>'
  );

  $(function() {

    var messages = [];
    var socket = io.connect(location.origin);

    var $field       = $('.field');
    var $send        = $('.send');
    var $content     = $('#content');
    var $currentUser = $('#current_user');
    var currentUser  = JSON.parse($currentUser.val());

    socket.on('message', function (data) {
        if (data.text) {

          messages.push({text: data.text, user_name: data.user_name});
          messages = volatileMessages(messages);

          $content.html(template({messages: messages}));

        }
        else {
          console.log("There is a problem:", data);
        }
    });

    $send.on('click', sendMessage);

    $field.on('keyup', function (ev) {
      if (ev.keyCode == 13) {
        sendMessage(ev);
      }
    });

    function sendMessage(ev) {
      ev.stopPropagation();

      socket.emit('send', { text: $field.val(), user_name: currentUser.profile.name });
      $field.val('')
    }

  });

  function volatileMessages(messages) {
    if (messages.length > 141) {
      messages.shift();
    }

    return messages;
  }

})($, _);
