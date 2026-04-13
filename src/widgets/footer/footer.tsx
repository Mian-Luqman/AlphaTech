"use client"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react"

import { siteConfig } from "@/config/site"
import LogoIcon from "@/icons/ApproachIcons/LogoIcon"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.15,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export function Footer() {
  const [siteName, setSiteName] = useState(siteConfig.name)
  const [hoveredText, setHoveredText] = useState(siteConfig.name)
  const [footerDescription, setFooterDescription] = useState(
    "Empowering Your Future - Digital and Utility Services delivers cutting-edge web solutions and essential utility services to transform your business into a digital powerhouse."
  )
  const [contactEmail, setContactEmail] = useState("hello@cadogy.com")
  const [contactAddress, setContactAddress] = useState("Pompano Beach, FL")
  const [socialInstagram, setSocialInstagram] = useState(
    "https://www.instagram.com/cadogyweb"
  )
  const [socialGithub, setSocialGithub] = useState(
    "https://www.github.com/cadogy"
  )
  const [socialLinkedin, setSocialLinkedin] = useState(
    "https://www.linkedin.com/company/cadogy"
  )

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.settings) {
            if (data.settings.siteName) {
              const name = data.settings.siteName.split(" - ")[0]
              setSiteName(name)
              setHoveredText(name)
            }
            if (data.settings.footerDescription) {
              setFooterDescription(data.settings.footerDescription)
            }
            if (data.settings.contactEmail) {
              setContactEmail(data.settings.contactEmail)
            }
            if (data.settings.contactAddress) {
              setContactAddress(data.settings.contactAddress)
            }
            if (data.settings.socialInstagram) {
              setSocialInstagram(data.settings.socialInstagram)
            }
            if (data.settings.socialGithub) {
              setSocialGithub(data.settings.socialGithub)
            }
            if (data.settings.socialLinkedin) {
              setSocialLinkedin(data.settings.socialLinkedin)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [])

  const cipherIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  
  const textCipherEffect = (text: string) => {
    let iterations = 0
    
    if (cipherIntervalRef.current) {
      clearInterval(cipherIntervalRef.current)
    }

    cipherIntervalRef.current = setInterval(() => {
      setHoveredText((prevText) =>
        prevText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index]
            }
            return alphabet[Math.floor(Math.random() * alphabet.length)]
          })
          .join("")
      )
      iterations += 1 / 2
      if (iterations >= text.length) {
        if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)
      }
    }, 50)
  }

  const handleMouseEnter = () => {
    textCipherEffect(siteName)
  }

  const handleMouseLeave = () => {
    if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)
    setHoveredText(siteName)
  }

  return (
    <footer className="relative w-full bg-bg-1/10 backdrop-blur-sm">
      {/* Full width background  image blend*/}
      <div
        className="absolute inset-0 z-[-1] h-full w-full bg-cover bg-[8%_100%] bg-no-repeat opacity-20 mix-blend-luminosity lg:bg-[100%_80%]"
        style={{
          backgroundImage:
            "url('/images/assets/backgrounds/Hillsboro-Lighthouse_alt.jpg')",
        }}
      ></div>
      {/* Gradient blend at top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-1 to-transparent"></div>

      <motion.div
        className="relative mx-auto w-full px-6 py-16 sm:px-8 md:max-w-[90%] md:px-10 md:py-20 lg:px-12 lg:pt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-4 flex items-center">
              <LogoIcon
                width="2rem"
                height="2rem"
                className="md:w-[2.5rem] md:h-[2.5rem] transition-all duration-300 hover:scale-110"
              />
              <h2
                className="ml-3 font-bold text-text-1 md:text-3xl lg:text-4xl"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredText}
              </h2>
            </div>
            <p className="max-w-md text-lg text-text-1/70 md:text-xl ">
              {footerDescription}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-6"
          >
            <h3 className="text-lg font-medium text-text-1 md:text-2xl lg:text-3xl">
              Company
            </h3>
            <ul className="flex flex-col space-y-2 md:space-y-4">
              <motion.li variants={itemVariants}>
                <Link
                  href="/who-we-are"
                  className="flex items-center text-lg text-text-1/70 transition-colors hover:text-text-1 md:text-xl"
                  tabIndex={0}
                  aria-label="Who We Are"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Who We Are</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="/book"
                  className="flex items-center text-lg text-text-1/70 transition-colors hover:text-text-1 md:text-xl "
                  tabIndex={0}
                  aria-label="Contact"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Contact Us</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-6"
          >
            <h3 className="text-lg font-medium text-text-1 md:text-2xl lg:text-3xl">
              Resources
            </h3>
            <ul className="flex flex-col space-y-2 md:space-y-4">
              <motion.li variants={itemVariants}>
                <Link
                  href="/policies/privacy-policy"
                  className="flex items-center text-lg text-text-1/70 transition-colors hover:text-text-1 md:text-xl "
                  tabIndex={0}
                  aria-label="Privacy Policy"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Privacy Policy</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="/policies/terms-of-use"
                  className="flex items-center text-lg text-text-1/70 transition-colors hover:text-text-1 md:text-xl"
                  tabIndex={0}
                  aria-label="Terms of Service"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Terms of Service</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col justify-between gap-6 border-border pt-6 md:mt-16 md:flex-row md:pt-10 lg:items-center">
          <p className="text-left text-sm text-text-1/60 md:text-base lg:text-lg">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer;
