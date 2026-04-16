type Props = {
  version: string;
  setVersion: (v: string) => void;
  close: () => void
  apiLog: string[]
}

export const MenuModal = ({version, setVersion, close, apiLog}: Props) => {
  return (
    <div className="modalBg">
      <div className="modal">
        <h2>
          <span>Menu</span>
          <button className="link" onClick={close}>x</button>
        </h2>

        <select
          className="chooseVersion"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        >
          <option value="RCV">RCV</option>
          <option value="ASV">ASV</option>
        </select>

        <ul className="apiLogs">
          {apiLog.map(log => <li>{log}</li>)}
        </ul>
      </div>
    </div>
  );
}