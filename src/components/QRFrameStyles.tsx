import React, { forwardRef } from 'react';

export type FrameStyle = 'modern' | 'classic' | 'minimal' | 'fancy' | 'rounded' | 'shadow' | 'gradient' | 'custom';
export type TextPosition = 'top' | 'bottom' | 'left' | 'right';

interface FrameProps {
  style: FrameStyle;
  text: string;
  font: string;
  color: string;
  size: number;
  children: React.ReactNode;
  textPosition: TextPosition;
  backgroundColor?: string;
  cornerRadius?: number;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const QRFrame = forwardRef<HTMLDivElement, FrameProps>(({
  style,
  text,
  font,
  color,
  children,
  textPosition,
  backgroundColor = '#ffffff',
  cornerRadius = 10,
  fontSize = 14,
  fontWeight = '500',
  textAlign = 'center',
}, ref) => {
  const getFrameStyles = () => {
    switch (style) {
      case 'modern':
        return {
          padding: '40px',
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        };
      case 'classic':
        return {
          padding: '40px',
          border: '2px solid #e5e7eb',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        };
      case 'minimal':
        return {
          padding: '20px',
          border: '1px solid #f0f0f0',
        };
      case 'fancy':
        return {
          padding: '40px',
          background: 'linear-gradient(135deg, #fff 0%, #f3f4f6 100%)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        };
      case 'rounded':
        return {
          padding: '40px',
          borderRadius: '30px',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        };
      case 'shadow':
        return {
          padding: '40px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
        };
      case 'gradient':
        return {
          padding: '40px',
          background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        };
      default:
        return {
          padding: '40px',
          background: backgroundColor,
          borderRadius: `${cornerRadius}px`,
        };
    }
  };

  const containerStyle = {
    backgroundColor,
    borderRadius: `${cornerRadius}px`,
    ...getFrameStyles(),
  };

  const textStyle = {
    fontFamily: font,
    color,
    fontSize: `${fontSize}px`,
    fontWeight,
    textAlign,
    marginTop: textPosition === 'bottom' ? '16px' : '0',
    marginBottom: textPosition === 'top' ? '16px' : '0',
    marginLeft: textPosition === 'right' ? '16px' : '0',
    marginRight: textPosition === 'left' ? '16px' : '0',
    width: textPosition === 'top' || textPosition === 'bottom' ? '100%' : 'auto',
    maxWidth: textPosition === 'top' || textPosition === 'bottom' ? '100%' : '120px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.4',
  };

  return (
    <div 
      ref={ref}
      className="flex items-center justify-center"
      style={{
        flexDirection: textPosition === 'bottom' ? 'column' : 
                      textPosition === 'top' ? 'column-reverse' :
                      textPosition === 'right' ? 'row' : 'row-reverse',
        ...containerStyle,
      }}
    >
      {children}
      <div style={textStyle}>
        {text}
      </div>
    </div>
  );
});

QRFrame.displayName = 'QRFrame';