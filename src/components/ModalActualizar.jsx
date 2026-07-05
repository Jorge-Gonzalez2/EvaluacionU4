export default function ModalActualizar({ alConfirmar }) {
  return (
    <div
      className="modal fade"
      id="modalConfirmarActualizar"
      tabIndex="-1"
      aria-labelledby="modalConfirmarActualizarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">

          <div className="modal-header bg-light border-bottom-0 pt-4 px-4">
            <h5
              className="modal-title d-flex align-items-center fw-bold text-primary"
              id="modalConfirmarActualizarLabel"
            >
              <i className="bi bi-pencil-square me-2"></i>
              ¿Actualizar Proyecto?
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body px-4 py-3 text-muted">
            <p className="mb-1">
              Estás a punto de actualizar la información de este proyecto.
            </p>

            <small className="text-secondary">
              Verifica que los cambios sean correctos antes de continuar.
            </small>
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
              className="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm"
              data-bs-dismiss="modal"
              onClick={alConfirmar}
            >
              Sí, Actualizar
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}