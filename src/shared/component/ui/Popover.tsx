// src/components/ui/Popover.tsx
import React, { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface PopoverProps {
  trigger: React.ReactElement<any>;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end';
  offset?: number;
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = 'bottom',
  offset = 8,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false), isOpen);

  const getPlacementStyles = () => {
    // Tailwind CSS의 동적 클래스 생성 제한으로 인해 직접 스타일 객체 반환
    const baseStyles = 'absolute z-50';
    
    switch (placement) {
      case 'bottom':
        return {
          className: `${baseStyles} top-full left-1/2 -translate-x-1/2`,
          style: { marginTop: `${offset}px` }
        };
      case 'bottom-start':
        return {
          className: `${baseStyles} top-full left-0`,
          style: { marginTop: `${offset}px` }
        };
      case 'bottom-end':
        return {
          className: `${baseStyles} top-full right-0`,
          style: { marginTop: `${offset}px` }
        };
      case 'top':
        return {
          className: `${baseStyles} bottom-full left-1/2 -translate-x-1/2`,
          style: { marginBottom: `${offset}px` }
        };
      case 'left':
        return {
          className: `${baseStyles} right-full top-1/2 -translate-y-1/2`,
          style: { marginRight: `${offset}px` }
        };
      case 'right':
        return {
          className: `${baseStyles} left-full top-1/2 -translate-y-1/2`,
          style: { marginLeft: `${offset}px` }
        };
      default:
        return {
          className: `${baseStyles} top-full left-1/2 -translate-x-1/2`,
          style: { marginTop: `${offset}px` }
        };
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const placementStyles = getPlacementStyles();

  return (
    <div className="relative inline-block" ref={ref}>
      {React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          handleTriggerClick(e);
          // 원본 onClick 핸들러가 있다면 실행
          if (trigger.props.onClick) {
            trigger.props.onClick(e);
          }
        }
      })}
      
      {isOpen && (
        <div
          className={`${placementStyles.className} ${className}`}
          style={placementStyles.style}
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;