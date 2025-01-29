import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Email do remetente
                pass: process.env.EMAIL_PASS, // Senha ou token do remetente
            },
        });
    }

    async sendMail(to: string, subject: string, content: string) {
        try {
            // Input que deve ser recebido pelo front end
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER, // Endereço do remetente
                to,                           // Endereço do destinatário
                subject,                      // Assunto do email
                html: content,                // Conteúdo do email 
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Failed to send email to ${to}:`, error);
            throw new Error('Failed to send email.');
        }
    }
}