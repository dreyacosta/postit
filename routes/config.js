var config = {
    domain: {
        host: 'http://localhost',
        port: '3001'
    },
    blogName: 'postit',
    blogDescription: 'Small lightweight and real-time system blogging',
    mongodb: {
        credentials: '', // username:password@
        host: 'localhost',
        port: ':27017', // :port
        dbName: 'blogio'
    },
    url: {
        getUrlConfig: '/config',
        blogHome: '/demo',
        admin: {
            index: '/admin'
        },
        api: {
            articles: '/articles',
            users: '/users'
        },
        blog: {
            post: '/post',
            page: '',
            category: '/category',
            tag: '/tag'
        }
    }
};

module.exports = config;