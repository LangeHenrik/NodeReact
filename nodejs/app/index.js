const express = require('express');
//const bodyParser = require('body-parser');
const Tweet = require('./seq');
const path = require('path');

const socket = require('socket.io');

const app = express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

const port = 3000;
 
app.use('/', 
    express.static(path.join(
        __dirname, 
        '..',
        '..',
        'react',
        'react-tutorial',
        'dist'
        ))
);

app.get(
    '/',
    (req, res) => {
        res.sendFile(path.join(__dirname,
            '..',
            '..',
            'react',
            'react-tutorial',
            'dist',
            'index.html'
            ));
    }
);

app.get(
    '/frontend',
    (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'frontend.js'));
    }
);

const server = app.listen(
    port,
    () => console.log(`App listening on localhost:${port}!`)
);

const io = socket(server);

app.post(
    '/tweets',
    (req, res) => {
        try {
            const text = req.body.text;
            console.log(text + ' ');
            Tweet.create({user_id: 1, tweet: text});
            io.emit('hello', '{"status": "ok"}');
            res.send(`{
                "status": "ok"
            }` );
        } catch (e) { 
            console.log(e);
            res.send(`{
                "status": "error"
            }` );
        }
        
    }
);

app.get(
    '/tweets',
    (req, res) => {
        const tweets = Tweet.findAll()
            .then(tweets => {
                console.log(tweets);
                res.json(tweets);
            });
    }
);

app.put(
    '/tweets',
    (req, res) => res.send('PUT Hello World!')
);

app.delete(
    '/tweets',
    (req, res) => res.send('DELETE Hello World!')
);



