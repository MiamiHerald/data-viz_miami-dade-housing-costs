// globals
var $shareLinks = $('.js-share');
var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';
var width = 550;
var height = 420;
var winWidth = $(window).width();
var text;
var zipCount;
var shareText;
var winLeft = Math.round((winWidth / 2) - (width / 2));
var winTop = 0;

function openPopup(e) {
  e.preventDefault();

  zipCount = $('.zip-count').text();
  text = $(this).data('share') ? $(this).data('share') : '';
  shareText = "I can afford to live in " + zipCount + " ZIP codes in Miami-Dade and Broward counties, see what you can afford: " + text;
  window.open(this.href + encodeURIComponent(shareText), 'intent', windowOptions + ',width=' + width +
  ',height=' + height + ',left=' + winLeft + ',top=' + winTop);
}

function init() {
  $shareLinks.click(openPopup);
}

$(function() {
  init();
});
