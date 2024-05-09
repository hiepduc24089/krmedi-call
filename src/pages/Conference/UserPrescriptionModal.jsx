import React from "react";
import { Modal, Button } from "@material-ui/core";
import "../../styles/custom.css";

const UserPrescriptionModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="modal-content">
        <h3 className="modal-title">Đơn thuốc của bạn</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th className="modal-table-header">#</th>
              <th className="modal-table-header">Sản phẩm</th>
              <th className="modal-table-header">Số lượng</th>
              <th className="modal-table-header">Ngày điều trị</th>
              <th className="modal-table-header">Lưu ý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="modal-table-cell">1</td>
              <td className="modal-table-cell">Value 2</td>
              <td className="modal-table-cell">Value 3</td>
              <td className="modal-table-cell">Value 2</td>
              <td className="modal-table-cell">Value 3</td>
            </tr>
            <tr>
              <td className="modal-table-cell">2</td>
              <td className="modal-table-cell">Value 5</td>
              <td className="modal-table-cell">Value 6</td>
              <td className="modal-table-cell">Value 2</td>
              <td className="modal-table-cell">Value 3</td>
            </tr>
          </tbody>
        </table>
        <div className="button-group">
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserPrescriptionModal;