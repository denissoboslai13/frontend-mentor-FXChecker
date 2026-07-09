import { useEffect, useState } from "react"
import { getRate } from "../helpers/getData"
import { motion } from "motion/react"
import StarFilled from '../assets/images/icon-star-filled.svg?react'
import starEmpty from '../assets/images/icon-star.svg'

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

export const Compare = ({ amount, base, quote, favorites, createFavorite, removeFavorite, user }) => {
    const [rates, setRates] = useState({})

    const filtered = popular.filter(p => p != base && p != quote)

    useEffect(() => {
        if (!filtered.length) return

        console.log('Hi from useeffect')
        
        Promise.all(
            filtered.map(f => 
            getRate({ base: base, quote: f })
                .then(data => ({ key: `${base}-${f}`, data }))
            )
        ).then(results => {
            const rates = {}
            results.forEach(r => rates[r.key] = r.data)
            setRates(rates)
        })
    }, [amount, base, quote])

    console.log('Rates: ', rates)

    if (!rates) return null

      const addFavorite = ({ quote }) => {
        createFavorite({
            base: base,
            quote: quote
        })
    }

    const faveFilter = user ? favorites.filter(f => f.user.id == user.id) : favorites.filter(f => !f.user)
    const favorited = faveFilter.map(f => `${f.base}-${f.quote}`)
    console.log('Favorites: ', favorited)
    
    return (
        <motion.div className='text-white p-4 xl:px-40 lg:px-20 bg-black'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="bg-[#171719] p-4 rounded-xl">
                <div className="flex flex-col justify-between mb-3 md:flex-row md:items-center md:mb-5">
                    <div className="flex flex-row gap-4 items-center">
                        <h1 className="text-[#9D9D9D] xl:text-lg">MULTI-CURRENCY</h1>
                        <p className="text-lg xl:text-xl">{amount} FROM {base}</p>
                    </div>
                    <p className="text-[#9D9D9D] text-sm xl:text-base">{filtered.length} PAIRS</p>
                </div>
                {filtered.map(f => {
                    const item = rates[`${base}-${f}`]
                    console.log('Item: ', item)
                    
                    
                    if (!item) return (
                        <div className='bg-[#202022] rounded-xl border border-[#2E2E2E] p-4 py-3 flex flex-row justify-between mb-4'>
                            Loading...
                        </div>
                    )
                    
                    return (
                        <div className='bg-[#202022] rounded-xl border border-[#2E2E2E] p-3 py-3 flex flex-row gap-2 justify-between mb-4 hover:border-[#3D3D3D]'>
                            <div className='flex flex-row items-center gap-3 font-extralight'>
                                <img src={currencies[f].flag} alt="" className='w-7 h-7 rounded-full overflow-hidden xl:w-8 xl:h-8'/>
                                <div className="flex flex-col">
                                    <p className="xl:text-lg">{f}</p>
                                    <p className="text-[#9D9D9D] text-xs xl:text-sm">{currencies[f].name}</p>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-3 text-right'>
                                <div className='flex flex-col gap-[0.15rem]'>
                                    <p className="xl:text-lg">{(amount*item[0].rate).toFixed(2)}</p>
                                    <p className="text-xs text-[#9D9D9D]">@ {item[0].rate.toFixed(4)}</p>
                                </div>
                                {(favorited.includes(`${base}-${f}`) && (
                                    <button className='bg-[#202022] rounded-lg p-2 border border-[#CEF739] focus:outline-2 focus:outline-solid focus:outline-[#CEF739] hover:bg-[#283300] cursor-pointer transition' onClick={() => removeFavorite(faveFilter.find(fave => `${base}-${f}` == `${fave.base}-${fave.quote}`))}>
                                        <StarFilled className='fill-[#CEF739] text-[#CEF739]' />
                                    </button>
                                ))}
                                {!(favorited.includes(`${base}-${f}`)) && (
                                    <button className='bg-[#202022] rounded-lg p-2 border border-[#9D9D9D] focus:outline-2 focus:outline-solid focus:outline-[#CEF739] hover:bg-[#3D3D3D] cursor-pointer transition' onClick={() => addFavorite({ quote: f })}>
                                        <img src={starEmpty} alt="" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}