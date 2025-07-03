import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";
// import { projectUpdate } from 'next/dist/build/swc/generated-native';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(email, emailType, userId, hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 60 * 60 * 1000, // 60 minutes
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 60 * 60 * 1000, // 60 minutes
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "aadijaintikamgarh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your account" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your account" : "reset your password"
      }.
        or copy paste the link below in to your browser <br> ${
          process.env.domain
        }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Something went wrong : ", error.message);
    throw new Error("Email not sent");
  }
};
