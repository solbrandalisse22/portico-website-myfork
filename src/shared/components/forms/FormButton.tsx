import { useState } from "preact/hooks";
import styles from '@/shared/styles/ContactForm.module.css';

interface FormButtonProps {
  type?: 'submit' | 'reset' | 'button';
  text: string;
  formId: string;
  termsError?: string;
  size?: 'mini' | 'normal';
  [key: string]: any;
}

export default function FormButton({type = 'button', text, formId, termsError = "You must accept the terms and conditions", size = 'normal', ...props}: FormButtonProps) {
  const [responseMessage, setResponseMessage] = useState('');
  const [status, setStatus] = useState(0 as 200 | 400);
  const [loading, setLoading] = useState(false);


  const resetForm = () => {
    const form = document.getElementById(formId) as HTMLFormElement;
    form.reset();
  }

  const onClick = async () => {
    setLoading(true);
    const formElement = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(formElement);
    const termsCheckbox = formElement.querySelector('[name="terms"]') as HTMLInputElement;
    if (termsCheckbox && !termsCheckbox.checked) {
      setResponseMessage(termsError);
      setStatus(400);
      setLoading(false);
      return;
    }
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
      setStatus(data.status);
    }
    resetForm()
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
        class={`w-fit ${size === 'mini' ? 'text-base px-3 py-2' : 'text-lg px-5 py-3' } font-medium no-underline border border-solid border-white rounded-full uppercase ${styles['form-button']}`}
      >
        {loading ? 'Loading...' : text}
      </button>
      {responseMessage && <div class={`${size === 'mini' ? 'my-2 p-2 text-sm' : 'my-4 p-4 text-base'} rounded-xl border ${status === 200 ? 'bg-green-500' : ''} ${status === 400 ? 'bg-red-500' : ''}`}>{responseMessage}</div>}
    </>
  );
}