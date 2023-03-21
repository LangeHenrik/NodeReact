console.log('browser js file loaded');

const getTweets = () => {
    fetch('/tweets')
        .then(response => response.json())
        .then(tweets => {
            console.log(tweets);
            const tweetsDiv = document.getElementById('tweets');
            tweetsDiv.innerHTML = '';
            tweets.forEach(tweet => {
                const tweetDiv = document.createElement('div');
                tweetDiv.innerHTML = tweet.tweet_id + ": " + tweet.tweet;
                tweetsDiv.appendChild(tweetDiv);
            });
        });
}

getTweets();

const tweetForm = document.getElementById('tweet-form');
tweetForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = document.getElementById('tweet').value;
    fetch('/tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text})
    })
    .then(response => response.json())
    .then(() => getTweets());
});

const socket = io();

socket.on('hello', () => {
    console.log('hello');
    getTweets();
});
