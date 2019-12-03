import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import { connect } from "react-redux";
import { updateLog, clearCurrent } from "../../actions/logActions";
import { getTechs } from "../../actions/techActions";
import TechSelectOptions from "../techs/TechSelectOptions";

const EditLogModel = ({ current, updateLog, getTechs }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
    getTechs();
    // eslint-disable-next-line
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please Enter a Message and Tech" });
    } else {
      updateLog({
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      });
      clearCurrent();
      M.toast({ html: `Log ${current.id} Is Updated` });
      // Clear Fields
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Log {current ? current.id : null}</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={e => setTech(e.target.value)}
            >
              {/* Get all the techs and Populate Here */}
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
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
  width: "75%",
  height: "75%",
  padding: "10%"
};

const mapStateToProps = state => ({
  current: state.log.current
});

export default connect(mapStateToProps, { updateLog, clearCurrent, getTechs })(
  EditLogModel
);
