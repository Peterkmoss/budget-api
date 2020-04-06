import https from 'https'
import app from './app'

const port = process.env.PORT || 3000;

const server = https.createServer(app);

server.listen(port);

console.log('Server running')