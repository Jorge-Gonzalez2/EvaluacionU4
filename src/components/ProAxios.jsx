import { useEffect, useState } from "react";
import axios from "axios";

export default function ProAxios() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null); 

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("https://jsonplaceholder.typicode.com/posts", { signal: controller.signal })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProyectos(res.data);
        } else {
          throw new Error("El formato de los datos no es el esperado.");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;

        console.error("Error cargando datos:", err);
        
        if (!navigator.onLine) {
          setError("No tienes conexión a internet. Revisa tu red.");
        } else if (err.response) {
          setError(`Error del servidor (${err.response.status}): No se encontraron los proyectos.`);
        } else {
          setError("No se pudo conectar con el servidor. Inténtalo más tarde.");
        }
        setLoading(false);
      });

    return () => controller.abort(); 
  }, []);

  return (
    <div className="container-fluid px-5 mt-4">
      <h2 className="text-center mb-4 fw-bold text-white">Proyectos</h2>

      {loading && (
        <div className="text-center text-white">
          <div className="spinner-border text-light" role="status"></div>
          <p className="mt-2">Cargando proyectos de la API...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row justify-content-center">
          {proyectos.slice(0, 12).map((p) => (
            <div key={p.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{p.title}</h5>
                  <p className="card-text text-muted">
                    {p.body.substring(0, 90)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}