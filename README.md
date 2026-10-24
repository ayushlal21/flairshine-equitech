# Flairshine Equitech Pvt Ltd

A professional financial services website for Flairshine Equitech Pvt Ltd, specializing in stock market investments, mutual funds, and real estate services.

## Features

- Responsive design optimized for all devices
- Contact form with email integration
- Professional service showcase
- Modern UI/UX design

## Email Integration Setup

The contact form supports multiple email integration methods:

### Option 1: EmailJS (Recommended)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Replace the following in `scripts/main.js`:
   - `YOUR_PUBLIC_KEY` with your EmailJS public key
   - `YOUR_SERVICE_ID` with your service ID
   - `YOUR_TEMPLATE_ID` with your template ID

### Option 2: Web3Forms
1. Sign up at [Web3Forms](https://web3forms.com/)
2. Get your access key
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `scripts/main.js`
4. Uncomment the Web3Forms integration code

### Option 3: Mailto (Fallback)
Currently implemented as fallback - opens user's email client

## Setup Instructions

1. Clone the repository
2. Choose your email integration method (see above)
3. Update the configuration in `scripts/main.js`
4. Deploy to your web server

## Contact Information

- **Phone**: 888 4921 090
- **Email**: flairshineequitech@gmail.com
- **Address**: 1st Floor, Above SBI ATM, Radium road Ranchi - 834001, Jharkhand

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- EmailJS for email integration
- Responsive design principles
