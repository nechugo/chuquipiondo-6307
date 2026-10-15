import { Redirect, Route, Switch } from "wouter";
import Index from "./pages/index";
import Inicio from "./pages/inicio";
import Novedades from "./pages/novedades";
import NovedadPage from "./pages/novedad";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Switch>
        {/* La portada del portal es la raíz del sitio. */}
        <Route path="/" component={Inicio} />
        {/* La auditoría de código se conserva como plantilla técnica, en su propia ruta. */}
        <Route path="/auditoria" component={Index} />
        <Route path="/novedades" component={Novedades} />
        <Route path="/novedades/:slug" component={NovedadPage} />
        {/* Rutas antiguas: la portada vivía en /inicio. */}
        <Route path="/inicio">
          <Redirect to="/" />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
