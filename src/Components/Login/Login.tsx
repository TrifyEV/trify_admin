import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import TextField from "../common/FormsUI/Textfield";
import Button from "../common/FormsUI/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoginUserRequestType, loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthProvider";
import { getCookieValue, setCookie } from "../api/authUtils";
import { COOKIE_CONSTANTS } from "../api/constants";
import { useMutation } from "react-query";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const INITIAL_FORM_STATE = {
    username: "",
    password: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const { mutate, isLoading } = useMutation(
    (userDetails: LoginUserRequestType) => {
      return loginUser(userDetails);
    },
    {
      onSuccess: (data) => {
        const {
          data: { access, refresh },
        } = data;
        const redirectUrl =
          getCookieValue(COOKIE_CONSTANTS.REDIRECT_URL) || undefined;
        auth?.signin({ newtoken: access, refresh, redirectUrl });
        setCookie(COOKIE_CONSTANTS.REDIRECT_URL, "");
      },
      onError: () => {
        navigate("/login");
      },
    }
  );

  const handleLogin = (values: typeof INITIAL_FORM_STATE) => {
    mutate({ username: values.username, password: values.password });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: "6rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleLogin}
      >
        <Form>
          <Stack gap={2}>
            <TextField name="username" label="Username" />
            <TextField name="password" label="Password" type="password" />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              Login
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
