import React from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import MainRouter from "./MainRouter";

const App = (props) => {
  console.log(props.data);
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
};
function mapStateToProps(state) {
  return {
    data: state,
  };
}
export default connect(mapStateToProps)(App);
