import { TextField, type TextFieldProps } from "@mui/material"; //TextFieldProps: the props that TextField component accepts, like label, value, error, helperText etc.
import { Controller, type Control } from "react-hook-form"; //type Control: the type of the control object that is used to connect the form fields to the form state and validation.

import { type MovieFormData } from "@/schemas/movie";

type MovieTextFieldProps = {
  name: keyof MovieFormData; //combines all the keys of MovieFormData into a union type, so name can be "title", "year", etc.
  label: string;
  control: Control<MovieFormData>; //the control object that is used to connect the form fields to the form state and validation. It is passed down from the parent component (MovieForm) where useForm is called.
  type?: "text" | "number";
} & TextFieldProps;

const MovieTextField = ({
  name,
  label,
  control,
  type,
  ...textFieldProps
}: MovieTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...textFieldProps}
          required
          onChange={(e) => {
            const value =
              type === "number"
                ? e.target.value === ""
                  ? "" // keep empty state usable
                  : Number(e.target.value)
                : e.target.value;

            field.onChange(value);
          }}
          sx={{ width: "100%" }}
        />
      )}
    />
  );
};

export default MovieTextField;
