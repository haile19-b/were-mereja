'use client'

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup, signInWithGoogle } from "@/lib/auth-actions"
import { FcGoogle } from "react-icons/fc"
import { FaUserPlus } from "react-icons/fa"
import { motion } from "framer-motion"

const SignInWithGoogleButton = () => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        type="button"
        variant="outline"
        className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
        onClick={() => signInWithGoogle()}
      >
        <div className="flex items-center justify-center gap-3">
          <FcGoogle className="w-5 h-5" />
          <span>Continue with Google</span>
        </div>
      </Button>
    </motion.div>
  )
}

export function SignUpForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto max-w-md w-full bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-xl overflow-hidden">
        <CardHeader className="text-center space-y-2 pb-4">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-4"
          >
            <FaUserPlus className="text-purple-600 text-xl" />
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Join our community to start connecting
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form>
            <div className="grid gap-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name" className="text-gray-700">First name</Label>
                  <Input
                    name="first-name"
                    id="first-name"
                    placeholder="John"
                    required
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name" className="text-gray-700">Last name</Label>
                  <Input
                    name="last-name"
                    id="last-name"
                    placeholder="Doe"
                    required
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    formAction={signup} 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-200 transition-all"
                  >
                    Create Account
                  </Button>
                </motion.div>
                <SignInWithGoogleButton />
              </div>
            </div>

            {/* Redirect to login */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="font-medium text-purple-600 hover:text-purple-700 underline-offset-4 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  )
}