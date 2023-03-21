const Sequelize = require('sequelize');

const sequelize = new Sequelize (

    'twitter', // database
    'root', // user
    'root', // password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const Tweet = sequelize.define('tweet', {
    tweet_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tweet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

(
    async () => {
        await sequelize.sync({force: false});
        //await Tweet.create({user_id: 1, tweet: 'Hello Sequelize!'});
        const tweets = await Tweet.findAll();
        console.log(tweets.map(tweet => tweet.toJSON()));
    }
)(); 

module.exports = Tweet;