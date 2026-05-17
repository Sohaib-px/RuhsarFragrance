import nodemailer from 'nodemailer'

interface CartItem {
  product: {
    name: string
    size?: string
    contents?: string
    price: number
    discountedPrice?: number
    image?: string
    label?: string
  }
  quantity: number
}

interface OrderData {
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  cartItems: CartItem[]
  total: number
  date: string
}

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json()

    const { customer, cartItems, total, date } = orderData

    if (!customer.name || !customer.email || !customer.phone || !customer.address || !cartItems.length) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 1,
      maxMessages: 5,
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    })

    const itemsHtml = cartItems.map(item => `
      <tr style="border-bottom: 1px solid #ddd; padding: 8px 0;">
        <td style="padding: 8px;">${item.product.name} ${item.product.size || item.product.contents || ''}</td>
        <td style="padding: 8px;">${item.quantity}</td>
        <td style="padding: 8px;">PKR ${((item.product.discountedPrice || item.product.price) * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('')

    const mailOptions = {
      from: customer.email,
      to: 'ruhsarfragrancepk@gmail.com',
      subject: `New Order #${Date.now()} from ${customer.name} - PKR ${total.toLocaleString()}`,
      html: `
        <h2>New Order Confirmation</h2>
        <p><strong>Date:</strong> ${date}</p>
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        
        <h3>Order Items:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f5f1e8; color: #0b0b0b;">
              <th style="padding: 12px; text-align: left;">Product</th>
              <th style="padding: 12px; text-align: center; width: 80px;">Qty</th>
              <th style="padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <h3>Total: PKR ${total.toLocaleString()}</h3>
        <p>Reply to this email to confirm/ship.</p>
      `,
      replyTo: customer.email,
    }

    await transporter.sendMail(mailOptions)

    return Response.json({ success: true, message: 'Order email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Order email error:', error)
    return Response.json({ error: 'Failed to send order email' }, { status: 500 })
  }
}
