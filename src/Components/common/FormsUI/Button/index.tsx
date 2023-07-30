import React from "react";
import { useFormikContext, FormikValues } from "formik";
import { Button, ButtonProps } from "@mui/material";

interface ButtonWrapperProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  children,
  ...otherProps
}) => {
  const { submitForm } = useFormikContext<FormikValues>();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton: ButtonProps = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
