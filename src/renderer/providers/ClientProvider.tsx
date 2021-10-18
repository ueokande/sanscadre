import React from "react";
import ClientContext from "../contexts/ClientContext";
import CursorClient from "../clients/CursorClient";
import DocumentClient from "../clients/DocumentClient";

const ClientProvider: React.FC = ({ children }) => {
  const cursorClient = React.useMemo(() => new CursorClient(), []);
  const documentClient = React.useMemo(() => new DocumentClient(), []);

  return (
    <ClientContext.Provider value={{ cursorClient, documentClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
