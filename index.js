var app = angular.module('QuoteApp', ['ngMaterial'])
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('light-blue', {
      'default': '200'
    })
    })

$(document).ready(function () {
  // Retrieve random quote
  $('#quote-button').on('click', function () {
    $.ajax({
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function (data) {
        var post = data.shift()
        $('.quote-holder').slideUp(function () {
          $('.quote').html(post.content)
          $('.author').html('--' + post.title)
          $('#get-quote').text('Get a New Quote')
          if (post.content.length < 280) {
            $('#tweet-button').show()
            $('.no-tweet').hide()
          } else {
            $('#tweet-button').hide()
            $('.no-tweet').show()
          }
        })
        $('.quote-holder').slideDown()
      },
      cache: false
    })
  })
// Share on twitter
  $('#tweet-button').click(function () {
    var width = 575
    var height = 400
    var left = ($(window).width() - width) / 2
    var top = ($(window).height() - height) / 2
    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent($('.quote').text()) // deal with invalid characters such as ;
    var opts = 'status=1' +
                 ',width=' + width +
                 ',height=' + height +
                 ',top=' + top +
                 ',left=' + left

    window.open(url, 'twitter', opts)
    return false
  })
})
