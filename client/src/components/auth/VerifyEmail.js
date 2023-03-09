import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { verifyEmail } from "./api-auth";

function VerifyEmail(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  useEffect(() => {
    verifyEmail({ email, token });
  }, []);

  return (<>
  {props.Loading && <div>Loading...</div>}
  <div>{props.msg}</div>
  {props.error && <div>{props.error}</div>}
  </>
  );
}

function mapStateToProps(state) {
  return {
    msg: state.signup.msg,
    isLoading: state.signup.isLoading,
    error: state.signup.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmail: (payload)=> dispatch(verifyEmail(payload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);