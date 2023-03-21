import { useState, useEffect } from 'react';

type Tweet = {
    tweet_id: number;
    name: string;
    timestamp: string;
    tweet: string;
}



function Tweet ({tweet, isActive, onClick}: {tweet: Tweet, isActive: boolean, onClick: () => void}) {

    
    return (
    <div className="row">
        <div className="col">
            <div 
                className={
                    isActive
                     ? "card tweet active"
                     : "card tweet"
            }
            key={tweet.tweet_id}
            onClick={onClick}
            >
                <div className="card-header">
                    <h5 className="card-title">Name: {tweet.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Timestamp: {tweet.timestamp}</h6>
                </div>
                <div className="card-body">
                    <p className="card-text">Tweet: {tweet.tweet}</p>
                    <a href="#" className="card-link">LikeCard</a>
                    <a href="#" className="card-link">Dislike</a>
                </div>
            </div>
        </div>
    </div>
    );
}

function TweetList () {

    const [tweetList, setTweetList] = useState<Tweet[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect (() => {
            async function loadTweets() {
                const response = await fetch('/tweets');
                const tweets = await response.json();
                setTweetList(tweets);
                console.log(tweets);
            }
            loadTweets();
        }, []);
    
    if(tweetList.length === 0 ) {
        return <div>Loading...</div>
    }

    return (
        <>
            {tweetList.map((tweet, index) => (
                <Tweet 
                    tweet={tweet} 
                    key={tweet.tweet_id}
                    isActive = {tweet.tweet_id === activeIndex}
                    onClick = {() => setActiveIndex(tweet.tweet_id)}
                    />
            ))}
        </>
    );
}

export default TweetList;