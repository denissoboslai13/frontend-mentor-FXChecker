import chevronDown from '../assets/images/icon-chevron-down.svg'
import exVert from '../assets/images/icon-exchange-vertical.svg'
import exHor from '../assets/images/icon-exchange.svg'
import starEmpty from '../assets/images/icon-star.svg'
import StarFull from '../assets/images/icon-star-filled.svg?react'
import { AnimatePresence, motion } from 'motion/react'

const flags: Record<string, string> = import.meta.glob(
  '../assets/images/flags/*.webp',
  { eager: true, import: 'default' }
)

const getFlag = (code: string) => flags[`../assets/images/flags/${code.toLowerCase()}.webp`]

const currencies = {
  AED: { flag: getFlag('ae'), name: 'UAE Dirham' },
  ARS: { flag: getFlag('ar'), name: 'Argentine Peso' },
  AUD: { flag: getFlag('au'), name: 'Australian Dollar' },
  BDT: { flag: getFlag('bd'), name: 'Taka' },
  BGN: { flag: getFlag('bg'), name: 'Bulgarian Lev' },
  BHD: { flag: getFlag('bh'), name: 'Bahraini Dinar' },
  BRL: { flag: getFlag('br'), name: 'Brazilian Real' },
  CAD: { flag: getFlag('ca'), name: 'Canadian Dollar' },
  CHF: { flag: getFlag('ch'), name: 'Swiss Franc' },
  CLP: { flag: getFlag('cl'), name: 'Chilean Peso' },
  CNY: { flag: getFlag('cn'), name: 'Yuan Renminbi' },
  COP: { flag: getFlag('co'), name: 'Colombian Peso' },
  CZK: { flag: getFlag('cz'), name: 'Czech Koruna' },
  DKK: { flag: getFlag('dk'), name: 'Danish Krone' },
  EGP: { flag: getFlag('eg'), name: 'Egyptian Pound' },
  EUR: { flag: getFlag('eu'), name: 'Euro' },
  GBP: { flag: getFlag('gb'), name: 'Pound Sterling' },
  HKD: { flag: getFlag('hk'), name: 'Hong Kong Dollar' },
  HNL: { flag: getFlag('hn'), name: 'Honduran Lempira' },
  HTG: { flag: getFlag('ht'), name: 'Haitian Gourde' },
  HUF: { flag: getFlag('hu'), name: 'Forint' },
  IDR: { flag: getFlag('id'), name: 'Rupiah' },
  INR: { flag: getFlag('in'), name: 'Indian Rupee' },
  ISK: { flag: getFlag('is'), name: 'Iceland Krona' },
  JOD: { flag: getFlag('jo'), name: 'Jordanian Dinar' },
  JPY: { flag: getFlag('jp'), name: 'Yen' },
  KES: { flag: getFlag('ke'), name: 'Kenyan Shilling' },
  KRW: { flag: getFlag('kr'), name: 'Won' },
  KWD: { flag: getFlag('kw'), name: 'Kuwaiti Dinar' },
  LBP: { flag: getFlag('lb'), name: 'Lebanese Pound' },
  LKR: { flag: getFlag('lk'), name: 'Sri Lanka Rupee' },
  MAD: { flag: getFlag('ma'), name: 'Moroccan Dirham' },
  MXN: { flag: getFlag('mx'), name: 'Mexican Peso' },
  MYR: { flag: getFlag('my'), name: 'Malaysian Ringgit' },
  NGN: { flag: getFlag('ng'), name: 'Naira' },
  NOK: { flag: getFlag('no'), name: 'Norwegian Krone' },
  NPR: { flag: getFlag('np'), name: 'Nepalese Rupee' },
  NZD: { flag: getFlag('nz'), name: 'New Zealand Dollar' },
  OMR: { flag: getFlag('om'), name: 'Rial Omani' },
  PEN: { flag: getFlag('pe'), name: 'Peruvian Sol' },
  PHP: { flag: getFlag('ph'), name: 'Philippine Peso' },
  PKR: { flag: getFlag('pk'), name: 'Pakistan Rupee' },
  PLN: { flag: getFlag('pl'), name: 'Zloty' },
  QAR: { flag: getFlag('qa'), name: 'Qatari Rial' },
  RON: { flag: getFlag('ro'), name: 'Romanian Leu' },
  RUB: { flag: getFlag('ru'), name: 'Russian Ruble' },
  SAR: { flag: getFlag('sa'), name: 'Saudi Riyal' },
  SEK: { flag: getFlag('se'), name: 'Swedish Krona' },
  SGD: { flag: getFlag('sg'), name: 'Singapore Dollar' },
  THB: { flag: getFlag('th'), name: 'Baht' },
  TRY: { flag: getFlag('tr'), name: 'Turkish Lira' },
  TWD: { flag: getFlag('tw'), name: 'New Taiwan Dollar' },
  UAH: { flag: getFlag('ua'), name: 'Hryvnia' },
  USD: { flag: getFlag('us'), name: 'US Dollar' },
  VND: { flag: getFlag('vn'), name: 'Dong' },
  ZAR: { flag: getFlag('za'), name: 'Rand' },
}

