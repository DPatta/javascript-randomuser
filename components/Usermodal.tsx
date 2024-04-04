// components/UserModal.tsx
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import User from "../model/User";
import { Button } from "react-bootstrap";
import Image from "next/image";

interface Props {
  user: User;
}

export default function UserModal({ user }: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="modal-detail-user">
      <div className="view-box">
        <p className="view-detail" onClick={() => setShow(true)}>
          View Details
        </p>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="block-personal-detail">
          <div className="box-image">
            <Image
              src={user?.picture["large"]}
              width={250}
              height={250}
              alt="avater"
            />
          </div>
          <div className="detail-box">
            <p className="personal-detail">
              Name: {user?.name["title"]}
              {user?.name["first"]} {user?.name["last"]}
            </p>
            <p className="personal-detail">Gender : {user?.gender}</p>
            <p className="personal-detail">Age : {user?.dob["age"]}</p>
            <p className="personal-detail">Email : {user?.email}</p>
            <p className="personal-detail">City : {user?.location["city"]}</p>
            <p className="personal-detail">
              Country : {user?.location["country"]}
            </p>
            <p className="personal-detail">
              Street : {user?.location["street"].name}{" "}
              {user?.location["street"].number}
            </p>

            <p className="personal-detail">
              Postcode : {user?.location["postcode"]}
            </p>
            <p className="personal-detail">State : {user?.location["state"]}</p>
            <p className="personal-detail">Phone : {user?.phone}</p>
          </div>
        </div>

        <div className="close-box">
          <p className="close" onClick={handleClose}>
            Close
          </p>
        </div>
      </Modal>
    </div>
  );
}
