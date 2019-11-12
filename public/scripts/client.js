$( document ).ready(function() {
  
  const createTweetElement = function(tweet) { 

    // Article Template
    const tweetString = `
     <article class=${"tweetContainer"}>           
      <div>
        <img src=${tweet.user.avatars}>${tweet.user.name}
      </div>
      <div class="handle">
        <a>${tweet.user.handle}</a>
      </div>
      <p>${(tweet.content.text)}</p>        
        <footer>
          <h5>${timeSince(tweet.created_at)}  
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
  
   // Load the tweets
  const loadTweets = function() {
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json"
    })
    .done(function(data) {
      $("#new-article").empty();
      renderTweets(data);
    })
    .fail(function() {
    });
  };
  
  const renderTweets = function(tweets) {
   // Loop through tweets
   // Call createTweetElement for each tweet
   // Take return value and appends it to the tweets container
   
    for (let tweet of tweets) {
      let tweetString = createTweetElement(tweet)
      $("#new-article").prepend(tweetString);
    }
  };
  
  loadTweets();
  
  // Submit form
  $(function() {  
    const $form = $('#newTweet');
    $form.on('submit', function (event) {
      event.preventDefault()
      const info = $(this).serialize()
      
     // Check for tweet if over 140 characters
     // If true throw error
     const textFieldLength = $('#text-field').val().length
     const textLimit = 140;
      if (textFieldLength > textLimit) {
        $(".isa_error").show()
        setTimeout( function () {
          $(".isa_error").hide()
        },4000)
        return false;  
      } 
      
      // Check for empty tweet
      // Throw error if true
      if ($('#text-field').val() === '') {
       $(".isa_warning").show()
       setTimeout( function () {
         $(".isa_warning").hide()
        },4000) 
        return false;
      } 

      // POST request when submit tweet - Reset Form
      // Show success message if success
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
          $("#new-article").prepend(response)
        }
      })  
    })
  })
});

const timeSince = function(date) {
  // function found at https://stackoverflow.com/a/3177838
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};


