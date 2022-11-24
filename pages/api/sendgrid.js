import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function Order(req, res) {

   try {
     await sendgrid.send({
       to: process.env.RECEIVER_EMAIL, // Your email where you'll receive emails
       from: process.env.SENDER_EMAIL, // your website email address here
       subject: `Order  `,
       html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
       <html lang="en">
       <head>
         <meta charset="utf-8">

         <title>The HTML5 Herald</title>
         <meta name="description" content="The HTML5 Herald">
         <meta name="author" content="SitePoint">
       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
       <link rel="stylesheet" href="css/styles.css?v=1.0">
     </head>

     <body>
       <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
             </div>
             <div class="container" style="margin-left: 20px;margin-right: 20px;">
             <h3>Ypu have an order from ${req.body.fullname}, with e-mail: ✉️${req.body.email} and phone number ${req.body.phone}</h3>
             <div style="font-size: 16px;">
             <p>Order</p>
             <p>${req.body.message}</p>
             <br>
               </div>
       </body>
       </html>`,
    });
   } catch (error) {
   console.log(error);
     return res.status(error.statusCode || 500).json({ error: error.message });
   }

  return res.status(200).json({ error: "" });
}

export default Order;