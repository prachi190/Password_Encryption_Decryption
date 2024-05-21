import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const EncryptionForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [encryptedPassword, setEncryptedPassword] = useState('');
    const [decryptedPassword, setDecryptedPassword] = useState('');

    const secretKey = 'my-secret-key'; // This should be an environment variable in a real app

    const handleEncrypt = () => {
        const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
        setEncryptedPassword(encrypted);
        sendPayloadToServer({ name, email, encryptedPassword: encrypted });
    };

    const handleDecrypt = () => {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        setDecryptedPassword(decrypted);
        sendPayloadToServer({ name, email, decryptedPassword: decrypted });
    };

    const sendPayloadToServer = async (payload) => {
        try {
            const response = await axios.post('http://localhost:5000/users', payload);
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending payload to server:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Encryption Form</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button style={{ marginRight: '10px' }} onClick={handleEncrypt}>Encrypt Password</button>
            <button onClick={handleDecrypt}>Decrypt Password</button>

            {encryptedPassword && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Encrypted Password</h3>
                    <p>{encryptedPassword}</p>
                </div>
            )}

            {decryptedPassword && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Decrypted Password</h3>
                    <p>{decryptedPassword}</p>
                </div>
            )}
        </div>
    );
};

export default EncryptionForm;
