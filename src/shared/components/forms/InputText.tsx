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
  size?: 'mini' | 'normal';
  props?: any;
  className?: string;
  required?: boolean;
  [key: string]: any;
}

export default function InputText({name, type = 'text', label, placeholder, value, className, required, size = 'normal', ...props}: InputTextProps) {
  return (
    <div class={`${size === 'mini' ? 'mb-3' : 'mb-5'} ${className}`}>
      <label for={name} class={`block font-medium ${size === 'mini' ? 'mb-2 pl-1 text-sm' : 'mb-3 pl-2 text-base'}`}>
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
        class={`w-full rounded-full border bg-white ${size === 'mini' ? 'py-2 px-4 text-sm' : 'py-3 px-6 text-base'} font-medium text-[#6B7280] focus:border-primary focus:ring-2 focus:ring-primary outline-none autofill:bg-black/30 valid:bg-black/60 valid:text-white valid:border-primary`}
      />
    </div>
  );
}
