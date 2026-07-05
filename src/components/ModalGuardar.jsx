export default function ModalGuardar({ alConfirmar }) {
  return (
    <div 
      className="modal fade" 
      id="modalConfirmarGuardar" 
      tabIndex="-1" 
      aria-labelledby="modalConfirmarGuardarLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-light border-bottom-0 pt-4 px-4">
            <h5 className="modal-title d-flex align-items-center fw-bold text-success" id="modalConfirmarGuardarLabel">
              <i className="bi bi-check-circle-fill me-2"></i> ¿Guardar Proyecto?
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div className="modal-body px-4 py-3 text-muted">
            <p className="mb-1">Estás a punto de registrar un nuevo proyecto en el sistema.</p>
            <small className="text-secondary">Asegúrate de que todos los datos ingresados sean correctos antes de continuar.</small>
          </div>
          
          <div className="modal-footer border-top-0 pb-4 px-4 justify-content-end">
            <button 
              type="button" 
              className="btn btn-outline-secondary px-4 rounded-pill" 
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-success px-4 rounded-pill fw-semibold shadow-sm" 
              data-bs-dismiss="modal" 
              onClick={alConfirmar}
            >
              Sí, Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}