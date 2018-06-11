import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: '*'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.set('root', __dirname);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
});

export default app;