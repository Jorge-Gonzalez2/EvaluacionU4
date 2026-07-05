import { useState } from "react";
import ModalEliminar from "./ModalEliminar";

export default function Lista({ proyectos, EliminarProyecto, ProyectoLista }) {
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  return (
    <div className="mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white py-3">
          <h4 className="mb-0 fw-bold">
            <i className="bi bi-folder-fill me-2"></i> Lista de Proyectos Registrados
          </h4>
        </div>
        <div className="card-body p-0"> 
          {proyectos.length === 0 ? (
            <div className="p-4 text-center text-muted">
              <i className="bi bi-clipboard-x display-4 text-secondary d-block mb-2"></i>
              No hay proyectos registrados en este momento.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary text-uppercase fs-7">
                  <tr>
                    <th className="ps-4">Id</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Presupuesto</th>
                    <th>Avance</th>
                    <th>Tecnologías</th>
                    <th>Responsable</th>
                    <th className="text-center pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((proyecto) => (
                    <tr key={proyecto.id}>
                      <td className="ps-4 text-muted">#{proyecto.id}</td>
                      <td><span className="badge bg-secondary font-monospace">{proyecto.codigo}</span></td>
                      <td className="fw-semibold">{proyecto.nombre}</td>
                      <td>
                        <span className={`badge rounded-pill ${
                          proyecto.estado === "Finalizado" ? "bg-success" :
                          proyecto.estado === "En desarrollo" ? "bg-warning text-dark" : "bg-danger"
                        }`}>
                          {proyecto.estado || "No definido"}
                        </span>
                      </td>
                      <td className="text-success fw-medium">
                        {proyecto.presupuesto ? `$${Number(proyecto.presupuesto).toLocaleString()}` : "$0"}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2 small">{proyecto.avance}%</span>
                          <div className="progress w-100" style={{ height: "6px" }}>
                            <div 
                              className="progress-bar bg-primary" 
                              role="progressbar" 
                              style={{ width: `${proyecto.avance}%` }}
                              aria-valuenow={proyecto.avance} 
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {proyecto.tecnologias && proyecto.tecnologias.length > 0 
                          ? proyecto.tecnologias.join(", ") 
                          : <span className="text-muted small">Ninguna</span>}
                      </td>
                      <td>
                        <div className="fw-bold">{proyecto.responsable?.nombre || "Sin asignar"}</div>
                        <small className="text-muted d-block">{proyecto.responsable?.cargo || ""}</small>
                      </td>
                      <td className="text-center pe-4">

                        <button 
                        className="btn btn-sm btn-light border me-1"
                        onClick={() => ProyectoLista(proyecto.id)}
                        >
                          <i className="bi bi-pencil-square text-primary"></i> Editar
                        </button>

                        <button
                        className="btn btn-sm btn-light border"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEliminar"
                        onClick={() => setProyectoSeleccionado(proyecto)}
                        >
                        <i className="bi bi-trash3-fill text-danger"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ModalEliminar
            proyecto={proyectoSeleccionado}
            alEliminar={EliminarProyecto}
        />
      </div>
    </div>
  );
}