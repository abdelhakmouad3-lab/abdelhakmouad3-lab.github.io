$(document).ready(function(){
    $('.toggle').click(function(){
      $('.timeline').slideToggle();
    });
    $(window).scroll(function(){
      $('.bar').each(function(){
        let position = $(this).offset().top;
        let scroll = $(window).scrollTop() + $(window).height();
  
        if(scroll > position){
          let width = $(this).data('width');
          $(this).animate({ width: width }, 1000);
        }
      });
    });
    $('#contactForm').submit(function(e){
      e.preventDefault();
      let name = $('#name').val();
      let email = $('#email').val();
      let message = $('#message').val();
      if(name === "" || email === "" || message === ""){
        alert("remplir tous les champs !");
      } else {
        alert("message envoyé !");
      }
    });
  });