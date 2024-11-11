import React, { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Upload, Image, X } from 'lucide-react';
import { InputType, QRStyle, CornerStyle } from './QRCodeGenerator';
import { QRFrame } from './QRFrameStyles';
import { toPng } from 'html-to-image';

type ExportFormat = 'PNG' | 'JPG' | 'SVG';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type FrameStyle = 'modern' | 'classic' | 'minimal' | 'fancy' | 'custom';

interface QRCodePreviewProps {
  input: string;
  size: number;
  fgColor: string;
  bgColor: string;
  qrStyle: QRStyle;
  cornerStyle: CornerStyle;
  inputType: InputType;
  onSave: () => void;
  logoUrl?: string;
  frameStyle: FrameStyle;
  frameText: string;
  frameFont: string;
  frameColor: string;
  gradientColors: [string, string] | null;
  errorCorrection: ErrorCorrectionLevel;
  highContrast: boolean;
  textPosition: TextPosition;
  backgroundColor: string;
  cornerRadius: number;
  fontSize: number;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  input,
  size,
  fgColor,
  bgColor,
  qrStyle,
  cornerStyle,
  inputType,
  onSave,
  logoUrl,
  frameStyle,
  frameText,
  frameFont,
  frameColor,
  gradientColors,
  errorCorrection,
  highContrast,
  textPosition,
  backgroundColor,
  cornerRadius,
  fontSize,
  fontWeight,
  textAlign,
}) => {
  const [previewError, setPreviewError] = useState<string>('');
  const [isValidQR, setIsValidQR] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('PNG');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Validation function for different input types
  const validateInput = () => {
    switch (inputType) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          setPreviewError('Invalid email format');
          return false;
        }
        break;
      case 'phone':
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(input)) {
          setPreviewError('Invalid phone number format');
          return false;
        }
        break;
      case 'url':
        try {
          new URL(input);
        } catch {
          setPreviewError('Invalid URL format');
          return false;
        }
        break;
      // Add other validation cases
    }
    setPreviewError('');
    return true;
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // 500KB limit
        setPreviewError('Logo file size must be under 500KB');
        return;
      }
      // Handle logo upload logic
    }
  };

  // Export functions for different formats
  const downloadQRCode = async (format: 'PNG' | 'SVG') => {
    if (!input || !qrCodeRef.current) return;
    
    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `qrcode-${timestamp}`;
      
      if (format === 'PNG') {
        const dataUrl = await toPng(qrCodeRef.current, {
          quality: 1.0,
          pixelRatio: 3,
        });

        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Get the QR code SVG content
        const qrCodeSvg = qrCodeRef.current.querySelector('svg');
        if (!qrCodeSvg) return;

        // Create a new SVG document
        const svgDoc = `
          <?xml version="1.0" encoding="UTF-8" standalone="no"?>
          <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="${size + 80}"
            height="${size + 80}"
            viewBox="0 0 ${size + 80} ${size + 80}"
          >
            <rect
              width="100%"
              height="100%"
              fill="${backgroundColor}"
              rx="${cornerRadius}"
            />
            <g transform="translate(40, ${textPosition === 'bottom' ? '20' : '40'})">
              ${qrCodeSvg.innerHTML}
            </g>
            <text
              x="${textAlign === 'center' ? size/2 + 40 : textAlign === 'right' ? size + 60 : 20}"
              y="${textPosition === 'bottom' ? size + 60 : 25}"
              text-anchor="${textAlign === 'center' ? 'middle' : textAlign}"
              fill="${frameColor}"
              style="font-family: ${frameFont}; font-size: ${fontSize}px; font-weight: ${fontWeight};"
            >${frameText}</text>
          </svg>
        `;

        // Create blob and trigger download
        const blob = new Blob([svgDoc], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.svg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Accessibility keyboard handlers
  const handleKeyboardNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target instanceof HTMLElement) {
        e.target.click();
      }
    }
  };

  // Update QR style mapping
  const getQRStyles = () => ({
    dotsOptions: {
      type: qrStyle === 'dots' ? 'dots' : 
            qrStyle === 'rounded' ? 'rounded' : 
            'square',
      color: fgColor
    },
    cornersSquareOptions: {
      type: cornerStyle === 'dot' ? 'dot' :
            cornerStyle === 'rounded' ? 'rounded' :
            'square',
      color: fgColor
    },
    cornersDotOptions: {
      type: cornerStyle === 'dot' ? 'dot' :
            cornerStyle === 'rounded' ? 'rounded' :
            'square',
      color: fgColor
    }
  });

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* QR Code Preview */}
      <div className="flex justify-center">
        <QRFrame
          ref={qrCodeRef}
          style={frameStyle}
          text={frameText}
          font={frameFont}
          color={frameColor}
          size={size}
          textPosition={textPosition}
          backgroundColor={backgroundColor}
          cornerRadius={cornerRadius}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign={textAlign}
        >
          <QRCodeCanvas
            value={input || ' '}
            size={size}
            level={errorCorrection}
            bgColor={bgColor}
            fgColor={fgColor}
            includeMargin={true}
            {...getQRStyles()}
          />
        </QRFrame>
      </div>

      {/* Hidden SVG for export */}
      <div style={{ display: 'none' }}>
        <QRCodeSVG
          ref={svgRef}
          value={input || ' '}
          size={size}
          level={errorCorrection}
          bgColor={bgColor}
          fgColor={fgColor}
          includeMargin={true}
          {...getQRStyles()}
        />
      </div>

      {/* Export Buttons - Now centered */}
      <div className="flex flex-col gap-3 self-center" style={{ width: `${size + 80}px` }}>
        <button
          onClick={() => downloadQRCode('PNG')}
          disabled={isDownloading || !input}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-ios-primary text-white 
                   font-medium rounded-ios text-sm hover:bg-ios-primary/90 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          {isDownloading ? 'Downloading...' : 'Download PNG'}
        </button>
        <button
          onClick={() => downloadQRCode('SVG')}
          disabled={isDownloading || !input}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-ios-primary 
                   font-medium rounded-ios text-sm border border-ios-primary hover:bg-ios-gray-50 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          {isDownloading ? 'Downloading...' : 'Download SVG'}
        </button>
      </div>
    </div>
  );
};