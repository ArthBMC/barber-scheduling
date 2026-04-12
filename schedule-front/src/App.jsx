import { useNavigate } from "react-router-dom";
import  AppRoutes  from "./routes/AppRoutes";
import { Button } from "./components/ui/button";
  
function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        <Button onClick={() => navigate("/")} variant="link" className="text-gray-900">
          BarberShop
        </Button>
        </h1>
      <Button onClick={() => navigate("/services")}>Servicos</Button>
      <Button onClick={() => navigate("/login")}>Login</Button>
      <AppRoutes />
      <footer className="mt-4 text-sm text-gray-500">
        &copy; 2026 Rafa Barber Shop. Todos os direitos reservados.
      </footer>
    </>
  );
}

export default App;
