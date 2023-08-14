import { LazyRoutes } from "./Components/Routes";
import Navbar from "./Components/common/Navbar";
import { useAuth } from "./Components/common/AuthProvider";
import "leaflet/dist/leaflet.css";

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
