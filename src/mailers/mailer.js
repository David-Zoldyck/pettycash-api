import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (to, subject, body) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.MAILER_FROM, // Use the email address or domain you verified above
    subject,
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
