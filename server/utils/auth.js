const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function(req, res, next) {
    let token = req.header('Authorization');

    if (!token) {
      return req;
    }
  
    // ["Bearer", "<tokenvalue>"]
      token = token
        .split(' ')
        .pop()
        .trim();
  
        console.log(token);
  
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
  
    next();
  },
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
