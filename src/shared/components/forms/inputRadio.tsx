import styles from '@/shared/styles/ContactForm.module.css';

interface InputTextProps {
  name: string;
  label: string;
  value?: string;
  props?: any;
  className?: string;
  required?: boolean;
  size?: 'mini' | 'normal';
  linkUrl: string;
  linkText: string;
  [key: string]: any;
}

export default function InputText({name, label, value, className, required, linkUrl, linkText, size = 'normal', ...props}: InputTextProps) {
  return (
    <div class={`flex items-center ${size === 'mini' ? 'mb-3' : 'mb-5'}`}>
      <label class={`relative flex items-center p-3 rounded-full cursor-pointer`} htmlFor={name}>
        <input type="checkbox" name={name} id={name}
          required
          class={`before:content[''] peer relative ${size === 'mini' ? 'h-5 w-5' : 'h-8 w-8'} cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-black/60 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-black/60 checked:before:bg-black/60 hover:before:opacity-10 hover:before:border-primary`} />
        <span
          class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" stroke-width="1">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </span>
      </label>
      <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="link">
        <p class="flex font-sans gap-1 text-base antialiased font-medium leading-relaxed text-blue-gray-900 mb-0">
          {label}
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" aria-label="Learn more about cookies"
            class="block font-sans text-base antialiased font-medium leading-relaxed transition-colors text__glowing">
            {linkText}
          </a>
          .
        </p>
      </label>
    </div>
  );
}
