import { motion } from "motion/react"

export const Success = ({ success, setSuccess }) => {
    return (
        <motion.div className='fixed z-100 top-2.5 bg-green-700 flex flex-row left-5 right-5 opacity-100 p-2 rounded-lg border-2 border-green-300 text-green-100 items-center justify-center text-[0.7rem] cursor-pointer md:text-sm lg:text-base' onClick={() => setSuccess('')}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
        >
            {success}
        </motion.div>
    )
}