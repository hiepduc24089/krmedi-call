import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js";
//API
import { searchMedicine } from "../../lib/api";
import { addToPrescriptionCart } from "../../lib/api";

const DoctorPrescriptionModal = ({
  open,
  onClose,
  accessToken,
  doctorId,
  patientId,
}) => {
  const API_URL = "https://krmedi.vn:81/";

  const [currentPrescription, setCurrentPrescription] = useState(0);

  const [count, setCount] = useState(-1);

  const [prescriptions, setPrescriptions] = useState([]);

  // const selectRef = useRef(null);

  useEffect(() => {
    if (currentPrescription < count) {
      initializeSelect2(count);
      setCurrentPrescription(count);
    }
    if (open) {
      initializeSelect2(0);
    }
  }, [open, count, currentPrescription, prescriptions]);

  const initializeSelect2 = (index) => {
    const selectElement = $(`#select-${index}`);

    selectElement.select2({
      theme: "bootstrap-5",
      placeholder: "Tìm kiếm thuốc...",
      minimumInputLength: 1,
      dropdownParent: selectElement.parent(),
      ajax: {
        url: API_URL + `api/prescription/search/medicine`,
        dataType: "json",
        delay: 250,
        data: function (params) {
          return {
            search_key: params.term,
          };
        },
        processResults: (data) => {
          return {
            results: data.data.map((item) => ({
              id: item.id,
              text: item.name,
            })),
          };
        },
      },
    });

    // Remove any existing event handlers before binding the new one
    selectElement.off("select2:select");

    selectElement.on("select2:select", (e) => {
      var data = e.params.data;
      handlePrescriptionChange(index, "id", data.id);
    });
  };

  const destroySelect2 = () => {
    prescriptions.forEach((_, index) => {
      $(`#select-${index}`).select2("destroy");
    });
  };

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { id: "", quantity: "", treatmentDays: "", note: "" },
    ]);
    setCount(count + 1);
  };

  const handleResetForm = () => {
    setPrescriptions([]);
    setCount(-1);
    destroySelect2();
    onClose();
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index] = {
      ...updatedPrescriptions[index],
      [field]: value,
    };
    setPrescriptions(updatedPrescriptions);
  };

  const handleRemovePrescription = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    setPrescriptions(updatedPrescriptions);
    setCount(count - 1);
  };

  //LƯU ĐƠN THUỐC
  const handleSave = async () => {
    try {
      const requestData = {
        chatUserId: patientId,
        created_by: doctorId,
        products: JSON.stringify(prescriptions),
        // prescriptions: data,
      };

      // Make the API call to store the data
      const response = await addToPrescriptionCart(requestData, accessToken);

      console.log(response)

      // Handle the response
      // if (response.error == 0) {
      //   alert("Thành công");
      //   handleResetForm();
      // } else {
      //   // Handle the error case
      //   console.error("Something went wrong");
      // }
    } catch (error) {
      // Handle any network or other errors
      console.error(error);
    }
  };

  const renderPrescriptions = () => {
    return prescriptions.map((prescription, index) => (
      <div key={index} className="mb-3">
        <div className="row">
          <div className="col-md-12 mb-3">
            <select
              id={`select-${index}`}
              className="form-control search-select"
              value={prescription.id}
              data-index={index}
              readOnly
              key={index}
            >
              <option value=""></option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Quantity"
              value={prescription.quantity}
              onChange={(e) =>
                handlePrescriptionChange(index, "quantity", e.target.value)
              }
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Treatment Days"
              value={prescription.treatmentDays}
              onChange={(e) =>
                handlePrescriptionChange(index, "treatmentDays", e.target.value)
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <textarea
              className="form-control mb-3"
              rows="2"
              placeholder="Note"
              value={prescription.note}
              onChange={(e) =>
                handlePrescriptionChange(index, "note", e.target.value)
              }
            ></textarea>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => handleRemovePrescription(index)}
        >
          <DeleteSweepIcon />
        </Button>
        <hr />
      </div>
    ));
  };

  return (
    <Modal show={open} onHide={onClose} centered size="lg">
      <Modal.Header>
        <Modal.Title className="d-flex align-items-center justify-content-center w-100">
          Kê đơn thuốc
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
        {renderPrescriptions()}
        <Button
          size="sm"
          variant="success"
          color="primary"
          onClick={handleAddPrescription}
        >
          <AddCircleOutlineIcon />
        </Button>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        {prescriptions.length > 0 && (
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorPrescriptionModal;
