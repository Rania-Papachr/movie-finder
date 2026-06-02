import { TextField, type TextFieldProps } from "@mui/material"; //TextFieldProps: the props that TextField component accepts, like label, value, error, helperText etc.
import { Controller, type Control } from "react-hook-form"; //type Control: the type of the control object that is used to connect the form fields to the form state and validation.

import { type MovieFormData } from "@/schemas/movie";

type MovieTextFieldProps = {
  name: keyof MovieFormData; //combines all the keys of MovieFormData into a union type, so name can be "title", "year", etc.
  label: string;
  control: Control<MovieFormData>; //the control object that is used to connect the form fields to the form state and validation. It is passed down from the parent component (MovieForm) where useForm is called.
} & TextFieldProps;

const MovieTextField = ({
  name,
  label,
  control,
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
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...textFieldProps}
        />
      )}
    />
  );
};

export default MovieTextField;
