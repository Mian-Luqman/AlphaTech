import { FC } from 'react';

import SectionTitle from '@/components/ui/SectionTitle';
import ServiceCard from '@/components/ServiceCard';

import { CARDS } from '@/data';

interface Props { }

const Index: FC<Props> = () => {
  return (
    <section id="services" className="relative border-t border-gray-1 py-[12vw] md:py-[7vw] lg:py-[5vw] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-64 w-[70rem] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute left-1/2 bottom-20 h-72 w-[80rem] -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative w-full mx-auto px-6 md:px-4 lg:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-6">
            <SectionTitle title="SERVICES." classes="text-left px-0 pt-0" />
            <p className="mt-4 max-w-[52ch] text-[clamp(13px,1.45vw,16px)] leading-[1.85] text-white/70">
              Premium solutions designed to help you grow online and streamline essential utilities — delivered with clarity, speed, and ongoing support.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 backdrop-blur-[6px]">
              <p className="text-[clamp(12px,1.2vw,14px)] text-white/70 leading-relaxed">
                Need a custom package?
              </p>
              <p className="mt-1 text-[clamp(14px,1.6vw,16px)] text-white/90 font-medium leading-relaxed">
                We can combine Digital + Utility services based on your business goals.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-stretch">
          {CARDS.map((card) => (
            <div key={card.title} className="h-full">
              <ServiceCard card={{ ...card, classes: 'h-full' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Index;
