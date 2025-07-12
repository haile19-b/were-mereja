import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import Link from "next/link"
import { Button } from "../../ui/button"
import { FaArrowRight } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { login } from "@/lib/auth-actions"
import { SignInWithGoogleButton } from "../SignInWithGoogle"


export function LoginForm({
    className,
    ...props
  }: React.ComponentProps<"div">) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl dark:shadow-gray-950/50 border-0 dark:border-gray-700/30 rounded-xl overflow-hidden">
            <CardHeader className="text-center space-y-2 pb-4">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center mb-4"
              >
                <span className="text-2xl">🔐</span>
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  {/* Email Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
  
                  {/* Password Field */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline-offset-4 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      required 
                      className="border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
  
                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit" 
                        formAction={login} 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transition-all"
                      >
                        Sign In <FaArrowRight className="ml-2" />
                      </Button>
                    </motion.div>
                    <SignInWithGoogleButton />
                  </div>
                </div>
  
                {/* Sign-up link */}
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link 
                    href="/signin" 
                    className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline-offset-4 hover:underline transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }