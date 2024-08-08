import nodemailer from "nodemailer";
import ejs from 'ejs';
import path from "path";

const transporter = nodemailer.createTransport({
  service: "Zoho",
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "muhammadrezayanuarhamdani47@gmail.com",
    pass: "fVR$Grcb2p8!$z6",
  },
  requireTLS: true,
});

const send = async ({
  to,
  subject,
  content,
}: {
  to: string | string[],
  subject: string;
  content: string;
}) => {
  const result = await transporter.sendMail({
    from: "muhammadrezayanuarhamdani47@zohomail.com",
    to,
    subject,
    html: content,
  });

  return result;
};

const render = async (template: string, data: any) => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    data
  );

  return content as string;
};

const sendInvoiceEmail = async (to: string, order: any, customerName: string) => {
  const content = await render('invoice.ejs', {
    orderItems: order.orderItems,
    grandTotal: order.grandTotal,
    customerName,
    contactEmail: 'newbie@gmail.com', // Replace with your support email
    companyName: 'Newbie Store', // Replace with your company name
    year: new Date().getFullYear(),
  });

  return send({
    to,
    subject: 'Your Invoice',
    content,
  });
};

export default {
  send,
  render,
  sendInvoiceEmail,
};
