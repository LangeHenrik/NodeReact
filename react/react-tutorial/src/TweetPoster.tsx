import React, { useState, ChangeEvent } from 'react';

function TweetPoster () {

    const [tweet, setTweet] = useState('');

    const handleTweetChange = (event: ChangeEvent<HTMLInputElement> ) => {
        setTweet(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(tweet);
        fetch ('/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tweet: tweet})
        })
        .then (response => response.json())
        .then (() => {
            setTweet('');
            document.getElementById('tweet')?.focus();
        });
    };

    return <form onSubmit={handleSubmit} id="tweet-form">
            <input 
                type="text" 
                name="text" 
                id="text" 
                placeholder="What's happening?"
                value={tweet}
                onChange={handleTweetChange} 
            />
            <button type="submit">Tweet</button>
        </form>;
}

export default TweetPoster;