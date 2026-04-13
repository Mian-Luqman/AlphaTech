"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

const CTASection = () => {
    return (
        <section className="relative overflow-hidden bg-background py-24 md:py-32">
            {/* Background glowing effects */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
            <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen" />
            <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px] mix-blend-screen" />

            <div className="mx-auto max-w-[94%] px-4 sm:px-6 md:max-w-[90%] lg:px-8">
                <motion.div
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-16 lg:p-20 shadow-2xl"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Inner glowing edge highlights */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                    <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-blue-400/30 blur-2xl" />
                    <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />

                    <div className="relative flex flex-col items-center text-center z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                        >
                            <Sparkles className="h-4 w-4" />
                            <span>Let&apos;s build something amazing</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
                        >
                            Ready to work with us?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl leading-relaxed"
                        >
                            Let&apos;s transform your ideas into powerful, fast, and scalable digital solutions. Get in touch with our team today and let&apos;s start building the future.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                href="/book"
                                className="group relative w-full sm:w-auto inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                <span className="relative flex items-center gap-2">
                                    Contact Us Today
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>

                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
