import chatRoomChannel from "../channels/chat_room_channel";


$(document).on('turbolinks:load', function () {

  $("form#set_name").on('submit', function(e){

    e.preventDefault();

    let name = $('#add_name').val();

    sessionStorage.setItem('chat_room_name', name)

    chatRoomChannel.announce({ name, type: 'join'})

    $("#modal").css('display', 'none');

  });


  $("form#send_message").on('submit', function(e){

    e.preventDefault();

    let message = $('#message').val();

    if (message.length > 0) {

      chatRoomChannel.speak(message);

      $('#message').val('')

    }

  });


  $(window).on('beforeunload', function() {

    let name = sessionStorage.getItem('chat_room_name')

    chatRoomChannel.announce({ name, type: 'leave'})

  });

})