const popular = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY']

export const Converter = ({ base, setBase, quote, setQuote, rate, amount, setAmount, handleReverse, baseOpen, setBaseOpen, quoteOpen, setQuoteOpen, baseSearch, setBaseSearch, quoteSearch, setQuoteSearch, favorites, createFavorite, removeFavorite, logs, createLog, removeLog, user, isDesktop }) => {
  console.log('quoteSearch: ', quoteSearch)

  const faveFilter = user ? favorites.filter(f => f.user.id == user.id) : favorites.filter(f => !f.user) 
  const logFilter = user ? logs.filter(l => l.user.id == user.id) : logs.filter(l => !l.user)

  const favorited = faveFilter.map(f => `${f.base}-${f.quote}`)
  const logged = logFilter.map(f => `${f.base}-${f.quote}-${f.rate}-${f.amount}`)
  console.log('favorited: ', favorited)
  console.log('Base and quote: ', `${base}-${quote}`)

  const addFavorite = () => {
    createFavorite({
      base: base,
      quote: quote
    })
  }

  const logDay = new Date()

  const addLog = () => {
    createLog({
      base: base,
      quote: quote,
      rate: rate[0].rate,
      amount: amount,
      date: logDay
    })
  }

  return (
    <div className='p-4 mt-4 xl:px-40 lg:px-20'>
      <p className='text-white text-[1.15rem]'>CHECK THE RATE</p>
      <div className='bg-[#171719] rounded-2xl mt-4'>
        <div className='flex flex-col gap-4 items-center border-b-2 border-dashed border-[#2e2e2e] p-4 md:flex-row'>
          <div className='bg-[#202022] rounded-2xl border border-[#2E2E2E] p-4 py-3 flex flex-col gap-4 w-full relative xl:p-5'>
            <p className='text-[#C6C6C6]'>SEND</p>
            <div className='flex flex-row text-white justify-between items-center'>
              {/* <p className='text-3xl'>{amount}</p> */}
              <input className='text-3xl w-40 xl:text-4xl focus:outline-2 focus:outline-solid focus:outline-[#CEF739] rounded-lg' placeholder={amount} onChange={({ target }) => setAmount(target.value)}/>
              <div>
                <button onClick={() => setBaseOpen(!baseOpen)} className="cursor-pointer flex flex-row bg-[#2e2e2e] rounded-lg border border-[#3D3D3D] hover:bg-[#3D3D3D] transition p-2 gap-2 items-center focus:outline-2 focus:outline-solid focus:outline-[#CEF739]">
                  <img src={currencies[base].flag} alt="" className='w-6 h-6 rounded-full overflow-hidden'/>
                  <p className='text-sm'>{base}</p>
                  <img src={chevronDown} alt="" className='w-3 h-3'/>
                </button>
                <AnimatePresence>
                  {baseOpen && (
                    <motion.div className='absolute top-28 left-0 right-0 z-51 bg-[#1a1a1a] border border-[#2E2E2E] rounded overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden origin-top px-2 pb-2' key={baseOpen}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    >
                      <div className='w-full py-2'>
                        <input type="text" autoFocus value={baseSearch} placeholder='Search Currencies...' onChange={e => setBaseSearch(e.target.value.toUpperCase())} className='w-full outline-1 outline-solid outline-[#9d9d9d] p-2 px-3 rounded-md text-sm focus:outline-[#CEF739] transition'/>
                      </div>
                      {(baseSearch ? Object.keys(currencies).filter(c => c.includes(baseSearch)) : popular.filter(p => p !== quote && p != base)).map(currency => (
                        <button key={currency} onClick={() => { setBase(currency); setBaseOpen(false); setBaseSearch('')}} className='flex flex-row items-center gap-2 px-2 py-2 cursor-pointer hover:bg-[#2E2E2E] focus:outline-2 focus:outline-solid focus:outline-[#CEF739] w-[100%] rounded-lg'>
                          <img src={currencies[currency].flag} alt="" className='w-6 h-6 rounded-full overflow-hidden'/>
                          <p className='text-sm'>{currency}</p>
                          <p className='ml-2 text-xs text-[#9d9d9d]'>{currencies[currency].name}</p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {isDesktop && (
            <button className='bg-[#202022] rounded-lg border border-[#2E2E2E] hover:bg-[#2E2E2E] transition cursor-pointer p-3 focus:outline-2 focus:outline-solid focus:outline-[#CEF739]' onClick={() => handleReverse()}>
              <img src={exHor} alt="" className='md:w-8 xl:w-10'/>
            </button>
          )}
          {!(isDesktop) && (
            <button className='bg-[#202022] rounded-lg border border-[#2E2E2E] hover:bg-[#2E2E2E] transition cursor-pointer p-3 focus:outline-2 focus:outline-solid focus:outline-[#CEF739]' onClick={() => handleReverse()}>
              <img src={exVert} alt="" />
            </button>
          )}
          <div className='bg-[#202022] rounded-2xl border border-[#2E2E2E] p-4 py-3 flex flex-col gap-4 w-full mb-1 relative xl:p-5'>
            <p className='text-[#C6C6C6]'>RECEIVE</p>
            <div className='flex flex-row text-white justify-between items-center'>
              <p className='text-3xl text-[#CEF739] xl:text-4xl'>{(amount && rate) && ((amount*rate[0].rate).toFixed(2))}</p>
              <div>
                <button onClick={() => setQuoteOpen(!quoteOpen)} className="cursor-pointer flex flex-row bg-[#2e2e2e] rounded-lg border border-[#3D3D3D] hover:bg-[#3D3D3D] transition p-2 gap-2 items-center focus:outline-2 focus:outline-solid focus:outline-[#CEF739]">
                  <img src={currencies[quote].flag} alt="" className='w-6 h-6 rounded-full overflow-hidden'/>
                  <p className='text-sm'>{quote}</p>
                  <img src={chevronDown} alt="" className='w-3 h-3'/>
                </button>
                <AnimatePresence>
                  {quoteOpen && (
                    <motion.div className='absolute top-28 left-0 right-0 z-50 bg-[#1a1a1a] border border-[#2E2E2E] rounded overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden origin-top px-2 pb-2' key={quoteOpen}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    >
                      <div className='w-full py-2'>
                        <input type="text" autoFocus value={quoteSearch} placeholder='Search Currencies...' onChange={e => setQuoteSearch(e.target.value.toUpperCase())} className='w-full outline-1 outline-solid outline-[#9d9d9d] p-2 px-3 rounded-md text-sm focus:outline-[#CEF739] transition'/>
                      </div>
                      {(quoteSearch ? Object.keys(currencies).filter(c => c.includes(quoteSearch) && c != base && c != quote) : popular.filter(p => p !== quote && p != base)).map(currency => (
                        <button key={currency} onClick={() => { setQuote(currency); setQuoteOpen(false); setQuoteSearch('')}} className='flex flex-row items-center gap-2 px-2 py-2 cursor-pointer hover:bg-[#2E2E2E] focus:outline-2 focus:outline-solid focus:outline-[#CEF739] w-[100%] rounded-lg'>
                          <img src={currencies[currency].flag} alt="" className='w-6 h-6 rounded-full overflow-hidden'/>
                          <p className='text-sm'>{currency}</p>
                          <p className='ml-2 text-xs text-[#9d9d9d]'>{currencies[currency].name}</p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center p-4 gap-3 md:flex-row md:justify-between'>
          <p className='text-[#C6C6C6] text-[0.7rem] -mt-1 xl:text-sm'>1 {base} = {(rate) && ((1*rate[0].rate).toFixed(3))} {quote}</p>
          <div className='flex flex-row gap-2'>
            {(favorited.includes(`${base}-${quote}`)) && (
              <button className='p-1 px-3 border border-[0.1rem] border-[#CEF739] bg-[#CEF739] text-sm rounded-lg text-black flex flex-row gap-1 items-center pl-2.5 focus:outline-6 focus:outline-double focus:outline-[#CEF739] cursor-pointer active:outline-none' onClick={() => removeFavorite(faveFilter.find(f => `${f.base}-${f.quote}` == `${base}-${quote}`))}>
                <StarFull className='fill-black'/>
                <p className='font-semibold'>FAVORITED</p>
              </button>
            )}
            {!(favorited.includes(`${base}-${quote}`)) && (
              <button className='p-1 px-3 border border-[0.1rem] border-[#CEF739] text-sm rounded-lg text-white flex flex-row gap-1 items-center pl-2.5 focus:outline-6 focus:outline-double focus:outline-[#CEF739] hover:bg-[#283300] cursor-pointer transition active:outline-none' onClick={() => addFavorite()}>
                <img src={starEmpty} alt="" />
                <p>FAVORITE</p>
              </button>
            )}
            {!(logged.includes(`${base}-${quote}-${rate}-${amount}`)) && (
              <button className='p-1 px-3 border border-[0.1rem] border-[#CEF739] text-sm rounded-lg text-white focus:outline-6 focus:outline-double focus:outline-[#CEF739] hover:bg-[#283300] cursor-pointer transition active:outline-none' onClick={() => addLog()}>LOG CONVERSION</button>
            )}
            {(logged.includes(`${base}-${quote}-${rate}-${amount}`)) && (
              <button className='p-1 px-3 border border-[0.1rem] border-[#CEF739] bg-[#CEF739] text-sm rounded-lg text-black font-semibold focus:outline-6 focus:outline-double focus:outline-[#CEF739] cursor-pointer active:outline-none' onClick={() => removeLog(logFilter.find(log => `${log.base}-${log.quote}-${log.rate}-${log.amount}` == `${base}-${quote}-${rate}-${amount}`))}>CONVERSION LOGGED</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}