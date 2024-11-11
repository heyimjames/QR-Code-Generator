import React from 'react';
import { Label } from './ui/label';
import { Info } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { QRStyle, CornerStyle } from './QRCodeGenerator';

interface QRCodeStylerProps {
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  qrStyle: QRStyle;
  setQRStyle: (style: QRStyle) => void;
  cornerStyle: CornerStyle;
  setCornerStyle: (style: CornerStyle) => void;
  onReset: () => void;
}

export const QRCodeStyler: React.FC<QRCodeStylerProps> = ({
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  qrStyle,
  setQRStyle,
  cornerStyle,
  setCornerStyle,
  onReset,
}) => {
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
      {/* Reset Button */}
      <div className="flex justify-end">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-ios-danger 
                   hover:bg-ios-danger/5 rounded-ios transition-colors"
        >
          Reset to Default
        </button>
      </div>

      {/* Pattern Style */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Label className="text-base font-semibold text-ios-gray-900">
            Pattern Style
          </Label>
          {renderTooltip(
            "Pattern Style",
            "Choose how the QR code patterns appear."
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'squares', label: 'Square', icon: '⬛' },
            { id: 'dots', label: 'Dots', icon: '⭕' },
            { id: 'rounded', label: 'Rounded', icon: '🔲' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setQRStyle(id as QRStyle)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-ios
                border-2 transition-all
                ${qrStyle === id 
                  ? 'border-ios-primary bg-ios-primary/5' 
                  : 'border-ios-separator bg-ios-background hover:bg-ios-gray-50'
                }
              `}
            >
              <span className="text-2xl mb-2">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold text-ios-gray-900">
            Colors
          </Label>
          {renderTooltip(
            "Colors",
            "Customize the colors of your QR code."
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-ios-gray-600 mb-2 block">QR Code Color</Label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-12 rounded-ios cursor-pointer border border-ios-separator 
                       bg-ios-background appearance-none hover:border-ios-primary"
            />
          </div>
          <div>
            <Label className="text-sm text-ios-gray-600 mb-2 block">Background</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                disabled={bgColor === 'transparent'}
                className="w-full h-12 rounded-ios cursor-pointer border border-ios-separator 
                         bg-ios-background appearance-none hover:border-ios-primary
                         disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bgColor === 'transparent'}
                  onChange={(e) => setBgColor(e.target.checked ? 'transparent' : '#ffffff')}
                  className="rounded-ios border-ios-separator"
                />
                <span className="text-sm text-ios-gray-700">Transparent</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Style */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Label className="text-base font-semibold text-ios-gray-900">
            Corner Style
          </Label>
          {renderTooltip(
            "Corner Style",
            "Choose the style for the three position markers in the corners."
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'square', label: 'Square', icon: '⬛' },
            { id: 'dot', label: 'Dot', icon: '⭕' },
            { id: 'rounded', label: 'Rounded', icon: '🔲' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setCornerStyle(id as CornerStyle)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-ios
                border-2 transition-all
                ${cornerStyle === id 
                  ? 'border-ios-primary bg-ios-primary/5' 
                  : 'border-ios-separator bg-ios-background hover:bg-ios-gray-50'
                }
              `}
            >
              <span className="text-2xl mb-2">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};