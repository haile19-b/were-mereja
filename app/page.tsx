'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { FaRocket, FaUserAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-6 py-4 shadow-sm bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-lg">
              <Image src='/logo.png' alt="logo" width={400} height={400}>

              </Image>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Were-Mereja
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-2 sm:space-x-4"
        >
          <Link href="/signin">
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition-colors">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-200">
              Log In
            </Button>
          </Link>
        </motion.div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <Card className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/20">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-4"
              >
                <span className="text-3xl sm:text-4xl">
                <Image src='/logo.png' alt="logo" width={400} height={400} className="rounded-2xl">

                </Image>
                </span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to Were-Mereja
              </h2>
              
              <p className="text-gray-600 sm:text-lg leading-relaxed max-w-2xl mx-auto">
                This is a simple chat app built by <strong className="text-purple-600">Haile Gebriel</strong>, a full-stack developer and software engineering student at ASTU.
                <br />
                It's created to showcase skill and creativity. Your feedback, ideas, and support are highly welcome after logging in!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all">
                    <FaRocket className="mr-2" /> Get Started
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    See Features
                  </Button>
                  </Link>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}