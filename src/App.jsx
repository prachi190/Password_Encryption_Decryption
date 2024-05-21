// src/App.js
import React from 'react';
import './App.css';
import EncryptionForm from './components/EncryptionForm';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Encrypt and Decrypt Password</h1>
            </header>
            <main>
                <EncryptionForm />
            </main>
        </div>
    );
}

export default App;
