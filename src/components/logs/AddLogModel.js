import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import { connect } from "react-redux";
import { addLog } from "../../actions/logActions";
import { getTechs } from "../../actions/techActions";
import TechSelectOptions from "../techs/TechSelectOptions";

const AddLogModel = ({ techs, addLog, getTechs }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, [getTechs]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please Enter a Message and Tech" });
    } else {
      addLog({ message, attention, tech, date: new Date() });
      M.toast({ html: `Log added by ${tech}` });
      // Clear Fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
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
  techs: state.tech.techs
});

export default connect(mapStateToProps, { addLog, getTechs })(AddLogModel);
