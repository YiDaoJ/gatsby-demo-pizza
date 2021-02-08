const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>We will have your order ready in the next 20 minutes.</p>
      <ul>
        ${order
          .map(
            (item) => `
            <li>
              <img src="${item.thumbnail}" alt="${item.name}" />
              ${item.size} ${item.name} - ${item.price}
            </li>
          `
          )
          .join('')}
      </ul>
      <p>Your total is ${total} due at pickup.</p>
    </div>
  `;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log('body: ', body);
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  // send the email
  for (const field of requiredFields) {
    console.log('check: ', field);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You are missing the ${field} field`,
        }),
      };
    }
  }

  // Send the success or error message

  // Test sending an email
  const info = await transporter.sendMail({
    from: 'Slick SLices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' }),
  };
};