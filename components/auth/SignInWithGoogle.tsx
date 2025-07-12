import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { signInWithGoogle } from "@/lib/auth-actions"


export const SignInWithGoogleButton = () => {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => signInWithGoogle()}
        >
          <div className="flex items-center justify-center gap-3">
            <FcGoogle className="w-5 h-5" />
            <span className="dark:text-gray-200">Continue with Google</span>
          </div>
        </Button>
      </motion.div>
    )
  }