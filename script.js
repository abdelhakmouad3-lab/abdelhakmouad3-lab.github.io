$(document).ready(function() {
  var animated = false;
  function animateSkills() {
    if (!animated) {
      $('.skill-bar').each(function() {
        var width = $(this).data('width');
        $(this).css('width', width + '%');
      });
      animated = true;
    }
  }
  $(window).on('scroll', function() {
    var sectionTop = $('#skills-section').offset().top;
    var scrollPos = $(window).scrollTop() + $(window).height() - 100;
    if (scrollPos > sectionTop && !animated) {
      animateSkills();
    }
  });
  $('.timeline-item').on('click', function() {
    $(this).toggleClass('active');
  });
  $('.skill').hover(
    function() {
      var bar = $(this).find('.skill-bar');
      var width = bar.data('width');
      bar.css('width', width + '%');
    },
    function() {
      if (!animated) {
        $(this).find('.skill-bar').css('width', '0%');
      } else {
        var width = $(this).find('.skill-bar').data('width');
        $(this).find('.skill-bar').css('width', width + '%');
      }
    }
  );
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();
    var isValid = true;
    $('#nameError').hide();
    $('#emailError').hide();
    $('#messageError').hide();
    $('#successMsg').hide();
    if (name === '') {
      $('#nameError').text('Nom requis').show();
      isValid = false;
    }
    if (email === '') {
      $('#emailError').text('Email requis').show();
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      $('#emailError').text('Format email invalide').show();
      isValid = false;
    }
    if (message === '') {
      $('#messageError').text('Message requis').show();
      isValid = false;
    }
    if (isValid) {
      $('#successMsg').text('Message envoyé avec succès !').show();
      $('#contactForm')[0].reset();
      setTimeout(function() {
        $('#successMsg').fadeOut();
      }, 3000);
    }
  });
});
