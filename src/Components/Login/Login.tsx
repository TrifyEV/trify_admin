import React, { useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import TextField from "../common/FormsUI/Textfield";
import Button from "../common/FormsUI/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useSWRMutation from "swr/mutation";
import { loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../common/hooks/useCookie";
import { useAuth } from "../common/AuthProvider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const cookies = useCookie();
  const INITIAL_FORM_STATE = {
    username: "",
    password: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const {
    data,
    error,
    isMutating,
    trigger: loginTrigger,
  } = useSWRMutation(
    `login-user`,
    (
      _key,
      { arg: { username, password } }: { arg: typeof INITIAL_FORM_STATE }
    ) => {
      if (username && password) {
        return loginUser({ username, password });
      }
    }
  );

  const handleLogin = (values: typeof INITIAL_FORM_STATE) => {
    loginTrigger({ username: values.username, password: values.password });
  };

  useEffect(() => {
    if (error) {
      navigate("/login");
    } else if (data) {
      const { access } = data;
      const redirectUrl = cookies.get("redirectUrl") || undefined;
      auth?.signin({ newtoken: access, redirectUrl });
      cookies.set("redirectUrl", "", new Date().toUTCString());
    }
  }, [data, error, navigate]);

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
              disabled={isMutating}
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
