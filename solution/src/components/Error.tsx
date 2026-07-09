import { motion } from "motion/react"

export const Error = ({ error, setError }) => {
    return (
        <motion.div className='fixed z-100 top-2.5 bg-red-700 flex flex-row left-5 right-5 opacity-100 p-2 rounded-lg border-2 border-red-300 text-red-100 items-center justify-center text-[0.7rem] cursor-pointer md:text-sm lg:text-base' onClick={() => setError('')}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
        > 
            {error}
        </motion.div>
    )
}