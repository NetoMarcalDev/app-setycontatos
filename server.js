import express from 'express'; 
import favicon from 'express-favicon';
import path from 'path';

const __dirname = path.resolve();
const port = process.env.PORT || 5100;
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function(req, res) {
   return res.send('pong');
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

