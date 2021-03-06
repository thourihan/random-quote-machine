const colors = ["#e83a3a", "#fc5e03", "#edb739", "#92a674", "#0d5e23", "#87d6d1", "#1d54cc", "#7153c2", "#db88c8", "#ed5365", "#36160e", "#170e36", "#0c2622"];
let currentQuote = "";
let currentAuthor = "";

// Get the quotes and authors from the github jist
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json' },

    url:
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        // Add the quotes and authors to quotesData
        quotesData = JSON.parse(jsonQuotes);
      }
    } });

}

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {
  // Get a random quote and its respective author 
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  // Update the tweet button to contain the current quote info
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + currentQuote + '" ' + '-' + currentAuthor));

  // Update the google button to contain the current quote info
  $('#google-author').attr('href', 'https://google.com/search?q=' + encodeURIComponent(currentAuthor));

  // Change the website to a different color theme
  let animSpeed = 400;
  $('.quote-text').animate({ opacity: 0 }, 300, function () {
    $(this).animate({ opacity: 1 }, animSpeed);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 300, function () {
    $(this).animate({ opacity: 1 }, animSpeed);
    $('#author').html(randomQuote.author);
  });

  let color = Math.floor(Math.random() * colors.length);

  $('html body').animate(
  {
    backgroundColor: colors[color],
    color: colors[color] },

  animSpeed * 4);


  $('.button').animate(
  {
    backgroundColor: colors[color] },

  animSpeed * 4);

}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});