export const ApiLogModal = ({apiLog}: {apiLog: string[]}) => {
  return (
    <div className="modalBg">
      <div className="modal">
        <h2>
          Getting verse...
        </h2>
        <ul className="apiLogs">
          {apiLog.map(log => <li>{log}</li>)}
        </ul>
      </div>
    </div>
  );
}