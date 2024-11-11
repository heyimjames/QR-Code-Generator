import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Info, Type, Layout, PaintBucket, CornerUpLeft, Upload } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { FrameStyle, TextPosition } from './QRFrameStyles';

interface QRFrameCustomizerProps {
  frameStyle: FrameStyle;
  setFrameStyle: (style: FrameStyle) => void;
  frameText: string;
  setFrameText: (text: string) => void;
  frameFont: string;
  setFrameFont: (font: string) => void;
  frameColor: string;
  setFrameColor: (color: string) => void;
  textPosition: TextPosition;
  setTextPosition: (position: TextPosition) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  cornerRadius: number;
  setCornerRadius: (radius: number) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontWeight: string;
  setFontWeight: (weight: string) => void;
  textAlign: 'left' | 'center' | 'right';
  setTextAlign: (align: 'left' | 'center' | 'right') => void;
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
}

const GOOGLE_FONTS = [
  { name: 'Roboto', value: "'Roboto', sans-serif" },
  { name: 'Open Sans', value: "'Open Sans', sans-serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Lato', value: "'Lato', sans-serif" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" },
  { name: 'Poppins', value: "'Poppins', sans-serif" },
  { name: 'Source Sans Pro', value: "'Source Sans Pro', sans-serif" },
  { name: 'Ubuntu', value: "'Ubuntu', sans-serif" },
  { name: 'Dancing Script', value: "'Dancing Script', cursive" },
  { name: 'Pacifico', value: "'Pacifico', cursive" },
];

const FONT_WEIGHTS = [
  { name: 'Regular', value: '400' },
  { name: 'Medium', value: '500' },
  { name: 'Semi Bold', value: '600' },
  { name: 'Bold', value: '700' },
];

