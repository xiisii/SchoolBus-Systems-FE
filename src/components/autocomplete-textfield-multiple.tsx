import React, { useEffect, useRef, useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

interface Props {
  value: any[];
  options: { value: any; label: string }[];
  onChange: (value: any) => void;
  TextFieldProps: TextFieldProps;
}

const AutocompleteTextFieldMultiple: React.FC<Props> = ({
  value,
  options,
  onChange,
  TextFieldProps,
}) => {
  const [key, setKey] = useState<any>();
  const inputRef = useRef<HTMLInputElement>();

  const handleOptionChange = (
    _: any,
    value: ({ value: string; label: string } | undefined)[] | null
  ) => {
    if (value) {
      onChange(value);
    } else {
      onChange([]);
    }
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...TextFieldProps}
      {...params}
      InputProps={{
        sx: { ...TextFieldProps.InputProps?.sx },
        ...params.InputProps,
      }}
      inputRef={inputRef}
    />
  );

  useEffect(() => {
    if (document.activeElement != inputRef.current) {
      setKey(new Date().getTime());
    }
  }, [value]);

  return (
    <Autocomplete
      key={key}
      options={options}
      getOptionLabel={(option) => option?.label}
      value={value}
      renderInput={renderInput}
      onChange={handleOptionChange}
      autoHighlight
      multiple
    />
  );
};

export default AutocompleteTextFieldMultiple;
