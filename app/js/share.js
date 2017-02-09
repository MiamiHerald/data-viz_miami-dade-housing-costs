// globals
var $shareLinks = $('.js-share');
var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';
var width = 550;
var height = 420;
var winWidth = $(window).width();
var text;
var zipCount;
var winLeft = Math.round((winWidth / 2) - (width / 2));
var winTop = 0;
var shareText;

function openPopup(e) {
  e.preventDefault();

  zipCount = $('.zip-count').text();
  text = $(this).data('share') ? $(this).data('share') : '';

  if ($(this).hasClass('show-all')) {
    shareText = "See where you can afford a home in Miami-Dade and Broward with this @MiamiHerald #RealEstate tool: " + text;
  } else {
    shareText = "I can afford a home in " + zipCount + " Miami-Dade and Broward ZIPs. Check this @MiamiHerald #RealEstate tool for your results: " + text;
  }

  window.open(this.href + encodeURIComponent(shareText), 'intent', windowOptions + ',width=' + width +
  ',height=' + height + ',left=' + winLeft + ',top=' + winTop);
}

function init() {
  $shareLinks.click(openPopup);
}

$(function() {
  init();
});
