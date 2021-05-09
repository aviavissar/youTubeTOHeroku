const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "avissarmarketing@gmail.com",
    subject: `welcome ${name}`,
    text: `hi ${name} i hope its will be great`,
  });
};

const sendMail = (email, name, attachment) => {
  sgMail.send({
    to: email,
    from: "avissarmarketing@gmail.com",
    subject: ` ${name} here is your list file `,
    text: `hi ${name} i hope you will came back`,
    attachments: [
      {
        content: attachment,
        filename: "youTubelist.json",
        type: "application/json",
        disposition: "attachment",
      },
    ],
  });
};

module.exports = {
  sendWelcomeMail,
  sendMail,
};
