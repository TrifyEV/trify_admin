import { Button, Typography } from "@mui/material";
import { useAuth } from "../common/AuthProvider";

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <br />
      <Typography>Welcome to the home page. You are logged in</Typography>
      {/* <Button onClick={auth?.signout} variant="outlined">
        Log out
      </Button> */}
    </div>
  );
};

export default Home;
