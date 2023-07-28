const forgotPasswordMailer = (user, link) => {
  return `<h2> Hello ${user.username}</h2>
<p>Here's the link to reset your password:</p>
<a href=${link}>Reset password</a>`;
};

// sendMail('oseughu@gmail.com', 'greetings my best friend', greetingMailer(req.body.username))
export default forgotPasswordMailer;
