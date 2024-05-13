import React, { useEffect, useState } from "react";
import { Modal, Button } from "@material-ui/core";
import "../../styles/custom.css";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from "../../lib/pusher";
import { API_URL } from "../../lib/api";

const UserPrescriptionModal = ({ open, onClose, patientId }) => {
  const [tbodyData, setTbodyData] = useState([]);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe("messages." + patientId);

    channel.bind("NewMessage", function(data) {
      console.log(data)
    });
    
  }, []);

  // useEffect(() => {
  //   const echo = new Echo({
  //     broadcaster: "pusher",
  //     key: PUSHER_APP_KEY,
  //     cluster: PUSHER_APP_CLUSTER,
  //     encrypted: true,
  //     authEndpoint: API_URL + "broadcasting/auth", // Set the correct URL here
  //     // additional options if needed
  //   });

  //   // const channel = echo.channel("message." + patientId);

  //   echo.private("messages." + patientId).listen('NewMessage', function (e) {
  //     console.log(e);
  //     });

  //   return () => {
  //     // Cleanup code when the component unmounts
  //     echo.disconnect();
  //   };
  // }, []);

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
              <th className="modal-table-header">Giỏ hàng</th>
              <th className="modal-table-header">Tin nhắn</th>
            </tr>
          </thead>
          <tbody>
            {tbodyData.map((data, index) => (
              <tr key={index}>
                <td className="modal-table-cell">{data.prescription_id}</td>
                <td className="modal-table-cell">{data.carts}</td>
                <td className="modal-table-cell">{data.message}</td>
              </tr>
            ))}
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
