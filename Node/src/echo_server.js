let http = require('http');
let url = require('url');


let server = new http.Server((req, rsp) => {
    let parsed = url.parse(req.url, true);
    console.log(parsed);

    rsp.setHeader('Cache-control', 'no-cache, no-store, must-revalidate');

    if (parsed.pathname.toLowerCase() === '/echo' && parsed.query.message)
        rsp.end(parsed.query.message);
    else {
        rsp.statusCode = 404;
        rsp.end("Page not found");
    }
});

console.log("Starting...");
server.listen(1337, '127.0.0.1');

