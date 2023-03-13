import React, {useState, useEffect, useRef} from 'react';
import './SystemSetting.css';
import axios from "axios";

function SystemSetting() {
  const firstRender = useRef(true);
  const [configList, setConfigList] = useState([]);
  const [entry, setEntry] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      const token = { accessToken: `${localStorage.getItem("accessToken")}` };

      axios
        .get("/smartparking/setting/system/get_all", { headers: token })
        .then((res) => {
          setConfigList(res.data['data']);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = { 
      name:entry,
      status:status,
      msg:message, };

    const token = { accessToken: `${localStorage.getItem("accessToken")}` };

    axios
    .post('/smartparking/setting/system/post/windows/display', data, {headers: token})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleChange = (entry, value, message) => {
    setEntry(entry);
    setStatus(value);
    setMessage(message);
  };

  return (
    <div id='SYSMANAGE-root'>
      <div className="system-setting-container">
        <form onSubmit={handleFormSubmit}>
          {configList.map((entry,index) => (
            <div key={index}>
              <label>{entry.name}</label>
              <label>
                <input 
                type="radio" 
                name="status" 
                value={false} 
                onChange={() => handleChange(entry.name, false, entry.msg)} 
                />
                ปิดระบบ
              </label>
              <label>
                <input 
                type="radio" 
                name="status" 
                value={true} 
                onChange={() => handleChange(entry.name, true, entry.msg)} 
                />
                เปิดระบบ
              </label>
              <button type="submit">Submit</button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default SystemSetting;
