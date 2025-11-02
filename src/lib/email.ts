import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = process.env.EMAIL_FROM || 'Tashna Eyewear <noreply@tashnaeyewear.com>';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@tashnaeyewear.com';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

export async function sendOrderConfirmationEmail(orderData: any) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Confirmed!</h1>
      <p>Thank you for your order at Tashna Eyewear.</p>
      <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
      <p><strong>Total:</strong> PKR ${orderData.total}</p>
      <p>We will process your order shortly and keep you updated.</p>
      <p>Best regards,<br>Tashna Eyewear Team</p>
    </div>
  `;

  return sendEmail({
    to: orderData.shippingEmail,
    subject: `Order Confirmed - ${orderData.orderNumber}`,
    html,
  });
}

export async function sendOrderStatusEmail(orderData: any) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Status Update</h1>
      <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
      <p><strong>Status:</strong> ${orderData.status}</p>
      ${orderData.trackingNumber ? `<p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>` : ''}
      <p>Best regards,<br>Tashna Eyewear Team</p>
    </div>
  `;

  return sendEmail({
    to: orderData.shippingEmail,
    subject: `Order ${orderData.orderNumber} - ${orderData.status}`,
    html,
  });
}

export async function sendWelcomeEmail(userData: any) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Tashna Eyewear!</h1>
      <p>Hi ${userData.name},</p>
      <p>Thank you for creating an account with us. We're excited to have you!</p>
      <p>Start shopping for premium eyewear at <a href="${process.env.NEXT_PUBLIC_APP_URL}">${process.env.NEXT_PUBLIC_APP_URL}</a></p>
      <p>Best regards,<br>Tashna Eyewear Team</p>
    </div>
  `;

  return sendEmail({
    to: userData.email,
    subject: 'Welcome to Tashna Eyewear!',
    html,
  });
}

export async function sendNewOrderAdminEmail(orderData: any) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">New Order Received</h1>
      <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
      <p><strong>Customer:</strong> ${orderData.shippingName}</p>
      <p><strong>Email:</strong> ${orderData.shippingEmail}</p>
      <p><strong>Total:</strong> PKR ${orderData.total}</p>
      <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
      <p>Please process this order at your earliest convenience.</p>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Order - ${orderData.orderNumber}`,
    html,
  });
}
