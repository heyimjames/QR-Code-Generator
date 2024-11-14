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
  customOptions?: {
    backgroundImage?: string;
    gradientStart?: string;
    gradientEnd?: string;
    gradientDirection?: string;
  };
}

export const QRFrame = forwardRef<HTMLDivElement, FrameProps>(({
  style,
  text,
  font,
  color,
  size,
  children,
  textPosition,
  backgroundColor = '#ffffff',
  cornerRadius = 10,
  fontSize = 14,
  fontWeight = '500',
  textAlign = 'center',
  customOptions,
}, ref) => {
  const getFrameStyles = () => {
    const baseStyles = {
      padding: '40px',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'scale(1)',
      opacity: 1,
      position: 'relative' as const,
      display: 'flex',
      flexDirection: textPosition === 'left' || textPosition === 'right' ? 'row' as const : 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    };

    switch (style) {
      case 'modern':
        return {
          ...baseStyles,
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          transform: 'scale(1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            borderRadius: '16px',
            padding: '1px',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        };
      case 'classic':
        return {
          ...baseStyles,
          border: '2px solid #e5e7eb',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: '8px',
          background: '#ffffff',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-4px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
          },
        };
      case 'minimal':
        return {
          ...baseStyles,
          padding: '20px',
          border: '1px solid #f0f0f0',
          borderRadius: '4px',
          background: '#ffffff',
        };
      case 'fancy':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #fff 0%, #f3f4f6 100%)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-2px',
            borderRadius: '26px',
            padding: '2px',
            background: 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
        };
      case 'rounded':
        return {
          ...baseStyles,
          borderRadius: '30px',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '1px',
            borderRadius: '29px',
            background: 'linear-gradient(145deg, transparent, rgba(255, 255, 255, 0.5))',
            pointerEvents: 'none',
          },
        };
      case 'shadow':
        return {
          ...baseStyles,
          boxShadow: `
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1)
          `,
          border: '1px solid rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
          borderRadius: '12px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #60a5fa, #e879f9)',
            borderRadius: '12px 12px 0 0',
          },
        };
      case 'gradient':
        return {
          ...baseStyles,
          background: customOptions?.gradientStart && customOptions?.gradientEnd
            ? `linear-gradient(${customOptions.gradientDirection || '120deg'}, ${customOptions.gradientStart}, ${customOptions.gradientEnd})`
            : 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transform: 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease-in-out',
        };
      case 'custom':
        return {
          ...baseStyles,
          background: customOptions?.backgroundImage 
            ? `url('${customOptions.backgroundImage}') center/cover no-repeat`
            : backgroundColor || '#ffffff',
          borderRadius: `${cornerRadius}px`,
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transform: 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease-in-out',
        };
      default:
        return {
          ...baseStyles,
          background: backgroundColor || '#ffffff',
          borderRadius: `${cornerRadius}px`,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        };
    }
  };

  const containerStyle = {
    backgroundColor: style === 'custom' && customOptions?.backgroundImage ? 'transparent' : backgroundColor,
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
    width: '100%',
    maxWidth: textPosition === 'left' || textPosition === 'right' ? '120px' : `${size}px`,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.4',
    display: 'block',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  } as const;

  return (
    <div 
      ref={ref}
      className="flex items-center justify-center transform-gpu"
      style={{
        flexDirection: textPosition === 'bottom' ? 'column' : 
                      textPosition === 'top' ? 'column-reverse' :
                      textPosition === 'right' ? 'row' : 'row-reverse',
        ...containerStyle,
      }}
    >
      <div className="transition-transform duration-500 ease-in-out transform-gpu">
        {children}
      </div>
      {text && (
        <div 
          style={textStyle}
          className="transition-all duration-500 ease-in-out transform-gpu"
        >
          {text}
        </div>
      )}
    </div>
  );
});

QRFrame.displayName = 'QRFrame';