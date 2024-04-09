import { useState } from "preact/hooks";
import styles from '@/shared/styles/ContactForm.module.css';

interface FormButtonProps {
  type?: 'submit' | 'reset' | 'button';
  text: string;
  formId: string;
  [key: string]: any;
}

export default function FormButton({type = 'submit', text, formId, ...props}: FormButtonProps) {
  const [responseMessage, setResponseMessage] = useState('');
  const [status, setStatus] = useState(0 as 200 | 400);
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const formData = new FormData(document.getElementById(formId) as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
      setStatus(data.status);
    }
    setLoading(false);
    if (data.status === 200) {
      setTimeout(() => {
        setResponseMessage('');
      }, 15000);
    }
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