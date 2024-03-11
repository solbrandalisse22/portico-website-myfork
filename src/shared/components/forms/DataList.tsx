import { useRef, useState } from 'preact/hooks';
import styles from '@/shared/styles/ContactForm.module.css';

interface DataListProps {
  label: string;
  name: string;
  placeholder: string;
  options?: { option: string; label: string }[];
  props?: any;
  className?: string;
}

export default function DataList({
  label,
  name,
  placeholder,
  className,
  options = [],
  ...props
}: DataListProps) {
  const [listOpened, setListOpened] = useState<boolean>(false);
  const [activeElement, setActiveElement] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<{ option: string; label: string }[] | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDataListElement>(null);

  const scrollToElement = () => {
    setTimeout(() => {
      const list = listRef.current;
      const active = list?.querySelector(`.${styles.active}`);
      if (active) {
        active?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 10);
  }

  const onBlur = () => {
    setTimeout(() => {
      setListOpened(false);
    }, 100);
  }

  const onFocus = () => {
    setListOpened(true);
    scrollToElement();
  }

  const onOptionSelected = (value: string, index: number) => {
    setActiveElement(index);
    setInputValue(value);
    setListOpened(false);
    inputRef.current?.blur();
  }

  const onchange = () => {
    setListOpened(true);
    const value = inputRef.current?.value;
    if (value) {
      setActiveElement(0);
      setInputValue(value);
      const filtered = options.filter(({ option, label }) => label.toLowerCase().includes(value.toLowerCase()));
      setFilteredOptions(filtered);
    } else {
      setInputValue('');
      setFilteredOptions(null);
    }
  }

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setListOpened(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setListOpened(true);
      if (activeElement < (filteredOptions || options).length - 1) {
        setActiveElement(activeElement + 1);
        scrollToElement();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setListOpened(true);
      if (activeElement > 0) {
        setActiveElement(activeElement - 1);
        scrollToElement();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const filtered = filteredOptions || options;
      if (filtered) {
        const { option } = filtered[activeElement];
        onOptionSelected(option, activeElement);
      }
    }
  }

  return (
    <div className={`mb-5 ${className} relative`}>
      <label for={name} className="mb-3 pl-2 block text-base font-medium">
        {label}
      </label>
      <input
        {...props}
        autoComplete="nofill"
        ref={inputRef}
        name={name}
        id={name}
        placeholder={placeholder}
        required
        value={inputValue}
        className={`w-full rounded-full border bg-white py-3 px-6 text-base font-medium text-[#6B7280] border-primary ring-primary outline-none autofill:bg-black/30 ${styles['input-list']} ${listOpened ? `${styles['input-no-rounded']} ring-2` : 'valid:bg-black/60 valid:text-white valid:border-primary'}`}
        onKeyDown={onkeydown}
        onInput={onchange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {
        listOpened && (
          <datalist ref={listRef} id="dataList" className={styles.datalist}>
            {(filteredOptions || options).map(({ option, label }, index) => (
              <option value={option} className={`${styles.option} ${index === activeElement ? styles.active : ''}`} onClick={() => onOptionSelected(option, index)}>{label}</option>
            ))}
            {
              filteredOptions && filteredOptions?.length === 0 && (
                <option value="" className={styles['option-no-found']} disabled>
                  No results found
                </option>
              )
            }
            {
              !filteredOptions && options.length === 0 && (
                <option value="" className={styles['option-no-found']} disabled>
                  No options available
                </option>
              )
            }
          </datalist>
        )
      }
    </div>
  );
}
