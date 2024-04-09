import { useState } from "preact/hooks";
import styles from '@/shared/styles/ContactForm.module.css';
import { Resend } from 'resend';
import { getI18N } from "@/shared/i18n";
import EmailTemplate from '@/en/email-template/EmailTemplate';
import CompanyEmailTemplate from '@/en/email-template/CompanyEmailTemplate';

interface FormButtonProps {
  type?: 'submit' | 'reset' | 'button';
  text: string;
  formId: string;
  language: string;
  [key: string]: any;
}

export default function FormButton({type = 'submit', text, formId, language, ...props}: FormButtonProps) {
  const [responseMessage, setResponseMessage] = useState('');
  const [status, setStatus] = useState(0 as 200 | 400);
  const [loading, setLoading] = useState(false);
  const i18n = getI18N({ language });

  const apiKey = 're_848tb1So_PpssHN3WGekWfE2we6GPVFyo';
  const resend = new Resend(apiKey);

  const resetForm = () => {
    const form = document.getElementById(formId) as HTMLFormElement;
    form.reset();
  }

  const onClick = async () => {
    setLoading(true);
    const form = new FormData(document.getElementById(formId) as HTMLFormElement);
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

    if (!name || !email || !message || !country || !phone || !subject) {
      setResponseMessage(i18n.CONTACT_FORM.ERROR);
      setStatus(400);
    } else {
      resend.emails.send({
        from: 'PorticoSport <clientes@porticogestion.com>',
        to: [email],
        subject: title,
        // react: EmailTemplate({ title, language, content1, content2 }),
        html: '<strong>Hola</strong>'
      });
    
      // Sending email to the company
      resend.emails.send({
        from: 'PorticoSport <clientes@porticogestion.com>',
        to: ['clientes@porticogestion.com'],
        subject: `<${name}> ${subject}`,
        // react: CompanyEmailTemplate({ language, page, name, subject, email, phone, country, message }),
        html: '<strong>Hola</strong>'
      });
      setResponseMessage(i18n.CONTACT_FORM.SUCCESS);
      setStatus(200);
      setTimeout(() => {
        setResponseMessage('');
      }, 15000);
      resetForm();
    }
    setLoading(false);
  }

  return (
    <>
      <button
        {...props}
        disabled={loading}
        onClick={() => onClick()}
        type={type}
        class={`w-fit text-lg font-medium no-underline px-5 py-3 border border-solid border-white rounded-full uppercase ${styles['form-button']}`}
      >
        {loading ? 'Loading...' : text}
      </button>
      {responseMessage && <div class={`my-4 p-4 rounded-xl border ${status === 200 ? 'bg-green-500' : ''} ${status === 400 ? 'bg-red-500' : ''}`}>{responseMessage}</div>}
    </>
  );
}