import React, { useEffect } from "react";
import TechItemModel from "./TechItemModel";

import { connect } from "react-redux";
import { getTechs } from "../../actions/techActions";

const TechListModel = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
  }, [getTechs]);

  return (
    <div id="tech-list-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <ul className="collection with-header">
          <li className="collection-header">
            <h4 className="center">Technician List</h4>
          </li>
          {!loading && techs === null ? (
            <p className="center">No techs to show</p>
          ) : (
            techs.map(tech => <TechItemModel key={tech.id} tech={tech} />)
          )}
        </ul>
        <a href="#tech-modal" className="btn teal modal-trigger">
          <i className="material-icons">person_add</i>
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  padding: "10%"
};

const mapStateToProps = state => ({
  tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechListModel);
