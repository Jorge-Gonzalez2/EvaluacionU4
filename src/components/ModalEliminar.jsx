export default function ModalEliminar({ proyecto, alEliminar }) {
  return (
    <div
      className="modal fade"
      id="modalEliminar"
      tabIndex="-1"
      aria-labelledby="modalEliminarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">

          <div className="modal-header bg-light border-bottom-0 pt-4 px-4">
            <h5
              className="modal-title d-flex align-items-center fw-bold text-danger"
              id="modalEliminarLabel"
            >
              <i className="bi bi-trash3-fill me-2"></i>
              ¿Eliminar Proyecto?
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body px-4 py-3 text-muted">
            <p className="mb-1">
              Estás a punto de eliminar el siguiente proyecto:
            </p>

            <div className="alert alert-light border mt-3">
              <strong>{proyecto?.nombre}</strong>
              <br />
              <small>Código: {proyecto?.codigo}</small>
            </div>

            <small className="text-danger">
              Esta acción no se puede deshacer.
            </small>
          </div>

          <div className="modal-footer border-top-0 pb-4 px-4 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-danger rounded-pill px-4 fw-semibold shadow-sm"
              data-bs-dismiss="modal"
              onClick={() => alEliminar(proyecto.id)}
            >
              Sí, Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}