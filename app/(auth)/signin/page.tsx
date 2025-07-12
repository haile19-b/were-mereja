'use client'

import React from "react"
import { SignUpForm } from "@/components/auth/SignIn/SignUpForm"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  )
}