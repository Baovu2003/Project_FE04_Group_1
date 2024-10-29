

module.exports.generateToken =(length) => {
    
const characters = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let token = "";
for (let index = 0; index < length; index++) {
    token += characters.charAt(Math.floor(Math.random()*characters.length));
    
}
  return token;

}

