import React, { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Upload, Image, X } from 'lucide-react';
import { InputType, QRStyle, CornerStyle } from './QRCodeGenerator';
import { QRFrame } from './QRFrameStyles';
import { toPng } from 'html-to-image';
import { parse } from 'svg-parser';
import { stringify } from 'svgson';
import ReactDOMServer from 'react-dom/server';

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
      } else if (format === 'SVG') {
        // Create SVG container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const containerWidth = size + 80;
        const containerHeight = size + (textPosition === 'left' || textPosition === 'right' ? 0 : 80);
        
        svg.setAttribute('width', String(containerWidth));
        svg.setAttribute('height', String(containerHeight));
        svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);

        // Add background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', backgroundColor);
        rect.setAttribute('rx', String(cornerRadius));
        svg.appendChild(rect);

        // Add QR Code
        const qrCodeX = textPosition === 'left' ? 120 : 40;
        const qrCodeY = textPosition === 'top' ? 60 : 40;
        
        const qrCodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        qrCodeGroup.setAttribute('transform', `translate(${qrCodeX}, ${qrCodeY})`);
        
        const qrCodeSvg = ReactDOMServer.renderToString(
          <QRCodeSVG
            value={input}
            size={size}
            level="H"
            bgColor={bgColor}
            fgColor={fgColor}
            includeMargin={true}
            {...getQRStyles()}
          />
        );
        qrCodeGroup.innerHTML = qrCodeSvg;
        svg.appendChild(qrCodeGroup);

        // Add text
        if (frameText) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          const textX = textPosition === 'left' ? 20 :
                       textPosition === 'right' ? size + 60 :
                       size / 2 + 40;
          const textY = textPosition === 'top' ? 30 :
                       textPosition === 'bottom' ? size + 60 :
                       size / 2 + 40;

          text.setAttribute('x', String(textX));
          text.setAttribute('y', String(textY));
          text.setAttribute('text-anchor', textAlign);
          text.setAttribute('fill', frameColor);
          text.setAttribute('font-family', font);
          text.setAttribute('font-size', `${fontSize}px`);
          text.setAttribute('font-weight', fontWeight);
          text.textContent = frameText;
          svg.appendChild(text);
        }

        // Convert to blob and download
        const svgString = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
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