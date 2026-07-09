import { useState, useEffect } from 'react'
import arrowRight from '../assets/images/icon-arrow-right.svg'
import StarFilled from '../assets/images/icon-star-filled.svg?react'
import { motion } from 'motion/react'

import { getGraphs, getRate } from '../helpers/getData'

export const Favorites = ({ favorites, user, removeFavorite }) => {
    const [liveRates, setLiveRates] = useState({})
    const [yesterdayRates, setYesterdayRates] = useState({})

    const filtered = user ? favorites.filter(f => f.user.id == user.id) : favorites.filter(f => !f.user)
    console.log('filtered:', filtered)

    console.log('Faves', favorites)

    useEffect(() => {
        if (!filtered.length) return

        console.log('Hi from useeffect')
        
        Promise.all(
            filtered.map(f => 
            getRate({ base: f.base, quote: f.quote })
                .then(data => ({ key: `${f.base}-${f.quote}`, data }))
            )
        ).then(results => {
            const rates = {}
            results.forEach(r => rates[r.key] = r.data)
            setLiveRates(rates)
        })
    }, [favorites])

    useEffect(() => {
        if (!filtered.length) return
        
        Promise.all(
            filtered.map(f => 
            getGraphs({ graphVis: '1W', base: f.base, quote: f.quote })
                .then(data => ({ key: `${f.base}-${f.quote}`, data }))
            )
        ).then(results => {
            const rates = {}
            results.forEach(r => rates[r.key] = r.data)
            setYesterdayRates(rates)
        })
    }, [favorites])

    console.log('Live: ', liveRates)
    console.log('Yesterday: ', yesterdayRates)
    
    if (user && !filtered.length) return (
        <motion.div className="text-white bg-black flex flex-row mt-6 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            Favorite your favorite conversions!
        </motion.div>
    )

    // if (!user) return (
    //     <motion.div className="text-white bg-black flex flex-row mt-6 items-center justify-center"
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.2 }}
    //     >
    //         Log in to save your favorite conversions!
    //     </motion.div>
    // )

    return (
        <motion.div className='text-white p-4 xl:px-40 lg:px-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="bg-[#171719] p-4 rounded-xl">
                <div className="flex flex-row justify-between mb-3">
                    <h1 className="text-lg">PINNED PAIRS</h1>
                    <p className="text-[#9D9D9D] text-sm">{filtered.length} FAVORITES</p>
                </div>
                {filtered.map((f, i) => {
                    const today = liveRates[`${f.base}-${f.quote}`]
                    const yesterday = yesterdayRates[`${f.base}-${f.quote}`]

                    console.log('Today: ', today)
                    
                    if (!today || !yesterday) return (
                        <div className='bg-[#202022] rounded-xl border border-[#2E2E2E] p-4 py-3 flex flex-row justify-between mb-4'>
                            Loading...
                        </div>
                    )

                    const todayRate = today[0].rate
                    const yesterdayRate = yesterday[yesterday.length -2].rate
                    const percent = (((todayRate - yesterdayRate) / yesterdayRate) * 100).toFixed(3)
                    
                    return (
                        <div className='bg-[#202022] rounded-xl border border-[#2E2E2E] p-4 py-3 flex flex-row justify-between mb-4 hover:border-[#3D3D3D]'>
                            <div className='flex flex-row items-center gap-2 font-extralight'>
                                <p className='xl:text-lg'>{f.base}</p>
                                <img src={arrowRight} alt="" className='w-3 h-3 overflow-hidden' />
                                <p className='xl:text-lg'>{f.quote}</p>
                            </div>
                            <div className='flex flex-row items-center gap-3 text-right'>
                                <div className='flex flex-col gap-[0.15rem]'>
                                    {percent >= 0 && (
                                        <>
                                            <p className='xl:text-lg'>{todayRate}</p>
                                            <p className='text-[0.67rem] text-[#42EB05] xl:text-xs'>▲+{percent}%</p>
                                        </>
                                    )}
                                    {percent < 0 && (
                                        <>
                                            <p className='xl:text-lg'>{todayRate}</p>
                                            <p className='text-[0.67rem] text-[#FF4141] xl:text-xs'>▼{percent}%</p>
                                        </>
                                    )}
                                </div>
                                <button className='bg-[#202022] rounded-lg p-2 border border-[#CEF739] focus:outline-2 focus:outline-solid focus:outline-[#CEF739] hover:bg-[#3D3D3D] cursor-pointer transition' onClick={() => removeFavorite(filtered.find(fave => `${f.base}-${f.quote}` == `${fave.base}-${fave.quote}`))}>
                                    <StarFilled className='fill-[#CEF739] text-[#CEF739]' />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}