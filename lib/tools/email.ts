// tools/send-email.ts
import { tool } from 'ai';
import { z } from 'zod';
import nodemailer from 'nodemailer';

export const sendEmail = tool({
  
  description: 'Send an email to a specified recipient',
  parameters: z.object({
    to: z.string().describe('Recipient email address'),
    subject: z.string().describe('Email subject line'),
    body: z.string().describe('Plain text body of the email'),
    html: z.string().describe('HTML content of the email'),
  }),
  execute: async ({ to, subject, body, html }) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "santup205@gmail.com", // set in your .env file
        pass: "ijsh ybkm wikw dddi", // set in your .env file
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body,
        html,
      });

      return {
        success: true,
        message: 'Email sent successfully.',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to send email.',
      };
    }
  },
});
