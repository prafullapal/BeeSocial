import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "./api-auth";

export default function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [values, setValues] = useState({
    error: "",
    loading: "",
    msg: "",
  });
  useEffect(() => {
    verifyEmail({ email, token }).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, msg: data.msg, error: "" });
      }
    });
  }, []);

  return <div>{values.msg}</div>;
}
