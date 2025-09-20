import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const showMessage = (msg, msgType) => {
    setMessage(msg);
    setType(msgType);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 5000)
  };

  return (
    <MessageContext.Provider value={{ message, type, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
