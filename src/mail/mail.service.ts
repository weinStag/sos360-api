import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendMail(to: string, subject: string, content: string) {
        try {
            const response = await this.resend.emails.send({
                from: process.env.EMAIL_FROM || 'onboarding@resend.dev', // Usa email validado
                to,
                subject,
                html: content,
            });

            console.log(`✅ Resend Response:`, response); // Log da resposta
            console.log(`✅ Email enviado para ${to}`);
        } catch (error) {
            console.error(`❌ Falha ao enviar email para ${to}:`, error.response?.data || error.message);
            throw new Error('Falha ao enviar email.');
        }
    }
}
