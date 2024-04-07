interface InputTextProps {
  type?: 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  props?: any;
  className?: string;
  required?: boolean;
  [key: string]: any;
}

export default function InputText({name, type = 'text', label, placeholder, value, className, required, ...props}: InputTextProps) {
  return (
    <div class={`mb-5 ${className}`}>
      <label for={name} class="mb-3 pl-2 block text-base font-medium">
        {label}
      </label>
      <input
        {...props}
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        required={required}
        class="w-full rounded-full border bg-white py-3 px-6 text-base font-medium text-[#6B7280] focus:border-primary focus:ring-2 focus:ring-primary outline-none autofill:bg-black/30 valid:bg-black/60 valid:text-white valid:border-primary"
      />
    </div>
  );
}
