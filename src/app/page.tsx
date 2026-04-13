'use client';

import Navigation from '@/widgets/Navigation';
import Hero from '@/widgets/Hero';
import Services from '@/widgets/Services';
import Approach from '@/widgets/Approach';
import CallToAction from '@/widgets/CallToAction';
import ShadowCursor from '@/components/ui/ShadowCursor';
import WhatWeDo from '@/widgets/WhatWedo/page';

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <WhatWeDo />
      <Services />
      <Approach />
      <CallToAction />
      {/* disable cursor here */}
      <ShadowCursor />
    </>
  );
}
