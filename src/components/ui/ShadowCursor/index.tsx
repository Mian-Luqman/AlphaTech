'use client'

import { FC, useEffect } from 'react';

import initCursor from '@/shared/utils/useShadowCursor'

interface Props { }

const Index: FC<Props> = () => {

  useEffect(() => {
    // @ts-ignore
    if (!window.__shadowCursorInitialized) {
      initCursor();
      // @ts-ignore
      window.__shadowCursorInitialized = true;
    }
  }, [])
  return (
    <div className='h-screen w-full fixed top-0 left-0 z-[-1] '>
      <canvas id="fluid" className='w-full h-full' />
    </div>
  );
};
export default Index;
