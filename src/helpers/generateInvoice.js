// const puppeteer = require("puppeteer");
// const nodemailer = require("nodemailer");
// const { s3Client } = require("../middlewares/multer.js"); // Use the Linode-configured s3Client
// const companyModel = require("../models/commpanyModelV2.js");
// const businessModel = require("../models/businessModel.js");
// const advertisementModel = require("../models/advertisementModel.js");
// const adsDetailModel = require("../models/adsDetailModel.js");
// const invoiceModel = require("../models/invoiceModel.js");

// const generateInvoiceNumber = async () => {
//     try {
//         const count = await adsDetailModel.countDocuments();
//         const nextInvoiceNumber = count + 1;
//         return nextInvoiceNumber.toString().padStart(3, '0');
//     } catch (error) {
//         throw new Error("Failed to generate invoice number: " + error.message);
//     }
// };

// const generateInvoice = async (businessId, facebookBudget, instaBudget, googleBudget, addTypeId ) => {
//     // const { businessId, facebookBudget, instaBudget, googleBudget, addTypeId } = req.body;

//     try {
//         // Input validation
//         if (!businessId || !addTypeId) {
//             return res.status(400).json({ success: false, message: "Missing required fields: businessId and addTypeId are required" });
//         }

//         // Fetch data with error handling
//         const companyData = await companyModel.findOne();
//         if (!companyData) throw new Error("Company data not found");

//         const businessData = await businessModel.findById(businessId);
//         if (!businessData) throw new Error("Business not found");

//         const advertismentData = await advertisementModel.findById(addTypeId);
//         if (!advertismentData) throw new Error("Advertisement type not found");

//         // Calculate amounts
//         const fbBudget = Number(facebookBudget) || 0;
//         const inBudget = Number(instaBudget) || 0;
//         const gBudget = Number(googleBudget) || 0;
//         const Amount = fbBudget + inBudget + gBudget;
//         const GST = "18%";
//         const totalAmount = Amount + (Amount * 0.18);

//         const date = new Date().toISOString().split("T")[0];
//         const invoiceNumber = await generateInvoiceNumber();

//         // HTML Content
//         const htmlContent = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Invoice</title>
//             <style>
//                 body { font-family: Arial, sans-serif; margin: 10px; padding: 0; background-color: #fff; display: flex; flex-direction: column; align-items: center; width: 100vw; }
//                 .label-container { display: flex; border: 3px solid black; padding: 10px; width: 90vw; max-width: 1200px; height: auto; }
//                 .left-section { width: 60%; padding: 10px; border-right: 3px solid black; }
//                 .right-section { width: 40%; padding: 10px; position: relative; }
//                 .right-section img { position: absolute; right: 21px; top: 75px; }
//                 .cod-section { font-size: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
//                 .product-details { width: 90vw; max-width: 1200px; margin-top: 10px; border: 3px solid black; padding: 10px; }
//                 table { width: 100%; border-collapse: collapse; }
//                 th, td { border: 2px solid black; padding: 8px; text-align: center; }
//                 th { font-weight: bold; background-color: #f2f2f2; }
//                 .invoice-container { width: 90vw; max-width: 1200px; border: 3px solid black; padding: 15px; margin-top: 10px; }
//                 .invoice-title { text-align: center; font-size: 20px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 5px; background-color: #f2f2f2; }
//                 .invoice-details { display: flex; justify-content: flex-start; padding: 10px 0; font-size: 14px; border: 2px solid black; }
//                 .seller-info { width: 48%; padding: 10px; }
//             </style>
//         </head>
//         <body>
//             <div class="label-container">
//                 <div class="left-section">
//                     <div class="customer-address">
//                         <p><strong>${companyData?.name || 'N/A'}</strong></p>
//                         <p>${process.env.COMPANY_ADDRESS || companyData.address || 'N/A'}</p>
//                     </div>
//                     <hr style="border: 3px solid blue;">
//                     <div class="return-address">
//                         <p style="font-weight: 900;"><strong>${businessData.businessName || 'N/A'}</strong></p>
//                         <p>${businessData.address || 'N/A'}</p>
//                     </div>
//                 </div>
//                 <div class="right-section">
//                     <div class="cod-section">
//                         <img src="${companyData.logo || ''}" alt="QR Code" class="qr-code" height="100px" width="100px" onerror="this.style.display='none'">
//                         <div><strong>${invoiceNumber}</strong></div>
//                         <div>Date: <strong>${date}</strong></div>
//                     </div>
//                 </div>
//             </div>
//             <div class="product-details">
//                 <h1 style="font-weight: bold; font-size: 20px;">Product Details</h1>
//                 <table>
//                     <tr>
//                         <th>Type</th>
//                         <th>Insta Budget</th>
//                         <th>Facebook Budget</th>
//                         <th>Google Budget</th>
//                         <th>Advertisement ID</th>
//                     </tr>
//                     <tr>
//                         <td>${advertismentData?.advertisementType || 'N/A'}</td>
//                         <td>${inBudget}</td>
//                         <td>${fbBudget}</td>
//                         <td>${gBudget}</td>
//                         <td>${addTypeId}</td>
//                     </tr>
//                 </table>
//             </div>
//             <div class="invoice-container">
//                 <h2 class="invoice-title">TAX INVOICE</h2>
//                 <div class="invoice-details">
//                     <div class="seller-info">
//                         <p><strong>Amount:</strong> ${Amount.toFixed(2)}</p>
//                         <p><strong>GST:</strong> ${GST}</p>
//                         <p>Total Amount: <strong>${totalAmount.toFixed(2)}</strong></p>
//                     </div>
//                 </div>
//             </div>
//         </body>
//         </html>
//         `;

