import React from "react";
import AppDispatchContext from "../contexts/AppDispatchContext";
import AppStateContext from "../contexts/AppStateContext";
import useDocumentObserver from "../../renderer/hooks/useDocumentObserver";
import useCursorObserver from "../../renderer/hooks/useCursorObserver";

const AppProvider: React.FC = ({ children }) => {
  const [active, setActive] = React.useState(0);
  const [pageIds, setPageIds] = React.useState<string[]>([]);
  const documentObserver = useDocumentObserver();
  const cursorObserver = useCursorObserver();

  React.useEffect(() => {
    documentObserver.onPagesChanged((pageIds: string[]) => {
      setPageIds(pageIds);
    });
  }, []);

  React.useEffect(() => {
    cursorObserver.onCurrentPageChanged((index: number) => {
      setActive(index);
    });
  }, []);

  return (
    <AppStateContext.Provider value={{ active, pageIds }}>
      <AppDispatchContext.Provider value={{ setActive, setPageIds }}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppProvider;
