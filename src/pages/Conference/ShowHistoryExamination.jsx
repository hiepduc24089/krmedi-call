import React, { useEffect, useState } from "react";
// import { Modal, Button } from "@material-ui/core";
import { Button, Modal, Table } from "react-bootstrap";
import { API_URL } from "../../lib/api";
import axios from "axios";

const ShowHistoryExamination = ({ open, onClose, userId }) => {
    const [tbodyData, setTbodyData] = useState([]);

    useEffect(() => {
        if (userId) {
          const fetchBookings = async () => {
            try {
              const response = await axios.get(`http://127.0.0.1:8000/api/my-bookings/list/${userId}`);
            //   const response = await axios.get(`${API_URL}/api/my-bookings/list/${userId}`);
              
            if (Array.isArray(response.data)) {
                setTbodyData(response.data);
              } else {
                console.error("Expected an array, but got:", response.data);
                setTbodyData([]);
              }
              
            } catch (error) {
              console.error("Error fetching booking data:", error);
            }
          };
    
          fetchBookings();
        }
      }, [userId]);

  return (
    <Modal show={open} onHide={onClose} centered size="lg">
      <Modal.Header>
        <Modal.Title className="d-flex align-items-center justify-content-center w-100">
          Lịch sử khám
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px" }}>
        <Table
          striped
          bordered
          hover
          style={{ maxHeight: "400px", overflow: "auto" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Phòng khám</th>
              <th>Giờ vào</th>
              <th>Dịch vụ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {tbodyData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Chưa có lịch sử khám
                </td>
              </tr>
            ) : (
              tbodyData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <p>{data.name_clinic}</p>
                  </td>
                  <td>{data.check_in}</td>
                  <td>{data.service_names}</td>
                  <td>{data.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowHistoryExamination;
