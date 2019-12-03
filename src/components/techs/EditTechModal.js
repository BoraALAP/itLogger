import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import { connect } from "react-redux";
import { updateTech, clearCurrentTech } from "../../actions/techActions";

const EditTechModel = ({ current, updateTech, clearCurrentTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (current) {
      setFirstName(current.firstName);
      setLastName(current.lastName);
    }
    //eslint-disable-next-line
  }, [current]);

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please Enter a First Name and Last Name" });
    } else {
      updateTech({ id: current.id, firstName, lastName });
      M.toast({ html: `${firstName} ${lastName} Added as a Tech` });
      // Clear Fields
      clearCurrentTech();
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id="edit-tech-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="model-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  padding: "10%"
};

const mapStateToProps = state => ({
  current: state.tech.currentTech
});
export default connect(mapStateToProps, { updateTech, clearCurrentTech })(
  EditTechModel
);
