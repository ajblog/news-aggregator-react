import { SearchProvider } from "./components";
import { Home } from "./pages";

export default function App() {
  return (
    <SearchProvider>
      <Home />
    </SearchProvider>
  );
}
