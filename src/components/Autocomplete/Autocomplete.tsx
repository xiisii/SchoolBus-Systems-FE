import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface AutocompleteOption<T extends number | string> {
  value: T;
  label: string;
}

interface AutocompleteProps<T extends number | string> {
  options: AutocompleteOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  freeSolo?: boolean;
}

const Autocomplete = <T extends number | string>({
  value,
  options,
  onChange,
  className,
  placeholder,
  freeSolo,
}: AutocompleteProps<T>) => {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const handleChooseOption = useCallback(
    (value: T) => {
      onChange(value);
      setOpen(false);
      ulRef.current?.blur();
    },
    [onChange]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ulRef.current) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex !== -1) {
            const selectedOption = options[focusedIndex];
            if (selectedOption) {
              handleChooseOption(selectedOption.value);
            }
            setOpen(false);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedIndex, options, onChange]);

  useEffect(() => {
    if (query && options.length > 0) {
      setFocusedIndex(
        options.findIndex((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )
      );
    } else {
      setFocusedIndex(-1);
    }
  }, [query, options]);

  useEffect(() => {
    setQuery(value?.toString() || "");
  }, [value]);

  useEffect(() => {
    if (ulRef.current && focusedIndex !== -1) {
      const listItem = ulRef.current.children[focusedIndex] as HTMLElement;
      listItem?.focus();
    }
  }, [focusedIndex]);

  return (
    <div
      className={clsx(
        "dropdown border-[1px] rounded-lg inline-block",
        open && "dropdown-open",
        className
      )}
      ref={ref}
    >
      <div
        tabIndex={0}
        role="button"
        className="relative cursor-default overflow-hidden rounded-lg bg-white text-left"
      >
        <input
          className="input input-sm focus-visible:border-none -webkit-outer-spin-button:-webkit-appearance-[none]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
        <div className="btn btn-sm btn-ghost absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className={clsx(
          "dropdown-content z-[100] inline-block menu w-full bg-white border-[1px] p-0 rounded-lg max-h-[50vh] overflow-y-scroll"
        )}
        ref={ulRef}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={clsx(
              "btn btn-ghost btn-sm hover:bg-orange-300 text-left w-full relative select-none pl-2 py-1",
              option.value == value
                ? "bg-orange-500 text-white"
                : "text-gray-900",
              index === focusedIndex && "bg-orange-200"
            )}
            value={option.value}
            onClick={() => handleChooseOption(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
