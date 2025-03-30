import React, { useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomableContainerProps } from '../../types/types';


const ZoomableContainer = ({ children, onZoomChange, onBackgroundClick }: ZoomableContainerProps) => {
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const timeout = setTimeout(() => {
        wrapperRef.current?.centerView();
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleZoomChange = (ref: any) => {
    console.log('Zoom level:', ref.state.scale);
    if (onZoomChange) {
      onZoomChange(ref.state.scale);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onBackgroundClick) {
      onBackgroundClick();
    }
  };

  return (
    <div 
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      onClick={handleBackgroundClick} 
    >
      <TransformWrapper
        ref={wrapperRef}
        initialScale={1}
        minScale={0.1}
        maxScale={5}
        limitToBounds={false}
        centerZoomedOut={false}
        centerOnInit={true}
        onZoom={handleZoomChange}
        onPanning={(panning) => console.log('Panning position:', panning.state.positionX, panning.state.positionY)}
      >
        {() => (
          <TransformComponent
            wrapperStyle={{ 
              width: '100%', 
              height: '100%'
            }}
            contentStyle={{
              width: '8000px',
              height: '8000px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div 
              style={{ 
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
              onClick={handleBackgroundClick}
            >
              {children}
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ZoomableContainer;