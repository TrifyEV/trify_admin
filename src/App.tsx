// import { AuthProvider } from "./Components/common/AuthProvider";
import { LazyRoutes } from "./Components/Routes";
import Navbar from "./Components/common/Navbar";
import { useAuth } from "./Components/common/AuthProvider";

function App() {
  const auth = useAuth();

  return (
    // <AuthProvider>
    //   <Navbar />
    <div>
      {auth?.token && <Navbar />}
      <LazyRoutes />
    </div>
    // </AuthProvider>
  );
}

export default App;
