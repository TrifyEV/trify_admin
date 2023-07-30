import { AuthProvider } from "./Components/common/AuthProvider";
import { LazyRoutes } from "./Components/Routes";

function App() {
  return (
    <AuthProvider>
      <LazyRoutes />
    </AuthProvider>
  );
}

export default App;