export const QRFrameCustomizer: React.FC<QRFrameCustomizerProps> = ({
  frameStyle,
  setFrameStyle,
  frameText,
  setFrameText,
  frameFont,
  setFrameFont,
  frameColor,
  setFrameColor,
  textPosition,
  setTextPosition,
  backgroundColor,
  setBackgroundColor,
  cornerRadius,
  setCornerRadius,
  fontSize,
  setFontSize,
  fontWeight,
  setFontWeight,
  textAlign,
  setTextAlign,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
}) => {
  const defaultFrameTexts = [
    'Scan Me',
    'Learn More',
    'Connect',
    'Get Started',
  ];

  const [customFontFamily, setCustomFontFamily] = useState<string | null>(null);

  const handleFontUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'font/ttf' || file.type === 'font/otf' || file.name.endsWith('.ttf') || file.name.endsWith('.otf'))) {
      try {
        // Create a unique font family name
        const fontFamily = `custom-font-${file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-')}`;
        
        // Create a FontFace object
        const fontFace = new FontFace(fontFamily, await file.arrayBuffer());
        
        // Load the font
        await fontFace.load();
        
        // Add the font to the document
        document.fonts.add(fontFace);
        
        // Update the font family and select value
        setCustomFontFamily(fontFamily);
        setFrameFont(fontFamily);
        
        // Update the select element to show the custom font name
        const selectElement = document.getElementById('font-select') as HTMLSelectElement;
        if (selectElement) {
          const option = new Option(file.name, fontFamily);
          option.style.fontFamily = fontFamily;
          
          // Remove any previous custom font option
          const customOptions = Array.from(selectElement.options).filter(opt => opt.value.startsWith('custom-font-'));
          customOptions.forEach(opt => selectElement.remove(opt.index));
          
          selectElement.add(option);
          selectElement.value = fontFamily;
        }
      } catch (error) {
        console.error('Error loading custom font:', error);
      }
    }
  };

  const renderTooltip = (title: string, content: string) => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="ml-2 text-ios-gray-400 hover:text-ios-gray-500 transition-colors">
            <Info size={16} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-ios-gray-900/90 text-white px-4 py-2.5 rounded-ios text-sm max-w-xs"
            sideOffset={5}
          >
            <p>{content}</p>
            <Tooltip.Arrow className="fill-ios-gray-900/90" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  return (
    <div className="space-y-8">
      {/* Frame Style Section */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Label className="text-base font-semibold text-ios-gray-900 flex items-center gap-2">
            <Layout size={16} className="text-ios-gray-500" />
            Frame Style
          </Label>
          {renderTooltip(
            "Frame Style",
            "Choose a style for your QR code frame. Each style offers a unique look while maintaining professional appearance."
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'modern', label: 'Modern', description: 'Clean and minimal' },
            { id: 'classic', label: 'Classic', description: 'Traditional look' },
            { id: 'rounded', label: 'Rounded', description: 'Soft corners' },
            { id: 'shadow', label: 'Shadow', description: 'Elevated look' },
            { id: 'gradient', label: 'Gradient', description: 'Smooth blend' },
            { id: 'custom', label: 'Custom', description: 'Your style' },
          ].map(({ id, label, description }) => (
            <button
              key={id}
              onClick={() => setFrameStyle(id as FrameStyle)}
              className={`
                p-4 rounded-ios border-2 transition-all text-left
                ${frameStyle === id 
                  ? 'border-ios-primary bg-ios-primary/5' 
                  : 'border-ios-separator bg-ios-background hover:bg-ios-gray-50'
                }
              `}
            >
              <span className="block font-medium">{label}</span>
              <span className="text-sm text-ios-gray-500">{description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Label className="text-base font-semibold text-ios-gray-900 flex items-center gap-2">
            <PaintBucket size={16} className="text-ios-gray-500" />
            Colors
          </Label>
          {renderTooltip("Colors", "Customize the colors of your QR code and frame")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-ios-gray-600">QR Code Color</Label>
            <div className="relative group">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="relative w-full h-12 rounded-ios cursor-pointer border border-ios-separator 
                         hover:border-ios-primary transition-colors [&::-webkit-color-swatch-wrapper]:p-1
                         [&::-webkit-color-swatch]:rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-ios-gray-600">QR Background</Label>
            <div className="space-y-2">
              <div className="relative group">
                <input
                  type="color"
                  value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  disabled={bgColor === 'transparent'}
                  className="relative w-full h-12 rounded-ios cursor-pointer border border-ios-separator 
                           hover:border-ios-primary transition-colors [&::-webkit-color-swatch-wrapper]:p-1
                           [&::-webkit-color-swatch]:rounded-md disabled:opacity-50"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bgColor === 'transparent'}
                  onChange={(e) => setBgColor(e.target.checked ? 'transparent' : '#ffffff')}
                  className="rounded-ios border-ios-separator"
                />
                <span className="text-sm text-ios-gray-700">Transparent Background</span>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-ios-gray-600">Text Color</Label>
            <div className="relative group">
              <input
                type="color"
                value={frameColor}
                onChange={(e) => setFrameColor(e.target.value)}
                className="relative w-full h-12 rounded-ios cursor-pointer border border-ios-separator 
                         hover:border-ios-primary transition-colors [&::-webkit-color-swatch-wrapper]:p-1
                         [&::-webkit-color-swatch]:rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-ios-gray-600">Frame Background</Label>
            <div className="relative group">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="relative w-full h-12 rounded-ios cursor-pointer border border-ios-separator 
                         hover:border-ios-primary transition-colors [&::-webkit-color-swatch-wrapper]:p-1
                         [&::-webkit-color-swatch]:rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Settings Group */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Label className="text-base font-semibold text-ios-gray-900 flex items-center gap-2">
            <Type size={16} className="text-ios-gray-500" />
            Text Settings
          </Label>
          {renderTooltip("Text Settings", "Customize the appearance of your frame text")}
        </div>
        
        {/* Font Family */}
        <div className="space-y-2">
          <Label className="text-sm text-ios-gray-600">Font Family</Label>
          <select
            id="font-select"
            value={frameFont}
            onChange={(e) => setFrameFont(e.target.value)}
            className="w-full p-3 rounded-ios border border-ios-separator bg-ios-background 
                     text-ios-gray-900 focus:outline-none focus:ring-2 focus:ring-ios-primary"
            style={{ fontFamily: frameFont }}
          >
            {GOOGLE_FONTS.map(font => (
              <option 
                key={font.value} 
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </select>
          
          {/* Custom Font Upload */}
          <div className="mt-2">
            <input
              type="file"
              accept=".ttf,.otf"
              onChange={handleFontUpload}
              className="hidden"
              id="font-upload"
            />
            <label
              htmlFor="font-upload"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-ios-primary 
                      bg-ios-background rounded-ios hover:bg-ios-gray-50 cursor-pointer"
            >
              <Upload size={16} />
              Upload Custom Font
            </label>
            <p className="mt-1 text-xs text-ios-gray-500">Supports TTF and OTF files</p>
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-ios-gray-600">Font Size</Label>
            <span className="text-sm text-ios-gray-500">{fontSize}px</span>
          </div>
          <Slider
            value={[fontSize]}
            onValueChange={([value]) => setFontSize(value)}
            min={12}
            max={32}
            step={1}
            className="w-full"
          />
        </div>

        {/* Font Weight */}
        <div className="space-y-2">
          <Label className="text-sm text-ios-gray-600">Font Weight</Label>
          <div className="grid grid-cols-4 gap-2">
            {FONT_WEIGHTS.map(weight => (
              <button
                key={weight.value}
                onClick={() => setFontWeight(weight.value)}
                className={`
                  px-3 py-2 rounded-ios text-sm transition-all
                  ${fontWeight === weight.value 
                    ? 'bg-ios-primary text-white' 
                    : 'bg-ios-background text-ios-gray-700 hover:bg-ios-gray-50'
                  }
                `}
              >
                {weight.name}
              </button>
            ))}
          </div>
        </div>

        {/* Text Alignment */}
        <div className="space-y-2">
          <Label className="text-sm text-ios-gray-600">Text Alignment</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'left', icon: 'align-left' },
              { value: 'center', icon: 'align-center' },
              { value: 'right', icon: 'align-right' }
            ].map(({ value, icon }) => (
              <button
                key={value}
                onClick={() => setTextAlign(value as 'left' | 'center' | 'right')}
                className={`
                  px-3 py-2 rounded-ios text-sm transition-all
                  ${textAlign === value 
                    ? 'bg-ios-primary text-white' 
                    : 'bg-ios-background text-ios-gray-700 hover:bg-ios-gray-50'
                  }
                `}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Text Position */}
        <div className="space-y-2">
          <Label className="text-sm text-ios-gray-600">Code Position on Card</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'top', label: 'Text Above' },
              { value: 'bottom', label: 'Text Below' },
              { value: 'left', label: 'Text Left' },
              { value: 'right', label: 'Text Right' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTextPosition(value as TextPosition)}
                className={`
                  px-4 py-2.5 rounded-ios text-sm transition-all
                  ${textPosition === value 
                    ? 'bg-ios-primary text-white' 
                    : 'bg-ios-background text-ios-gray-700 hover:bg-ios-gray-50'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Frame Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-ios-gray-600">Corner Radius</Label>
          <span className="text-sm text-ios-gray-500">{cornerRadius}px</span>
        </div>
        <Slider
          value={[cornerRadius]}
          onValueChange={([value]) => setCornerRadius(value)}
          min={0}
          max={30}
          step={1}
          className="w-full"
        />
      </div>

      {/* Frame Text Input */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-ios-gray-900">Frame Text</Label>
        <Input
          value={frameText}
          onChange={(e) => setFrameText(e.target.value)}
          placeholder="Enter text to display with QR code"
          className="w-full p-3 rounded-ios border border-ios-separator bg-ios-background 
                     text-ios-gray-900 focus:outline-none focus:ring-2 focus:ring-ios-primary"
        />
        <div className="flex flex-wrap gap-2">
          {defaultFrameTexts.map(text => (
            <button
              key={text}
              onClick={() => setFrameText(text)}
              className="px-3 py-1.5 text-sm bg-ios-background rounded-ios text-ios-gray-700 
                       hover:bg-ios-gray-50 transition-colors"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 