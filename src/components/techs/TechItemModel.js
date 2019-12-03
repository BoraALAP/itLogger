import React from "react";
import { connect } from "react-redux";
import { deleteTech, setCurrentTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";

const TechItemModel = ({ tech, deleteTech, setCurrentTech }) => {
  const onDelete = () => {
    deleteTech(tech.id);
    M.toast({ html: `${tech.firstName} ${tech.lastName} Deleted` });
  };

  const onEdit = () => {
    setCurrentTech(tech);
  };
  return (
    <li className="collection-item">
      <div>
        <a
          onClick={onEdit}
          href="#edit-tech-modal"
          className="modal-trigger blue-text"
        >
          {tech.firstName} {tech.lastName}
        </a>

        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text"> delete</i>
        </a>
      </div>
    </li>
  );
};

export default connect(null, { deleteTech, setCurrentTech })(TechItemModel);
