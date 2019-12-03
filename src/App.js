import React, { useEffect, Fragment } from "react";

import { Provider } from "react-redux";
import store from "./store";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

import SearchBar from "./components/layout/SearchBar";
import Logs from "./components/logs/Logs";
import AddBtn from "./components/layout/AddBtn";
import AddLogModel from "./components/logs/AddLogModel";
import EditLogModel from "./components/logs/EditLogModel";
import AddTechModel from "./components/techs/AddTechModal";
import TechListModel from "./components/techs/TechsListModel";
import EditTechModal from "./components/techs/EditTechModal";

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />
        <div className="container">
          <AddBtn />
          <Logs />
        </div>
        <AddLogModel />
        <EditLogModel />
        <AddTechModel />
        <TechListModel />
        <EditTechModal />
      </Fragment>
    </Provider>
  );
};

// What can be done more
// - Add mongoDB instead of json-server
// - on loading the logs check the tech info and pull the info from server

export default App;
