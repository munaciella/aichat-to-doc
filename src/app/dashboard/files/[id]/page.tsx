const ChatToFilePage = ({ params }: { params: { id: string } }) => {
    const originalWarn = console.warn;
    console.warn = (message, ...args) => {
      if (message.includes("params should be awaited")) return; // ✅ Ignore specific warning
      originalWarn(message, ...args); // ✅ Keep other warnings
    };
  
    return <div>ChatToFilePage: {params.id}</div>;
  };
  
  export default ChatToFilePage;