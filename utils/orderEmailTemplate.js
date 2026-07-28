const orderEmailTemplate = (order) => {

  const items = order.orderItems
    .map(item => `
      <tr>
        <td style="padding:8px;  border:1px solid #ddd;">
          ${item.name}
        </td>
        <td style="padding:8px;   border:1px solid #ddd;">
          ${item.qty}
        </td>
        <td style="padding:8px;    border:1px solid #ddd;">
          £${item.price}
        </td>
        <td style="padding:8px;   border:1px solid #ddd;">
          £${(item.qty * item.price).toFixed(2)}
        </td>
      </tr>
    `)
    .join("");

  return `
  <div style="font-family:Arial;  padding:20px;  background:#f7f7f7;">
    
    <div style="max-width:600px;  margin:auto;  background:white;  padding:20px;  border-radius:10px;">
      
     <h2 style="color:#333;">🛍 Order Confirmation</h2>

     <p> Hi ${order.shippingAddress.fullName},</p>

     <p> Thank you for your order! </p>

     <p> 
        <b>Order ID:</b> ${order._id}
     </p>

      <h3>Items</h3>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <th style="border:1px solid #ddd;padding:8px;">Product</th>
          <th style="border:1px solid #ddd;padding:8px;">Qty</th>
          <th style="border:1px solid #ddd;padding:8px;">Price</th>
          <th style="border:1px solid #ddd;padding:8px;">Total</th>
        </tr>

        ${items}
      </table>

      <h3 style="margin-top:20px;">
        Total Paid: £${order.totalPrice}
      </h3>

      <h3>Shipping Address</h3>

      <p>
        ${order.shippingAddress.fullName}<br/>
        ${order.shippingAddress.addressLine1}<br/>
        ${order.shippingAddress.city}<br/>
        ${order.shippingAddress.postalCode}<br/>
        ${order.shippingAddress.country}
      </p>

      <p style="margin-top:20px; color:green;">
        ✔ Payment Successful
      </p>

    </div>
  </div>
  `;
};

module.exports = orderEmailTemplate;









/*const orderEmailTemplate =
  (order) => {

    const items =
      order.orderItems
        .map(
          item => `
            <li>
              ${item.name}
              x ${item.qty}
              - £${item.price}
            </li>
          `
        )
        .join("");

    return `

      <h2>
        Thank you for your order
      </h2>

      <p>
        Order ID:
        ${order._id}
      </p>

      <p>
        Total:
        £${order.totalPrice}
      </p>

      <p>
        Payment:
        Paid ✅
      </p>

      <h3>
        Items Purchased
      </h3>

      <ul>
        ${items}
      </ul>

      <h3>
        Shipping Address
      </h3>

      <p>
        ${order.shippingAddress.fullName}
        <br/>
        ${order.shippingAddress.addressLine1}
        <br/>
        ${order.shippingAddress.city}
        <br/>
        ${order.shippingAddress.postalCode}
        <br/>
        ${order.shippingAddress.country}
      </p>

    `;
  };

module.exports =
  orderEmailTemplate;


  /**STRIPE_WEBHOOK_SECRET=whsec_123456789abcdefgh *
   



   return `
  <div style="font-family:Arial;padding:20px;background:#f7f7f7;">
    
    <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:10px;">
      
  <h2 style="color:#333;">🛍 Order Confirmation</h2>

      <p>Thank you for your order!</p>

      <p><b>Order ID:</b> ${order._id}</p>

      <h3>Items</h3>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <th style="border:1px solid #ddd;padding:8px;">Product</th>
          <th style="border:1px solid #ddd;padding:8px;">Qty</th>
          <th style="border:1px solid #ddd;padding:8px;">Price</th>
          <th style="border:1px solid #ddd;padding:8px;">Total</th>
        </tr>

        ${items}
      </table>

      <h3 style="margin-top:20px;">
        Total Paid: £${order.totalPrice}
      </h3>

      <h3>Shipping Address</h3>

      <p>
        ${order.shippingAddress.fullName}<br/>
        ${order.shippingAddress.addressLine1}<br/>
        ${order.shippingAddress.city}<br/>
        ${order.shippingAddress.postalCode}<br/>
        ${order.shippingAddress.country}
      </p>

      <p style="margin-top:20px;color:green;">
        ✔ Payment Successful
      </p>

    </div>
  </div>
  `;
};

module.exports = orderEmailTemplate;*/








