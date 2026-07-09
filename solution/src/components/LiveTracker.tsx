import { motion } from "motion/react"

export const LiveTracker = ({ live, yesterday, isDesktop }) => {
  return (
    <div className='relative flex bg-[#171719]'>
      <div className='relative z-99 bg-[#CEF739] p-2 py-2.5 text-[0.65rem] flex flex-row items-center gap-3'>
        <div className='w-2 h-2 rounded-full bg-black'></div>
        <p className="xl:text-sm">LIVE MARKETS</p>
      </div>
      {live && (
        <div className='absolute text-[#9D9D9D] flex flex-row inset-0 items-center overflow-hidden'>
          <motion.div
            className='flex flex-row'
            animate={{ x: '-50%'}}
            initial={{ x: '0%'}}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {(isDesktop ? [...live, ...live, ...live, ...live] : [...live, ...live]).map((ex, i) => {

              console.log('yesterday: ', yesterday[i % yesterday.length])
              const percent = (((ex.rate - yesterday[i % yesterday.length].rate) / yesterday[i % yesterday.length].rate) * 100).toFixed(3)
              console.log('Percent: ', percent)
              
              return (
                <div key={i} className='flex flex-row border-r-2 border-[#2E2E2E] gap-3 py-2 px-3 items-center h-full'>
                  <p className='text-[#9D9D9D] text-[0.8rem]'>{ex.base}/{ex.quote}</p>
                  <p className='text-white text-[0.8rem]'>{ex.rate}</p>
                  {yesterday[i % yesterday.length].rate > ex.rate && (
                    <div className='text-[#FF4141] text-[0.8rem] flex flex-row gap-1'>
                      <p>▼</p>
                      <p>{percent}%</p>
                    </div>
                  )}
                  {yesterday[i % yesterday.length].rate < ex.rate && (
                    <div className='text-[#42EB05] text-[0.8rem] flex flex-row gap-1'>
                      <p>▲</p>
                      <p>+{percent}%</p>
                    </div>
                  )}
                </div>
              )
              
            })}
          </motion.div>
        </div>
      )}
    </div>
  )
}