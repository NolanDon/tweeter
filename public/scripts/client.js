const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let tweetString = createTweetElement(tweet)
    $("#tweetBox").append(tweetString);
  }
};

  // Bounce arrow slide composeNew (Don't change these values)
$("#bounceArrow").on('click', function () {
  $(".hideOnClick").slideToggle("slow", function() { 
  $("#text-field").focus();
  })
});
  
  // Date and Time Function (Don't change these values)
let timeAgo = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  
  let seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval === 0) {
            intervalType = 'a moment';
          } else if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval === 0) {
    return intervalType;
  } else {
    intervalType += 's';
    return interval + ' ' + intervalType;
  }
};
  
const createTweetElement = function(tweet) { 
  
  let newTime = timeAgo(new Date(tweet.created_at));
  
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
              // Dynamic Article Generator (Do not change these values)
  const tweetString = `<article class=${"tweetContainer"}>           
    <div>
      <img src=${tweet.user.avatars}>${tweet.user.name}
      </div>
      <div class="handle">
        <a>${tweet.user.handle}</a>
      </div>
      <p>${escape(tweet.content.text)}</p>        
      <footer>
        <h5>${newTime} ago 
          <div class="articleIcons">
            <i class="fas fa-heart"></i>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
          </div>
        </h5>
      </footer>
    </article>`;
  return tweetString;
};

$( document ).ready(function() {

  $(function() {  
    const $form = $('#newTweet');
    $form.on('submit', function (event) {
      event.preventDefault()
      const info = $(this).serialize()
      const textFieldLength = $('#text-field').val().length
      const limit = 140;
      if (textFieldLength > limit) {
        $(".isa_error").show()
        setTimeout( function () {
          $(".isa_error").hide()
        },4000)
        return false;  
      } 
      
      if ($('#text-field').val() === '') {
       $(".isa_warning").show()
       setTimeout( function () {
         $(".isa_warning").hide()
        },4000) 
        return false;
      } 

      $.ajax({
        type: "POST",
        url: '/tweets',
        data: info,
        success: function(res) {
          $('#text-field').val('');
          $(".isa_success").show()
          setTimeout( function () {
            $(".isa_success").hide()
          },4000)
          let response = createTweetElement(res)
          $("#tweetBox").prepend(response)
        }
      })  
    })
  })
});



