const keys = require("../keys");
module.exports = function (email, token) {
  return {
      to: email,
      from: keys.EMAIL_FROM,
      subject: 'Password recovery',
      html: `
            <h1>Forgot password ?</h1>
            <p>If not - please ignore this email</p>
            <p>Or follow a link</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Recover password</a></p>
            <hr/>
            <a href="${keys.BASE_URL}">Courses store</a>
        `
  };
};