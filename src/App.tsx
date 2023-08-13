import { LazyRoutes } from "./Components/Routes";
import Navbar from "./Components/common/Navbar";
import { useAuth } from "./Components/common/AuthProvider";

function App() {
  const auth = useAuth();

  return (
    <div>
      {auth?.token && <Navbar />}
      <LazyRoutes />
    </div>
  );
}

export default App;
