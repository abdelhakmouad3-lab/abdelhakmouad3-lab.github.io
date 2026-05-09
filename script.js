$(document).ready(function () {
  $('.toggle-btn').click(function () {
    $('.timeline').stop(true, true).slideToggle();
  });
  let animated = false;
  function animateBars() {
    if (animated) {
      return;
    }
    $('.bar').each(function () {
      let width = $(this).data('width');
      $(this).animate({ width: width }, 1200);
    });
    animated = true;
  }
  function checkSkills() {
    const skillsTop = $('#skills').offset().top;
    const scroll = $(window).scrollTop() + $(window).height();

    if (scroll > skillsTop + 50) {
      animateBars();
    }
  }
  checkSkills();
});
