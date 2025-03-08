import React from 'react';
import Spline from '@splinetool/react-spline';

const Thee3d = ({ className, scene }: { className: string, scene: string }) => {
    return (
      <div className={className}>
        <Spline
          className="w-full h-full"
          scene={scene}
        />
      </div>
    )
  }
  
  export default React.memo(Thee3d)    
