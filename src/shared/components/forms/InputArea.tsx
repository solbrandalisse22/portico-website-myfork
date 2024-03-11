interface InputAreaProps {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  value?: string;
  props?: any;
}

export default function InputAreaProps({name, label, placeholder, value, rows = 4, props}: InputAreaProps) {
  return (
    <div class="mb-5">
      <label for={name} class="mb-3 pl-2 block text-base font-medium">
        {label}
      </label>
      <textarea
        {...props}
        rows={rows}
        name={name}
        id={name}
        placeholder={placeholder}
        required
        class="w-full resize-none rounded-3xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] focus:border-primary focus:ring-2 focus:ring-primary outline-none autofill::bg-black/30 valid:bg-black/60 valid:text-white valid:border-primary"
      >{value}</textarea>
    </div>
  );
}
