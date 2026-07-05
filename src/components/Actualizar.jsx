import { useState, useEffect } from "react";
import ModalActualizar from "./ModalActualizar";

export default function Actualizar({
    setVista,
    setProyectos,
    proyectoBuscado,
    setProyectoBuscado,
    proyectoSeleccionado,
    setProyectoSeleccionado,
    proyectos,
    vistaActualizar,
    setVistaActualizar
}) {

    const [datosForm, setDatosForm] = useState(null);

    useEffect(() => {
        if (proyectoSeleccionado) {
            setDatosForm({ ...proyectoSeleccionado });
        }
    }, [proyectoSeleccionado]);

    const gestionarBusqueda = () => {
        const texto = proyectoBuscado.trim();

        const encontrado = proyectos.find(
            proyecto =>
                proyecto.id.toString() === texto ||
                proyecto.codigo === texto
        );

        if (encontrado) {
            setProyectoSeleccionado(encontrado);
            setVistaActualizar("encontrado");
        } else {
            setProyectoSeleccionado(null);
            setVistaActualizar("no-encontrado");
        }
    };

    const guardarCambios = () => {
        if (!datosForm) {
            alert("No hay datos para actualizar.");
            return;
        }

        if (!datosForm.codigo || !datosForm.nombre || !datosForm.estado || !datosForm.presupuesto || !datosForm.avance || !datosForm.tecnologias.length || !datosForm.responsable.nombre || !datosForm.responsable.cargo) {
            alert("Por favor, completa todos los campos antes de actualizar.");
            return;
        }

        if (isNaN(Number(datosForm.avance)) || Number(datosForm.avance) < 0 || Number(datosForm.avance) > 100) {
            alert("El avance debe ser un número entre 0 y 100.");
            return;
        }

        if (isNaN(Number(datosForm.presupuesto)) || Number(datosForm.presupuesto) < 0) {
            alert("El presupuesto debe ser un número positivo.");
            return;
        }

        if (!Array.isArray(datosForm.tecnologias) || datosForm.tecnologias.length === 0) {
            alert("Por favor, selecciona al menos una tecnología.");
            return;
        }

        if (!datosForm.responsable || !datosForm.responsable.nombre || !datosForm.responsable.cargo) {
            alert("Por favor, completa la información del responsable.");
            return;
        }

        if (proyectos.some(proj => proj.id !== datosForm.id && proj.codigo === datosForm.codigo)) {
            alert("El código ingresado ya está en uso por otro proyecto. Por favor, utiliza un código único.");
            return;
        }



    const listaEditada = proyectos.map(proj => 
        proj.id.toString() === datosForm.id.toString() ? datosForm : proj
    );

    setProyectos(listaEditada); 
    alert("¡Datos actualizados con éxito!");
    
    setProyectoSeleccionado(null);
    setProyectoBuscado("");
    setVista("lista");
    };

    return (
        <div className="mt-4">
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white py-3">
                    <h4 className="mb-0 fw-bold">
                        <i className="bi bi-pencil-square me-2"></i>
                        Actualizar Proyecto
                    </h4>
                </div>

                <div className="card-body p-4">
                    <p className="text-muted mb-4">
                        Busca un proyecto por su <strong>ID</strong> o <strong>Código</strong> para editar su información.
                    </p>

                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-search"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: 3 o PRJ003"
                            value={proyectoBuscado}
                            onChange={(e) => setProyectoBuscado(e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn btn-dark px-4"
                            onClick={gestionarBusqueda}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            
            {vistaActualizar === "encontrado" && proyectoSeleccionado && datosForm && (
                <div className="card shadow border-0 mt-4">

                    <div className="card-header bg-dark text-white py-3">
                        <h4 className="mb-0 fw-bold">
                            <i className="bi bi-pencil-square me-2"></i>
                            Modificar Proyecto
                        </h4>
                    </div>

                    <div className="card-body p-4">

                        <div className="alert alert-secondary mb-4">
                            Editando: <strong>{proyectoSeleccionado.nombre}</strong>
                        </div>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Código</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={datosForm.codigo}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            codigo: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={datosForm.nombre}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            nombre: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    value={datosForm.estado}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            estado: e.target.value
                                        })
                                    }
                                >
                                    <option value="">Seleccionar Estado</option>
                                    <option value="En desarrollo">En desarrollo</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Presupuesto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={datosForm.presupuesto}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            presupuesto: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Avance (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="form-control"
                                    value={datosForm.avance}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            avance: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label d-block">
                                    Tecnologías Utilizadas
                                </label>

                                <div className="dropdown">

                                    <button
                                        className="btn btn-outline-secondary w-100 text-start dropdown-toggle d-flex justify-content-between align-items-center"
                                        type="button"
                                        id="dropdownTecnologiasActualizar"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                    >
                                        <span className="text-truncate me-2">
                                            {datosForm.tecnologias.length === 0
                                                ? "Seleccionar Tecnologías"
                                                : datosForm.tecnologias.join(", ")}
                                        </span>
                                    </button>

                                    <div
                                        className="dropdown-menu w-100 p-3 shadow-sm"
                                        aria-labelledby="dropdownTecnologiasActualizar"
                                        style={{
                                            maxHeight: "200px",
                                            overflowY: "auto"
                                        }}
                                    >
                                        {["Java", "MySQL", "HTML", "C++", "React", "Python"].map((tech) => (
                                            <div
                                                key={tech}
                                                className="form-check form-switch mb-2"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`actualizar-${tech}`}
                                                    checked={datosForm.tecnologias.includes(tech)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setDatosForm({
                                                                ...datosForm,
                                                                tecnologias: [
                                                                    ...datosForm.tecnologias,
                                                                    tech
                                                                ]
                                                            });
                                                        } else {
                                                            setDatosForm({
                                                                ...datosForm,
                                                                tecnologias:
                                                                    datosForm.tecnologias.filter(
                                                                        t => t !== tech
                                                                    )
                                                            });
                                                        }
                                                    }}
                                                />

                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`actualizar-${tech}`}
                                                >
                                                    {tech}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <h5 className="fw-bold mb-3 mt-4">
                            Responsable
                        </h5>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={datosForm.responsable.nombre}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            responsable: {
                                                ...datosForm.responsable,
                                                nombre: e.target.value
                                            }
                                        })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Cargo</label>
                                <select
                                    className="form-select"
                                    value={datosForm.responsable.cargo}
                                    onChange={(e) =>
                                        setDatosForm({
                                            ...datosForm,
                                            responsable: {
                                                ...datosForm.responsable,
                                                cargo: e.target.value
                                            }
                                        })
                                    }
                                >
                                    <option value="">Seleccionar Cargo</option>
                                    <option value="Jefe de Proyecto">Jefe de Proyecto</option>
                                    <option value="Desarrollador">Desarrollador</option>
                                    <option value="Diseñador">Diseñador</option>
                                </select>
                            </div>

                        </div>               
                        <hr className="my-4" />

                        <div className="d-flex justify-content-end mt-4">
                            <button 
                                type="button" 
                                className="btn btn-dark btn-lg px-4 shadow-sm"
                                data-bs-toggle="modal" 
                                data-bs-target="#modalConfirmarActualizar"
                            >
                                <i className="bi bi-check-circle me-2"></i>
                                Actualizar Proyecto
                            </button>
                        </div>
                                            
                    </div>
                    <ModalActualizar alConfirmar={guardarCambios} />
                </div>
            )}

            {vistaActualizar === "no-encontrado" && (
                <div
                    className="alert alert-danger mt-3 text-center shadow-sm"
                    role="alert"
                >
                    No se encontró ningún proyecto con el ID o código ingresado.
                </div>
            )}
        </div>
    );
}