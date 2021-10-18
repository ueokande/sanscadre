import React from "react";
import DocumentClient from "../clients/DocumentClient";
import ClientContext from "../contexts/ClientContext";

const useDocumentClient = (): DocumentClient => {
  const { documentClient } = React.useContext(ClientContext);
  if (typeof documentClient === "undefined") {
    throw new Error("DocumentClient not providerd");
  }
  return documentClient;
};

export default useDocumentClient;
