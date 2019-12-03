import React, { useState, useEffect } from "react";
import Moment from "react-moment";

import { connect } from "react-redux";
import { deleteLog, setCurrent } from "../../actions/logActions";

import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({ techs, log, deleteLog, setCurrent }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (techs) {
      techs.map(tech => {
        if (tech.id === parseInt(log.tech)) {
          setFirstName(tech.firstName);
          setLastName(tech.lastName);
        }
        return tech;
      });
    }
  }, [log.tech, techs]);
  const onDelete = () => {
    deleteLog(log.id);
    M.toast({ html: "Log Deleted" });
  };

  const onEdit = () => {
    setCurrent(log);
  };

  return (
    <li className="collection-item">
      <div>
        <a
          onClick={onEdit}
          href="#edit-log-modal"
          className={`modal-trigger ${
            log.attention ? "red-text" : "blue-text"
          }`}
        >
          {log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID# {log.id}</span> last updated by{" "}
          <span className="black-text">
            {firstName} {lastName}
          </span>{" "}
          on <Moment format="MMMM Do YYYY, h:mm:ss">{log.date}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text"> delete</i>
        </a>
      </div>
    </li>
  );
};

const mapStateToProps = state => ({
  techs: state.tech.techs
});

export default connect(mapStateToProps, { deleteLog, setCurrent })(LogItem);
