import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { FaUserPlus } from "react-icons/fa"
import { SignInWithGoogleButton } from "../SignInWithGoogle"
import Link from "next/link"
import { signup } from "@/lib/auth-actions"

export function SignUpForm() {
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto max-w-md w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl dark:shadow-gray-950/50 border-0 dark:border-gray-700/30 rounded-xl overflow-hidden">
          <CardHeader className="text-center space-y-2 pb-4">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center mb-4"
            >
              <FaUserPlus className="text-purple-600 dark:text-purple-400 text-xl" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Join our community to start connecting
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form>
              <div className="grid gap-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name" className="text-gray-700 dark:text-gray-300">First name</Label>
                    <Input
                      name="first-name"
                      id="first-name"
                      placeholder="John"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name" className="text-gray-700 dark:text-gray-300">Last name</Label>
                    <Input
                      name="last-name"
                      id="last-name"
                      placeholder="Doe"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
  
                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
  
                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                    className="border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
  
                {/* Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      formAction={signup}
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transition-all"
                    >
                      Create Account
                    </Button>
                  </motion.div>
                  <SignInWithGoogleButton/>
                </div>
              </div>
  
              {/* Redirect to login */}
              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline-offset-4 hover:underline transition-colors"
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