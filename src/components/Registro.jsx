import ModalGuardar from "./ModalGuardar";

export default function Registro({
    codigo, 
    setCodigo, 
    nombre, 
    setNombre, 
    estado, 
    setEstado, 
    presupuesto, 
    setPresupuesto, 
    avance, 
    setAvance, 
    tecnologias, 
    setTecnologias, 
    nombreResponsable, 
    setNombreResponsable, 
    cargoResponsable, 
    setCargoResponsable,
    AgregarProyecto
}) {
    
    const handleSelectMultiple = (e) => {
        const opcionesSeleccionadas = Array.from(e.target.selectedOptions).map(option => option.value);
        setTecnologias(opcionesSeleccionadas);
    };

    return(
        <div className="container mt-4">
            <h1 className="mb-4">Registrar Proyecto</h1>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Código</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="PRJ001..."
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Sistema de Gestión..."
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Estado:</label>
                    <select 
                        className="form-select" 
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="" disabled>Seleccionar Estado</option>
                        <option value="En desarrollo">En desarrollo</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Presupuesto</label>
                    <input 
                        type="number"
                        min={0} 
                        className="form-control" 
                        placeholder="Presupuesto..."
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Avance (%)</label>
                    <input 
                        type="number" 
                        min={1}
                        max={100}
                        className="form-control" 
                        placeholder="57..."
                        value={avance}
                        onChange={(e) => setAvance(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label d-block">Tecnologías Utilizadas</label>
                    <div className="dropdown">
                        <button 
                            className="btn btn-outline-secondary w-100 text-start dropdown-toggle d-flex justify-content-between align-items-center" 
                            type="button" 
                            id="dropdownTecnologias" 
                            data-bs-toggle="dropdown" 
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                        >
                            <span className="text-truncate me-2">
                                {tecnologias.length === 0 
                                    ? "Seleccionar Tecnologías" 
                                    : tecnologias.join(", ")}
                            </span>
                        </button>
                        
                        <div className="dropdown-menu w-100 p-3 shadow-sm" aria-labelledby="dropdownTecnologias" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {["Java", "MySQL", "HTML", "C++", "React", "Python"].map((tech) => (
                                <div key={tech} className="form-check form-switch mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`switch-${tech}`}
                                        value={tech}
                                        checked={tecnologias.includes(tech)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setTecnologias([...tecnologias, tech]);
                                            } else {
                                                setTecnologias(tecnologias.filter(t => t !== tech));
                                            }
                                        }}
                                    />
                                    <label className="form-check-label small w-100 cursor-pointer" htmlFor={`switch-${tech}`}>
                                        {tech}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <h2 className="mt-4">Responsable:</h2>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Andrea molina..."
                        value={nombreResponsable}
                        onChange={(e) => setNombreResponsable(e.target.value)}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Cargo:</label>
                    <select 
                        className="form-select" 
                        value={cargoResponsable}
                        onChange={(e) => setCargoResponsable(e.target.value)}
                    >
                        <option value="" disabled>Seleccionar Cargo</option>
                        <option value="Jefe de Proyecto">Jefe de Proyecto</option>
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="Diseñador">Diseñador</option>
                    </select>
                </div>
            
                <div className="col-10 d-flex justify-content-end">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm"
                        data-bs-toggle="modal" 
                        data-bs-target="#modalConfirmarGuardar"
                    >
                        Guardar Proyecto
                    </button>
                </div>

            <ModalGuardar alConfirmar={AgregarProyecto} />
            </div>
        </div>
    );
}