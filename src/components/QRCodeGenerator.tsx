import React, { useState } from 'react';
import { InputSection } from './InputSection';
import { QRCodePreview } from './QRCodePreview';
import { QRFrameCustomizer } from './QRFrameCustomizer';
import type { FrameStyle, TextPosition } from './QRFrameStyles';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

export type InputType = 'text' | 'url' | 'contact' | 'wifi';
export type QRStyle = 'squares' | 'dots' | 'rounded';
export type CornerStyle = 'square' | 'dot' | 'rounded';

export interface QRCodeData {
  id: string;
  content: string;
  inputType: InputType;
  timestamp: number;
  style: {
    size: number;
    fgColor: string;
    bgColor: string;
    qrStyle: QRStyle;
    cornerStyle: CornerStyle;
    frameStyle: FrameStyle;
    frameText: string;
    frameFont: string;
    frameColor: string;
  };
}

export function QRCodeGenerator() {
  console.log('Rendering QRCodeGenerator');

  // Default values
  const defaultValues = {
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
    qrStyle: 'squares' as QRStyle,
    cornerStyle: 'square' as CornerStyle,
    frameStyle: 'modern' as FrameStyle,
    frameText: 'Scan Me!',
    frameFont: "'Roboto', sans-serif",
    frameColor: '#000000',
    textPosition: 'bottom' as TextPosition,
    backgroundColor: '#ffffff',
    cornerRadius: 10,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center' as const,
  };

  // State declarations with default values
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<InputType>('text');
  const [error, setError] = useState('');
  const [fgColor, setFgColor] = useState(defaultValues.fgColor);
  const [bgColor, setBgColor] = useState(defaultValues.bgColor);
  const [qrStyle, setQRStyle] = useState<QRStyle>(defaultValues.qrStyle);
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>(defaultValues.cornerStyle);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>(defaultValues.frameStyle);
  const [frameText, setFrameText] = useState(defaultValues.frameText);
  const [frameFont, setFrameFont] = useState(defaultValues.frameFont);
  const [frameColor, setFrameColor] = useState(defaultValues.frameColor);
  const [textPosition, setTextPosition] = useState<TextPosition>(defaultValues.textPosition);
  const [backgroundColor, setBackgroundColor] = useState(defaultValues.backgroundColor);
  const [cornerRadius, setCornerRadius] = useState(defaultValues.cornerRadius);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [errorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [highContrast] = useState(false);
  const [gradientColors] = useState<[string, string] | null>(null);
  const [fontSize, setFontSize] = useState(defaultValues.fontSize);
  const [fontWeight, setFontWeight] = useState(defaultValues.fontWeight);
  const [textAlign, setTextAlign] = useState(defaultValues.textAlign);

  // Reset function
  const handleReset = () => {
    setFgColor(defaultValues.fgColor);
    setBgColor(defaultValues.bgColor);
    setQRStyle(defaultValues.qrStyle);
    setCornerStyle(defaultValues.cornerStyle);
    setFrameStyle(defaultValues.frameStyle);
    setFrameText(defaultValues.frameText);
    setFrameFont(defaultValues.frameFont);
    setFrameColor(defaultValues.frameColor);
    setTextPosition(defaultValues.textPosition);
    setBackgroundColor(defaultValues.backgroundColor);
    setCornerRadius(defaultValues.cornerRadius);
    setLogoUrl('');
    setFontSize(defaultValues.fontSize);
    setFontWeight(defaultValues.fontWeight);
    setTextAlign(defaultValues.textAlign);
  };

  // Input validation
  const validateInput = (value: string) => {
    try {
      setInput(value);
      setError('');
    } catch (err) {
      setError('Invalid input');
      console.error('Input validation error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-ios-gray-900">QR Code Generator</h1>
          <p className="text-ios-gray-600">Create custom QR codes for your needs</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-ios-lg shadow-sm p-6 relative">
              {/* Reset Button - Pinned to top-right with updated hover style */}
              <button
                onClick={handleReset}
                className="absolute top-6 right-6 h-9 px-3 text-sm font-medium text-ios-danger 
                         bg-ios-danger/5 rounded-ios transition-colors border border-transparent
                         hover:border-ios-danger"
              >
                Reset to default styling
              </button>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="justify-start">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="frame">Design</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6">
                  <InputSection
                    inputType={inputType}
                    setInputType={setInputType}
                    input={input}
                    setInput={validateInput}
                    error={error}
                    setError={setError}
                  />
                </TabsContent>

                <TabsContent value="frame" className="mt-6">
                  <QRFrameCustomizer
                    frameStyle={frameStyle}
                    setFrameStyle={setFrameStyle}
                    frameText={frameText}
                    setFrameText={setFrameText}
                    frameFont={frameFont}
                    setFrameFont={setFrameFont}
                    frameColor={frameColor}
                    setFrameColor={setFrameColor}
                    textPosition={textPosition}
                    setTextPosition={setTextPosition}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    cornerRadius={cornerRadius}
                    setCornerRadius={setCornerRadius}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    fontWeight={fontWeight}
                    setFontWeight={setFontWeight}
                    textAlign={textAlign}
                    setTextAlign={setTextAlign}
                    fgColor={fgColor}
                    setFgColor={setFgColor}
                    bgColor={bgColor}
                    setBgColor={setBgColor}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <QRCodePreview
                input={input}
                size={defaultValues.size}
                fgColor={fgColor}
                bgColor={bgColor}
                qrStyle={qrStyle}
                cornerStyle={cornerStyle}
                inputType={inputType}
                onSave={handleReset}
                frameStyle={frameStyle}
                frameText={frameText}
                frameFont={frameFont}
                frameColor={frameColor}
                textPosition={textPosition}
                backgroundColor={backgroundColor}
                cornerRadius={cornerRadius}
                logoUrl={logoUrl}
                errorCorrection={errorCorrection}
                highContrast={highContrast}
                gradientColors={gradientColors}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAlign={textAlign}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}