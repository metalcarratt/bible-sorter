import { downloadRcv } from "./verse-sources/download-rcv";

type Props = {
  version: string;
  setVersion: (v: string) => void;
  close: () => void
  apiLog: string[],
  updateLog: (log: string) => void
}

export const MenuModal = ({version, setVersion, close, apiLog, updateLog}: Props) => {
  const onClickDownload = () => {
    console.log('click download');
    downloadRcv(updateLog);
  }

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
          <option value="Saved">Saved</option>
        </select>

        <button onClick={onClickDownload}>Download RCV</button>

        <ul className="apiLogs">
          {apiLog.map(log => <li>{log}</li>)}
        </ul>
      </div>
    </div>
  );
}