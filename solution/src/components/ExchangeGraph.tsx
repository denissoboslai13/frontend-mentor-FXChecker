import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { monthName, jsonDate } from '../helpers/formatting'
import { motion } from 'motion/react'

export const ExchangeGraph = ({ graphData, graphLoading, setGraphVis, base, quote, graphVis }) => {
  if (!graphData) return null
  
  console.log('Graph Data: ', graphData)
  const currentDay = graphData[graphData.length -1]
  const yesterday = graphData[graphData.length -2]
  console.log('Current day: ', currentDay)
  const converted = graphData.map(m => ({date: monthName(m), base: m.base, quote: m.quote, rate: m.rate.toFixed(4)}))
  const toDecimal = (tick) => tick.toFixed(3)
  const percent = (((currentDay.rate - yesterday.rate) / yesterday.rate) * 100).toFixed(3)
  const change = (currentDay.rate - yesterday.rate).toFixed(5)

  return (
    <motion.div className='px-4 p-2 pt-0 flex flex-col xl:px-40 pb-6 lg:px-20 bg-black'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
    >
        <div className='xl:flex xl:flex-row xl:justify-between xl:items-center'>
            <div className='flex flex-col text-white pb-4 gap-3 md:flex-row'>
                <div className='flex flex-row justify-between gap-3'>
                    <div className='flex flex-col bg-[#171719] rounded-2xl border border-[#2E2E2E] w-full px-5 py-2 gap-2 md:py-3 md:gap-4 md:pr-10'>
                        <p className='text-[#9D9D9D] xl:text-lg'>OPEN</p>
                        <p className='text-lg xl:text-xl'>{currentDay.rate}</p>
                    </div>
                    <div className='flex flex-col bg-[#171719] rounded-2xl border border-[#2E2E2E] w-full px-5 py-2 gap-2 md:py-3 md:gap-4 md:pr-10'>
                        <p className='text-[#9D9D9D] xl:text-lg'>LAST</p>
                        <p className='text-lg xl:text-xl'>{yesterday.rate}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between gap-3'>
                    <div className='flex flex-col bg-[#171719] rounded-2xl border border-[#2E2E2E] w-full px-5 py-2 gap-2 md:py-3 md:gap-4 md:pr-10'>
                        {change >= 0 && (
                            <>
                                <p className='text-[#9D9D9D] xl:text-lg'>CHANGE</p>
                                <p className='text-lg text-[#42EB05] xl:text-xl'>+{change}</p>
                            </>
                        )}
                        {change < 0 && (
                            <>
                                <p className='text-[#9D9D9D] xl:text-lg'>CHANGE</p>
                                <p className='text-lg text-[#FF4141] xl:text-xl'>{change}</p>
                            </>
                        )}
                    </div>
                    <div className='flex flex-col bg-[#171719] rounded-2xl border border-[#2E2E2E] w-full px-5 py-2 gap-2 md:py-3 md:gap-4 md:pr-10'>
                        {percent >= 0 && (
                            <>
                                <p className='text-[#9D9D9D] xl:text-lg'>% CHANGE</p>
                                <p className='text-lg text-[#42EB05] xl:text-xl'>▲+{percent}%</p>
                            </>
                        )}
                        {percent < 0 && (
                            <>
                                <p className='text-[#9D9D9D] xl:text-lg'>% CHANGE</p>
                                <p className='text-lg text-[#FF4141] xl:text-xl'>▼{percent}%</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='text-[#9D9D9D] bg-[#171719] rounded-lg p-1 flex flex-row gap-1 w-min mb-4'>
                {['1D', '1W', '1M', '3M', '1Y'].map(d => (
                <button key={d} className={`${d == graphVis ? 'bg-[#2E2E2E] text-white' : ''} transition p-2 px-4 rounded-lg text-sm xl:text-base focus:outline-2 focus:outline-solid focus:outline-[#CEF739] cursor-pointer`} onClick={() => setGraphVis(d)}>{d}</button>
                ))}
            </div>
        </div>
        <div className='flex flex-col bg-[#171719] rounded-2xl border border-[#2E2E2E]'>
            <div className='flex flex-row justify-between items-center p-3'>
                <p className='text-white'>{base}/{quote}</p>
                <p className='text-[#C6C6C6] text-xs'>{(currentDay.rate).toFixed(4)} · {monthName({date: currentDay.date})} 16:00 CET</p>
            </div>
            <ResponsiveContainer width='98%' height={300}>
                {graphLoading && (
                <div className='p-3 text-white'>Loading...</div>
                )}
                {!graphLoading && (
                <AreaChart data={converted}>
                    <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CEF739" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#CEF739" stopOpacity={0} />
                    </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="rate" stroke="#CEF739" strokeWidth={3} fill="url(#colorUv)"/>
                    <XAxis dataKey="date"  fontSize={13} minTickGap={20} axisLine={false} tickLine={false}/>
                    <YAxis domain={['auto', 'auto']} tickFormatter={toDecimal} fontSize={14} tickCount={4} type='number' dataKey="rate" axisLine={false} tickLine={false}/>
                    <CartesianGrid vertical={false} strokeDasharray='4 4' strokeOpacity={0.2}/>
                    <Tooltip />
                </AreaChart>
                 )}
            </ResponsiveContainer>
        </div>
    </motion.div>
  )
}