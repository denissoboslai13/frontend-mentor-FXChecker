import arrowRight from '../assets/images/icon-arrow-right.svg'
import trashCan from '../assets/images/icon-delete.svg'
import { motion } from 'motion/react'

export const Logs = ({ logs, user, removeLog }) => {
    const filtered = user ? logs.filter(l => l.user.id == user.id) : logs.filter(l => !l.user)
    console.log(filtered)
    const today = new Date()
    console.log(today)

    if (user && !filtered.length) return (
        <motion.div className="text-white bg-black flex flex-row mt-6 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >Log your conversion rates!</motion.div>
    )

    // if (!user) return (
    //     <motion.div className="text-white bg-black flex flex-row mt-6 items-center justify-center"
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.2 }}
    //     >Log in to log your conversion rates!</motion.div>
    // )

    return (
        <motion.div className='p-4 text-white xl:px-40 lg:px-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className='bg-[#171719] p-4 rounded-xl'>
                <div className='xl:flex xl:flex-row xl:justify-between'>
                    <h1 className='text-lg xl:text-xl'>CONVERSION LOG</h1>
                        <div className='flex flex-row justify-between mb-4 items-center xl:gap-4'>
                            <p className='text-[#9D9D9D] text-sm'>{filtered.length} LOGGED</p>
                            <button className='bg-[#202022] border border-[#3D3D3D] text-[#9D9D9D] px-2.5 py-1.5 rounded-lg text-sm focus:outline-2 focus:outline-solid focus:outline-[#CEF739]'>CLEAR ALL</button>
                        </div>
                </div>
            
                {filtered.map(l => {
                    const logDate = new Date(l.date.split('T')[0])
                    const diff = today - logDate
                    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
                    return (
                        <div className='bg-[#202022] rounded-xl border border-[#2E2E2E] p-3 flex flex-row justify-between mb-4 hover:border-[#3D3D3D]'>
                            <div className='flex flex-col'>
                                <div className='text-[#9D9D9D]'>
                                    {diffDays <= 30 ? diffDays + 'D' : diffDays > 30 && diffDays <= 365 ? Math.floor(diffDays / 30) + 'M' : Math.floor(diffDays/365) + 'Y'}
                                </div>
                                <div className="flex flex-row items-center gap-2 font-extralight">
                                    <p>{l.base} </p>
                                    <img src={arrowRight} alt="" className='w-3 h-3 overflow-hidden' />
                                    <p>{l.quote} </p>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-3 text-right'>
                                <div className='lg:flex lg:flex-row gap-6'>
                                    <p className='text-[#C6C6C6] xl:text-lg'>{(parseFloat(l.amount)).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                    <p className='text-[#CEF739] xl:text-lg'>{(parseFloat(l.amount) * l.rate.$numberDecimal).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                </div>
                                <button className='bg-[#202022] rounded-lg p-2 border border-[#2E2E2E] focus:outline-2 focus:outline-solid focus:outline-[#CEF739] hover:bg-[#3D3D3D] cursor-pointer transition' onClick={() => removeLog(filtered.find(log => `${log.base}-${log.quote}-${log.rate}-${log.amount}` == `${l.base}-${l.quote}-${l.rate}-${l.amount}`))}>
                                    <img src={trashCan} alt="" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}