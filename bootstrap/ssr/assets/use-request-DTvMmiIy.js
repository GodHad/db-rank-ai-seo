import "../ssr.js";
import axios from "axios";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/react";
import "@chakra-ui/theme-tools";
import "react-query";
import "react";
const sendRequest = async (form) => {
  const res = await axios.post("/api/claim-dbms", form);
  return res.data;
};
export {
  sendRequest
};
