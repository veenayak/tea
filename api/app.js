const express = require("express");
const app = express();
const routes = require('./routes/route');
app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:3001', 'http://localhost:3001'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});
app.use(express.json({limit: '50mb'}));

app.use('/', routes);
app.use('/uploads', express.static(__dirname +'/uploads'));

const PORT = process.env.PORT || 8081;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));