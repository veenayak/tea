const config = {
    development: {
        //url to be used in link generation
        url: 'http://127.0.0.1/',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'tea',
            user: encodeURIComponent("tea"),
            pwd: encodeURIComponent("awesomeTea@2021#")
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '8081'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://127.0.0.1/',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'tea',
            user: encodeURIComponent("tea"),
            pwd: encodeURIComponent("awesomeTea@2021#")
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '8081'
        }
    }
};
module.exports = config;
