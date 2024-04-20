import { MailtrapClient } from "mailtrap";

const sendEmail = async (options) => {
  const TOKEN = "e4638073e23e5310f4d1a13bf117b727";
  const ENDPOINT = "https://send.api.mailtrap.io/";

  const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

  const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "SwiftCart",
  };

  const recipients = [
    {
      email: options.email,
    },
  ];

  const mailOptions = {
    from: sender,
    to: recipients,
    subject: options.subject,
    text: options.message,
    category: "Password Reset", // Assuming you want to categorize these emails
  };

  try {
    await client.send(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
