import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    className?: string;
}

const Select = ({
    options,
    value,
    onChange,
    placeholder = "Seleccionar...",
    label,
    disabled = false,
    className = ""
}: SelectProps) => {
    const selectedOption = options.find(option => option.value === value);

    return (
        <div className={`${styles.selectContainer} ${className}`}>
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}

            <Listbox value={value} onChange={onChange} disabled={disabled}>
                <div className={styles.listboxContainer}>
                    <Listbox.Button className={styles.listboxButton}>
                        <span className={styles.selectedValue}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <span className={styles.chevron}>
                            ▼
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className={styles.listboxOptions}>
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={({ active, selected, disabled }) =>
                                        `${styles.option} ${active ? styles.optionActive : ''
                                        } ${selected ? styles.optionSelected : ''
                                        } ${disabled ? styles.optionDisabled : ''
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={styles.optionLabel}>
                                                {option.label}
                                            </span>
                                            {selected && (
                                                <span className={styles.checkmark}>
                                                    ✓
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default Select;
