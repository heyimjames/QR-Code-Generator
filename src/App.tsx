import React from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';

function App() {
  console.log('Rendering App component');
  
  return (
    <div className="min-h-screen bg-ios-background">
      <QRCodeGenerator />
    </div>
  );
}

export default App;