import type { APIRoute } from "astro";
import { Resend } from 'resend';
import { getI18N } from "@/shared/i18n";
import EmailTemplate from '@/en/email-template/EmailTemplate';
import CompanyEmailTemplate from '@/en/email-template/CompanyEmailTemplate';

const language = 'en';
const i18n = getI18N({ language });

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const resend = new Resend(apiKey);
  const form = await request.formData();
  const name = form.get('name')?.toString() ?? '';
  const email = form.get('email')?.toString() ?? '';
  const message = form.get('message')?.toString() ?? '';
  const country = form.get('country')?.toString() ?? '';
  const phone = form.get('phone')?.toString() ?? '';
  const subject = form.get('subject')?.toString() ?? '';
  const page = form.get('page')?.toString() ?? '';
  const title = i18n.CLIENT_SUBJECT_EMAIL.TITLE;
  const content1 = i18n.CLIENT_SUBJECT_EMAIL.CONTACT_EMAIL_1.replace('{name}', name);
  const content2 = i18n.CLIENT_SUBJECT_EMAIL.CONTACT_EMAIL_2;
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message || !country || !phone || !subject) {
    return new Response(
      JSON.stringify({
        message: i18n.CONTACT_FORM.ERROR,
        status: 400
      }),
    );
  }

  resend.emails.send({
    from: 'PorticoSport <clientes@porticogestion.com>',
    to: [email],
    subject: title,
    react: EmailTemplate({ title, language, content1, content2 }),
  });

  // Sending email to the company
  resend.emails.send({
    from: 'PorticoSport <clientes@porticogestion.com>',
    to: ['clientes@porticogestion.com'],
    subject: `<${name}> ${subject}`,
    react: CompanyEmailTemplate({ page, name, subject, email, phone, country, message, language }),
  });
  return new Response(
    JSON.stringify({
      message: i18n.CONTACT_FORM.SUCCESS,
      status: 200
    }),
  );
};