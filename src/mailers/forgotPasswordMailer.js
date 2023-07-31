const forgotPasswordMailer = (user, code) => {
  return `<h2> Hello ${user.username}</h2>
<p>Here's the code to reset your password:</p>
<p><strong>${code}</strong></p>`;
};

export default forgotPasswordMailer;
