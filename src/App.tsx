import "./App.css";
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";

function App() {
  const [ipAddress, setIpAddress] = useState([]);
  const portNumber = Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152;

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-ip');
        const data = await response.json();
  
        // Check if the response contains the "Wi-Fi" key
        if (data && data['Wi-Fi'] && Array.isArray(data['Wi-Fi']) && data['Wi-Fi'].length > 0) {
          const wifiIP = data['Wi-Fi'][0]; // Extract the first IP address under "Wi-Fi"
          setIpAddress(wifiIP);
          console.log('IP address:', wifiIP);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
  
    fetchIpAddress();
  }, []);
  
  return (
    <div className="container">
      <h1>Generate QRCode that get local machine IPV4</h1>
      <div className="qr-code-container">
        <div className="qr-code">
          <QRCode
            size={256}
            value={`http://${ipAddress}:${portNumber}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
