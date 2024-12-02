"use client";
import {useState} from "react";
import CryptoJS from "crypto-js";

export default function EncryptDecrypt() {
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  const handleEncrypt = () => {
    if (!data || !password) {
      alert("Please enter data and password to encrypt.");
      return;
    }
    const ciphertext = CryptoJS.AES.encrypt(data, password).toString();
    setEncryptedData(ciphertext);
    setDecryptedData(""); // Clear any previously decrypted data
  };

  const handleDecrypt = () => {
    if (!encryptedData || !password) {
      alert("Please provide encrypted data and password to decrypt.");
      return;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, password);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) throw new Error("Invalid password");
      setDecryptedData(originalText);
    } catch (error) {
      alert("Decryption failed: Incorrect password or data.");
      console.log(error);
    }
  };

  return (
    <div style={{padding: "20px", maxWidth: "400px", margin: "auto"}}>
      <h2>Encrypt and Decrypt Data</h2>
      <div>
        <textarea
          placeholder="Enter data here"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{width: "100%", height: "100px", marginBottom: "10px"}}
          className="text-black"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{width: "100%", marginBottom: "10px"}}
          className="text-black"
        />
      </div>
      <div>
        <button onClick={handleEncrypt} style={{marginRight: "10px"}}>
          Encrypt
        </button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      {encryptedData && (
        <div>
          <h3>Encrypted Data:</h3>
          <textarea
            readOnly
            value={encryptedData}
            style={{width: "100%", height: "100px", marginTop: "10px"}}
            className="text-black"
          />
        </div>
      )}
      {decryptedData && (
        <div>
          <h3>Decrypted Data:</h3>
          <textarea
            readOnly
            value={decryptedData}
            style={{width: "100%", height: "100px", marginTop: "10px"}}
            className="text-black"
          />
        </div>
      )}
    </div>
  );
}
