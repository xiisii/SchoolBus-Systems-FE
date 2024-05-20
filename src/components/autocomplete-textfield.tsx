import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

interface Props {
  value: any;
  options: { value: any; label: string }[];
  onChange: (value: any) => void;
  TextFieldProps: TextFieldProps;
  disabled?: boolean;
}

const AutocompleteTextField: React.FC<Props> = ({
  value,
  options,
  onChange,
  TextFieldProps,
  disabled,
}) => {
  const [key, setKey] = useState<any>();

  const inputRef = useRef<HTMLInputElement>();

  const handleOptionChange = (
    _: any,
    value: { value: string; label: string } | null
  ) => {
    if (value) {
      onChange(value.value);
    } else {
      onChange("");
    }
  };

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...TextFieldProps}
        {...params}
        InputProps={{
          sx: { ...TextFieldProps.InputProps?.sx },
          ...params.InputProps,
        }}
        inputProps={{
          ...TextFieldProps.inputProps,
          ...params.inputProps,
        }}
        id={params.id}
        disabled={params.disabled}
        inputRef={inputRef}
      />
    ),
    [TextFieldProps]
  );

  useEffect(() => {
    if (document.activeElement != inputRef.current) {
      console.log("document.activeElement", document.activeElement);
      setKey(new Date().getTime());
    }
  }, [value]);

  return (
    <Autocomplete
      key={key}
      options={options}
      getOptionLabel={(option) => option.label}
      value={options.find((option) => option.value == value)}
      renderInput={renderInput}
      onChange={handleOptionChange}
      disabled={disabled}
      autoHighlight
    />
  );
};

export default AutocompleteTextField;