//         // Generate PDF
//         const browser = await puppeteer.launch({
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//             headless: true
//         });
//         const page = await browser.newPage();
//         await page.setContent(htmlContent, { waitUntil: "load" });
//         const pdfBuffer = await page.pdf({ format: "A4" });
//         await browser.close();

//         // Upload PDF to Linode Object Storage
//         const s3UploadParams = {
//             Bucket: process.env.LINODE_OBJECT_BUCKET || "leadkart",
//             Key: `invoices/invoice-${Date.now()}.pdf`,
//             Body: pdfBuffer,
//             ContentType: "application/pdf",
//             ACL: "public-read",
//         };

//         const uploadedFile = await s3Client.upload(s3UploadParams).promise();
//         const invoiceUrl = uploadedFile.Location || `https://${process.env.LINODE_OBJECT_BUCKET}.${process.env.LINODE_OBJECT_STORAGE_ENDPOINT}/${s3UploadParams.Key}`;

//         // Send Email
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: "shlok24cs114@satiengg.in",
//             subject: "Your Invoice",
//             text: "Please find the attached invoice.",
//             attachments: [{
//                 filename: "Invoice.pdf",
//                 content: pdfBuffer,
//                 contentType: 'application/pdf'
//             }],
//         };
        

//         await transporter.sendMail(mailOptions);

//         console.log("Invoice sent successfully");
//         const total = facebookBudget+instaBudget+googleBudget;
//         const commision = (parseInt(Amount) *10) / 100;

//           const data = await new invoiceModel({
//             addAmount :parseInt(Amount),
//             commisionAmount: commision,
//             GST:GST,
//             userId : businessData.userId,
//             businessId: businessId,
//             adTyId:addTypeId,
//             invoiceURL:invoiceUrl
//         })

//         await data.save();
//         // return res.status(200).json({
//         //     success: true,
//         //     message: "Invoice generated and sent successfully!",
//         //     pdfUrl: invoiceUrl
//         // });

//     } catch (error) {
//         console.error("Error generating invoice:", error);
//         // return res.status(500).json({
//         //     success: false,
//         //     message: error.message || "Internal server error"
//         // });
//     }
// };

// module.exports = { generateInvoice };