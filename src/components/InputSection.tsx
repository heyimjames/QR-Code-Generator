import React from 'react';
import { InputType } from './QRCodeGenerator';
import { Label } from './ui/label';

interface InputSectionProps {
  inputType: InputType;
  setInputType: (type: InputType) => void;
  input: string;
  setInput: (value: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputType,
  setInputType,
  input,
  setInput,
  error,
  setError,
}) => {
  const getInputTypeInfo = (type: InputType) => {
    switch (type) {
      case 'text':
        return {
          placeholder: 'Enter any text, message, or information you want to encode...',
          description: 'Create a QR code for any text content like messages, notes, or identifiers.'
        };
      case 'url':
        return {
          placeholder: 'Enter a website URL (e.g., https://www.example.com)',
          description: 'Generate a QR code that opens a specific website when scanned.'
        };
      case 'contact':
        return {
          placeholder: 'Name:\nPhone:\nEmail:\nAddress:',
          description: 'Create a QR code that saves contact information directly to phones.'
        };
      case 'wifi':
        return {
          placeholder: 'Network Name (SSID):\nPassword:\nSecurity: WPA/WPA2',
          description: 'Generate a QR code that connects devices to your WiFi network.'
        };
      default:
        return {
          placeholder: 'Enter your content here...',
          description: 'Create a QR code for your content.'
        };
    }
  };

  const info = getInputTypeInfo(inputType);

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold text-ios-gray-900 mb-2 block">
          Content Type
        </Label>
        <p className="text-sm text-ios-gray-600 mb-4">{info.description}</p>
        <div className="inline-flex p-1 bg-ios-background rounded-ios">
          {(['text', 'url', 'contact', 'wifi'] as InputType[]).map((type) => (
            <button
              key={type}
              onClick={() => setInputType(type)}
              className={`
                px-4 py-2 rounded-ios text-sm font-medium transition-all
                ${inputType === type 
                  ? 'bg-white text-ios-primary shadow-sm' 
                  : 'text-ios-gray-600 hover:text-ios-gray-900'
                }
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold text-ios-gray-900 block">
          Content
        </Label>
        <p className="text-sm text-ios-gray-600 mb-2">
          Enter the content you want to encode in your QR code.
        </p>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          className="w-full h-32 p-4 rounded-ios border border-ios-separator bg-white/50 
                     focus:outline-none focus:ring-2 focus:ring-ios-primary focus:border-transparent
                     placeholder:text-ios-gray-500 text-ios-gray-900 resize-none"
          placeholder={info.placeholder}
        />
        {error && (
          <p className="mt-2 text-sm text-ios-danger flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};