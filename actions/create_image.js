// Function to create an image from HTML
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const path = require("path");


module.exports = async function (req) {

    // Get the parameters from the request
    const { template } = req.query;

    // Default response
    let response = '';

    // Get the HTML template
    if (template === "payment_qr") {

        // Get QR data 
       // const { name, amount, upi_id, qr_code } = req.body;

        // Get html file from templates/payment_qr/render.html
        const html = fs.readFileSync(appRoot + '/templates/payment_qr/render.html', 'utf8');

        const footer_imgs = fs.readFileSync(appRoot + '/templates/payment_qr/payment_apps.png');
        const base64Image = new Buffer.from(footer_imgs).toString('base64');
        const footer_logos = 'data:image/jpeg;base64,' + base64Image;

        // Create the image
         response = await nodeHtmlToImage({
            html: html,
            quality: 100,
            type: 'jpeg',
            content: {
                name: 'Vamsi J',
                amount: '1000',
                upi_id: '8908080821@paytm',
                qr_code: 'https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=upi%3A%2F%2Fpay%3Fpa%3Dvamsi%2540okicici%26pn%3DVamsi%2520J%26mc%3D%26tr%3D%26tn%3D%26am%3D1000%26cu%3DINR%26url%3D',
                footer_credits: footer_logos
            }
        })

    }


    // Return the response
    return response;
}

