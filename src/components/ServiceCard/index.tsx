import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  card: {
    title: string;
    services: string[][];
    description: string;
    number: string | number;
    classes?: string;
  };
}

const Index: FC<Props> = ({ card: { title, services, description, number, classes = '' } }) => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  return (
    <div ref={ref} key={number} className={`h-full ${classes}`}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-[6px] p-8 md:p-4 lg:p-12 transition-transform duration-300 hover:-translate-y-1 flex flex-col">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(255,255,255,0.10),transparent_60%)]" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(60rem_30rem_at_50%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_30px_90px_-50px_rgba(0,0,0,0.9)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px">
          <div className="h-full w-full rounded-2xl bg-gradient-to-r from-white/25 via-white/10 to-white/25" />
        </div>

        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-6">
            {/* Title */}
            <h2 className="text-[clamp(26px,4.2vw,56px)] lg:text-[clamp(34px,3.2vw,64px)] font-light tracking-tight leading-[1.05]">
              {title}
            </h2>

            {/* Small number on mobile/tablet (large number stays decorative) */}
            <span className="md:hidden text-sm font-semibold tracking-widest text-white/50">
              {number}
            </span>
          </div>

          {/* Content Area */}
          <div className="mt-7 md:mt-9 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start flex-1">
            {/* Services List */}
            <div className="md:col-span-5">
              <ul className="space-y-2.5 md:space-y-3 text-[clamp(14px,1.7vw,18px)] font-medium leading-snug">
                {services.flat().map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="mt-[0.50rem] h-2.5 w-2.5 rounded-full bg-white/25 flex-shrink-0 transition-colors duration-300 group-hover:bg-white/60" />
                    <span className="text-white/90 transition-colors duration-300 group-hover:text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="md:col-span-7 relative">
              <p className="relative z-10 text-[clamp(13px,1.55vw,17px)] font-medium leading-[1.75] md:leading-[1.85] text-white/70 text-balance transition-colors duration-300 group-hover:text-white/85">
                {description}
              </p>

              {/* Large Decorative Number */}
              <div className="absolute -right-3 -top-6 md:-right-4 md:-top-10 lg:-right-6 lg:-top-12 z-0 pointer-events-none select-none">
                <span className="text-[20vw] md:text-[14vw] lg:text-[10vw] font-black tracking-[-0.02em] text-white/[0.07] transition-colors duration-300 group-hover:text-white/[0.10]">
                  {number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;