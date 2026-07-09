import { AnimatePresence, motion } from 'motion/react'
import chevronDown from '../assets/images/icon-chevron-down.svg'

export const View = ({ view, setView, viewOpen, setViewOpen, views, favorites, logs, user, isDesktop }) => {
  const faveFilter = user ? favorites.filter(f => f.user.id == user.id) : favorites.filter(f => !f.user) 
  const logFilter = user ? logs.filter(l => l.user.id == user.id) : logs.filter(l => !l.user)

    return (
        <div className='p-4 xl:px-40 lg:px-20 bg-black'>
            {!(isDesktop) && (
                <button className='bg-[#171719] text-white rounded-md border border-[#2E2E2E] w-full px-4 py-2' onClick={() => setViewOpen(p => !p)}>
                    <div className='flex flex-row justify-between'>
                        <p>{view}</p>
                        <img src={chevronDown} alt="" />
                    </div>
                    <AnimatePresence>
                        {viewOpen && (
                            <motion.div className='flex flex-col gap-4 mt-4 overflow-hidden'
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                            >
                                {views.filter(v => v != view).map(v => (
                                    <button className='flex flex-row justify-between items-center' onClick={() => setView(v)}>
                                        <p>{v}</p>
                                        {v == 'FAVORITES' && (
                                            <div className='bg-[#283300] rounded-full w-7 h-7 items-center justify-center flex text-sm text-[#CEF739]'>
                                                {faveFilter.length}
                                            </div>
                                        )}
                                        {v == 'LOGGED' && (
                                            <div className='bg-[#283300] rounded-full w-7 h-7 items-center justify-center flex text-sm text-[#CEF739]'>
                                                {logFilter.length}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            )}
            {isDesktop && (
                <div className='flex flex-row text-white gap-4 text-xl w-full border-b border-[#2E2E2E] '>
                    {views.map(v => (
                        <button className={`${v == view ? 'border-b-3 pb-1 border-[#CEF739]' : ''} transition flex flex-row items-center justify-center text-center px-4 cursor-pointer gap-2`} onClick={() => setView(v)}>
                            <p>{v}</p>
                            {v == 'FAVORITES' && (
                                <div className='bg-[#283300] rounded-full w-7 h-7 items-center justify-center flex text-sm text-[#CEF739]'>
                                    {faveFilter.length}
                                </div>
                            )}
                            {v == 'LOGGED' && (
                                <div className='bg-[#283300] rounded-full w-7 h-7 items-center justify-center flex text-sm text-[#CEF739]'>
                                    {logFilter.length}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}