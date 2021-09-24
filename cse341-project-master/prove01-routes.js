const fs = require('fs');     // imported for writing files 

const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  if(url === '/') {
    response.write('<html><body>');
    response.write('<h1>Please create a user.</h1>');
    response.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>');
    response.write('</body></html>');
    response.end();
  } 

  if(url === '/users') {

    fs.readFile('users.txt', 'utf8', (err, data) => {
      if(err) { 
        throw err;
      }
      response.write('<html><body><ul>');
      response.write(data);
      response.write('</body></html></ul>');
      response.end();
    });
  }

  if(url === '/create-user' && method === 'POST') {
    const body = [];  
    request.on('data', (chunk) => { // 'chunk' is a chunk of data in the data stream.
      body.push(chunk);
    });

    request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
      console.log(user);
      fs.appendFile('users.txt', `<li>${user}</li>`, (err) => {
        if(err) { 
          throw err;
        }
      });

      response.statusCode = 302;
      response.setHeader('Location', '/');
      return response.end();
    });
    

    // return request.on('end', () => {
    //   const parsedBody = Buffer.concat(body).toString();
    //   const user = parsedBody.split('=')[1]; 

    //   fs.writeFile('message.txt', user, (err) => {
    //     response.statusCode = 302;
    //     response.setHeader('Location', '/');
    //     return response.end();
    //   });
    // });
  } 

 
  
  // response.setHeader('Content-Type', 'text/html');
  // response.write('<html>');
  // response.write('<body><h1>Hello World</h1></body>');
  // response.write('</html>');
  // response.end();
}

module.exports = requestHandler;

// ALSO VIABLE CODE 
// exports.handler = requestHandler;
// exports.someText = 'Some text.';

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text.';

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some text.'
// }