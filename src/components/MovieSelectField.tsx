import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import type { SelectProps } from "@mui/material/Select";
import { Controller, type Control } from "react-hook-form";
import { type MovieFormData } from "@/schemas/movie";

type Option = {
  value: string;
  label: string;
};

type MovieSelectFieldProps = {
  name: keyof MovieFormData;
  label: string;
  control: Control<MovieFormData>;
  options: Option[];
} & SelectProps;

const MovieSelectField = ({
  name,
  label,
  control,
  options,
  ...selectProps
}: MovieSelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>

          <Select {...field} label={label} {...selectProps}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default MovieSelectField;
