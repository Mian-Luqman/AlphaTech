'use client'
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useAnimation, useMotionValue, PanInfo } from "framer-motion"
import Image from "next/image"

const services = [
    {
        id: 1,
        title: "Transform Your Business Digitally",
        description: "Web Development, SEO, Digital Marketing, Ecommerce & WordPress solutions that make your brand stand out online and reach your target audience effectively.",
        image: "/images/Digitally.jpg"
    },
    {
        id: 2,
        title: "One Partner for All Your Needs",
        description: "From digital services to essential utility services — one partner, one solution. Reliable, efficient and hassle-free support for your business.",
        image: "/images/All.jpg"
    },
    {
        id: 3,
        title: "Reliable Utility Services",
        description: "Merchant Services, Electricity, High-Speed Broadband & Gas solutions. Uninterrupted and trusted services to keep your business running smoothly.",
        image: "/images/Utility.jpg"
    }
]

const SWIPE_THRESHOLD = 50
const GAP = 12 // px gap between cards in mobile slider

const WhatWeDo = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const controls = useAnimation()

    // Detect mobile breakpoint
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Calculate the card width (80% of container) and offset for each slide
    const getCardWidth = useCallback(() => {
        if (!containerRef.current) return 0
        return containerRef.current.offsetWidth * 0.8
    }, [])

    const getOffset = useCallback((index: number) => {
        const cardWidth = getCardWidth()
        return -(index * (cardWidth + GAP))
    }, [getCardWidth])

    // Snap to active index whenever it changes
    useEffect(() => {
        if (isMobile) {
            controls.start({
                x: getOffset(activeIndex),
                transition: { type: "spring", stiffness: 300, damping: 30 }
            })
        }
    }, [activeIndex, isMobile, controls, getOffset])

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offset = info.offset.x
        const velocity = info.velocity.x

        if (offset < -SWIPE_THRESHOLD || velocity < -500) {
            // Swiped left → next card
            setActiveIndex((prev) => Math.min(prev + 1, services.length - 1))
        } else if (offset > SWIPE_THRESHOLD || velocity > 500) {
            // Swiped right → prev card
            setActiveIndex((prev) => Math.max(prev - 1, 0))
        } else {
            // Snap back
            controls.start({
                x: getOffset(activeIndex),
                transition: { type: "spring", stiffness: 300, damping: 30 }
            })
        }
    }

    // Render a single service card
    const renderCard = (service: typeof services[0], index: number, isSlider: boolean) => {
        const isActive = isSlider && activeIndex === index
        return (
            <motion.div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0"
                style={isSlider ? { width: `${80}%` } : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                animate={isSlider ? { scale: isActive ? 1 : 0.92 } : undefined}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                {/* Image */}
                <div className={`relative w-full overflow-hidden ${isSlider ? 'h-[60vh]' : 'h-[70vh]'}`}>
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Text content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        <motion.div
                            animate={{ y: hoveredCard === service.id ? -10 : 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h3 className="text-xl font-semibold leading-snug text-white md:text-2xl">
                                {service.title}
                            </h3>

                            {/* On mobile slider, always show description for the active card */}
                            {isSlider ? (
                                <motion.div
                                    animate={{
                                        height: isActive ? "auto" : 0,
                                        opacity: isActive ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                                        {service.description}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: hoveredCard === service.id ? "auto" : 0,
                                        opacity: hoveredCard === service.id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                                        {service.description}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <section className="w-full py-24 px-6 md:px-4 lg:px-16 2xl:px-24">
            {/* Section Header */}
            <div className="mb-14 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
                >
                    What We Do
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mx-auto max-w-2xl text-base leading-relaxed text-white/60 md:text-lg text-xl"
                >
                    We craft digital solutions that deliver real results — clean code, modern design, and measurable growth.
                </motion.p>
            </div>

            {/* Desktop: Grid Layout */}
            {!isMobile && (
                <div className="grid grid-cols-3 gap-5">
                    {services.map((service, index) => renderCard(service, index, false))}
                </div>
            )}

            {/* Mobile: Swipeable Slider */}
            {isMobile && (
                <div ref={containerRef} className="relative overflow-hidden">
                    <motion.div
                        className="flex"
                        style={{ x, gap: `${GAP}px` }}
                        drag="x"
                        dragConstraints={{
                            left: -(services.length - 1) * (getCardWidth() + GAP),
                            right: 0,
                        }}
                        dragElastic={0.15}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                    >
                        {services.map((service, index) => renderCard(service, index, true))}
                    </motion.div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                        ? "w-6 bg-white"
                                        : "w-2 bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default WhatWeDo

