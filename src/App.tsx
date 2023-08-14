import { LazyRoutes } from "./Components/Routes";
import Navbar from "./Components/common/Navbar";
import { useAuth } from "./Components/common/AuthProvider";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-shadow.png";

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
