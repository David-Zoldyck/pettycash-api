import sgMail from "@sendgrid/mail";

const sendMail = async (to, subject, body) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: "ose.ughu@outlook.com", // Use the email address or domain you verified above
    subject,
    // text: "and easy to do anywhere, even with Node.js",
    html: body,
  };

  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

export default sendMail;
