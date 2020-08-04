const jwt = require('jsonwebtoken');

async function validateToken(token){
    // Right here we verify the token with the secretkey key
    return jwt.verify(token, 'something else', async function(err, authData) {
        if(err) {
            return null;
        } else {
            return authData;
        }
    });
}

async function generateToken(userDataPacket){
    /* this returns a new token encrypted with 'secretkey' with the information of userDataPacketJSON and expires in 3 hours*/
    return jwt.sign({userDataPacket}, 'something else', {expiresIn:'3hr'});
}

module.exports = {
    validateToken,
    generateToken
};