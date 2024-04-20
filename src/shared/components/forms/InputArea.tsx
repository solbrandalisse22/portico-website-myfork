interface InputAreaProps {
  name: string;
  label: string;
  placeholder: string;
  size?: 'mini' | 'normal';
  rows?: number;
  value?: string;
  required?: boolean;
  [key: string]: any;
}

export default function InputAreaProps({name, label, placeholder, value, rows = 4, required, size = 'normal', ...props}: InputAreaProps) {
  return (
    <div class={`${size === 'mini' ? 'mb-3' : 'mb-5'}`}>
      <label for={name} class={`${size === 'mini' ? 'mb-2 pl-1 text-sm' : 'mb-3 pl-2 text-base'} block  font-medium`}>
        {label}
      </label>
      <textarea
        {...props}
        rows={rows}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        class={`w-full resize-none border bg-white ${size === 'mini' ? 'py-2 px-4 text-sm rounded-2xl' : 'py-3 px-6 text-base rounded-3xl'} font-medium text-[#6B7280] focus:border-primary focus:ring-2 focus:ring-primary outline-none autofill::bg-black/30 valid:bg-black/60 valid:text-white valid:border-primary`}
      >{value}</textarea>
    </div>
  );
}
