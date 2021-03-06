const http = require('http');

 function loadUrl(url) {
  return new Promise( function(resolve, reject) {

    http.get(url,  function(res) {
      if (res.statusCode != 200) { // ignore 20x and 30x for now
        reject(new Error(`Bad response status ${res.statusCode}.`));
        return;
      }

      let body = '';
      res.setEncoding('utf8');
      res.on('data',  function(chunk) {
        body += chunk;
      });
      res.on('end',  function() {
        resolve(body);
      });

    }) // ENOTFOUND (no such host ) or ECONNRESET (server destroys connection)
      .on('error', reject);
  });
}


Promise.all([

  loadUrl('http://www.newsru.com2').catch(err => err),
  loadUrl('http://javascript.ru').catch(err => err),
  loadUrl('http://learn.javascript.ru').catch(err => err)

]).then( function(results) { // [err, res1, res2]

  console.log(results.map( html => (html.slice ? html.slice(0,80) : html) ));

}).catch(console.log);
