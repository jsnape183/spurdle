import "../modal.css";

const Modal = ({ header, content }) => (
  <div className="modal-container">
    <input id="modal-toggle" type="checkbox" checked readOnly />
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{header}</h2>
        <hr />
        {content}
      </div>
    </div>
  </div>
);

export default Modal;
