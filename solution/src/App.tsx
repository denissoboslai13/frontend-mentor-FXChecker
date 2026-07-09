import { useState, useEffect } from 'react'
import './App.css'

import { Header } from './components/Header'
import { LiveTracker } from './components/LiveTracker'
import { Converter } from './components/Converter'
import { ExchangeGraph } from './components/ExchangeGraph'
import { Login } from './components/Login'
import { Logs } from './components/Logs'

import { getLive, getGraphs, getYesterday, getRate } from './helpers/getData'

import loginService from './components/services/login'
import logService from './components/services/logs'
import favoriteService from './components/services/favorite'
import registerService from './components/services/register'

import { Route, Routes, useNavigate } from 'react-router'
import { Favorites } from './components/Favorites'
import { Success } from './components/Success'
import { Error } from './components/Error'
import { AnimatePresence } from 'motion/react'
import { Compare } from './components/Compare'
import { View } from './components/View'
import { useMediaQuery } from 'react-responsive'
import { Register } from './components/Register'
import { UserScreen } from './components/UserScreen'
import { Logout } from './components/Logout'

const views = ['HISTORY', 'COMPARE', 'FAVORITES', 'LOGGED']

function App() {
  const [live, setLive] = useState(0)
  const [yesterday, setYesterday] = useState(0)
  const [graphVis, setGraphVis] = useState('1W')
  const [graphLoading, setGraphLoading] = useState(false)
  const [graphData, setGraphData] = useState(0)
  const [view, setView] = useState('HISTORY')
  const [viewOpen, setViewOpen] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [logs, setLogs] = useState([])
  const [favorites, setFavorites] = useState([])
  const [base, setBase] = useState('USD')
  const [quote, setQuote] = useState('GBP')
  const [rate, setRate] = useState("")
  const [amount, setAmount] = useState(1000)
  const [baseOpen, setBaseOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [baseSearch, setBaseSearch] = useState('')
  const [quoteSearch, setQuoteSearch] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      logService.setToken(user.token)
      favoriteService.setToken(user.token)
      setUser(user)
    }
  }, []);
  
  useEffect(() => {
    const getData = async () => {
      const [logData, favoriteData] = await Promise.all([
        logService.getAll(),
        favoriteService.getAll()
      ])
      setLogs(logData)
      setFavorites(favoriteData)
    }
    getData()
  }, [graphVis])

  useEffect(() => {
    const getData = async () => {
      const [liveData, yesterdayData] = await Promise.all([
        getLive(),
        getYesterday(),
      ])
      setLive(liveData)
      setYesterday(yesterdayData)
    }
    getData()
  }, [])

  useEffect(() => {
    const getGraph = async () => {
      setGraphLoading(true)
      const data = await getGraphs({ graphVis: graphVis, base: base, quote: quote })
      setGraphData(data)
      setGraphLoading(false)
    }
    getGraph()
  }, [graphVis, base, quote])

  useEffect(() => {
    const getRateData = async () => {
      const data = await getRate({ base: base, quote: quote})
      setRate(data)
      console.log('rate for base: ', base, 'and quote: ', quote, 'is: ', data)
    }
    getRateData()
  }, [base, quote])

  const handleReverse = () => {
    let help = base
    console.log('old base and quote: ', base, quote, 'new base and quote: ', base, quote)
    setBase(quote)
    setQuote(help)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      logService.setToken(user.token)
      favoriteService.setToken(user.token)
      setUsername("")
      setPassword("")
      setUser(user)
      console.log("user: ", user);
      setSuccess(`Successfully logged in as ${user.username}!`)
      setTimeout(() => setSuccess(''), 3000)
      navigate('/')
    } catch {
      console.log("caught error in login")
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault()
    console.log("registering with", name, username, password);

    try {
      await registerService.create({ name, username, password })
      setName("")
      setUsername("")
      setPassword("")
      navigate('/login')
      setSuccess(`Successfully registered! Please log in!`)
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      console.log("caught error in login")
    }
  };

  const handleLogout = () => {
    window.localStorage.clear()
    setUser("")
    navigate("/")
  };

  const createFavorite = async (fave) => {
    if (!user) {
      setFavorites(p => p.concat({ base: fave.base, quote: fave.quote, id: Date.now() }))
      setSuccess(`Successfully favorited ${fave.base} to ${fave.quote}! Log in to save permanently!`)
      setTimeout(() => setSuccess(''), 3000)
      return
    }

    try {
      const r = await favoriteService.create(fave)
      setFavorites(p => p.concat({ base: r.base, quote: r.quote, user: { id: user.id, name: user.name, username: user.username }, id: r.id }))
      setSuccess(`Successfully favorited ${r.base} to ${r.quote}!`)
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError("Couldn't favorite, try again!")
      setTimeout(() => setError(''), 3000)
    }
  }

  console.log('Success: ', success)
  console.log('Error: ', error)
  console.log('logs:', logs)

  const createLog = async (fave) => {
    const today = new Date().toISOString()
    if (!user) {
      setLogs(p => p.concat({ amount: fave.amount, base: fave.base, date: today, quote: fave.quote, rate: {$numberDecimal: fave.rate}, id: Date.now() }))
      setSuccess(`Successfully logged ${fave.base} to ${fave.quote} for ${fave.amount} ${fave.base}! Log in to save permanently!`),
      setTimeout(() => setSuccess(''), 3000)
      return
    }

    try {
      const r = await logService.create(fave)
      setLogs(p => p.concat({ amount: r.amount, base: r.base, date: r.date, id: r.id, quote: r.quote, rate: r.rate, user: {id: user.id, name: user.name, username: user.username} })),
      setSuccess(`Successfully logged ${r.base} to ${r.quote} for ${r.amount} ${r.base}!`),
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError("Couldn't favorite, try again!")
      setTimeout(() => setError(''), 3000)
    }
  }

  const removeFavorite = (fave) => {
    if (!user) {
      setFavorites(p => p.filter(p => p.id != fave.id))
      setSuccess(`Successfully unfavorited ${fave.base} to ${fave.quote}!`)
        setTimeout(() => {
          setSuccess('')
        }, 3000)
        return
    }

    try {
      favoriteService.deleteFavorite(fave.id)
      setFavorites(p => p.filter(p => p.id != fave.id))
      setSuccess(`Successfully unfavorited ${fave.base} to ${fave.quote}!`)
        setTimeout(() => {
          setSuccess('')
        }, 3000)
    } catch {
      console.log('couldnt delete!')
      setError('Couldnt unfavorite, Try again!')
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }

  const removeLog = (log) => {
    if (!user) {
      setLogs(p => p.filter(p => p.id != log.id))
      setSuccess(`Successfully unlogged ${log.base} to ${log.quote} for ${log.amount} ${log.base}!`)
        setTimeout(() => {
          setSuccess('')
        }, 3000)
        return
    }

    try {
      logService.deleteLog(log.id)
      setLogs(p => p.filter(p => p.id != log.id))
      setSuccess(`Successfully unlogged ${log.base} to ${log.quote} for ${log.amount} ${log.base}!`),
        setTimeout(() => {
          setSuccess('')
        }, 3000)
    } catch {
      console.log('couldnt delete!')
      setError('Couldnt unlog, Try again!')
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }

  return (
    <div className='font-["Jetbrains_Mono"] min-w-[375px] bg-black h-[100vh]'>
      <AnimatePresence>
        {success && (
          <Success success={success} setSuccess={setSuccess} key={success}/>
        )}
        {error && (
          <Error error={error} setError={setError} key={error} />
        )}
      </AnimatePresence>
      <Routes>
        <Route path='/' element={<>
          <Header navigate={navigate}/>
          <LiveTracker live={live} yesterday={yesterday} isDesktop={isDesktop}/>
          <Converter base={base} setBase={setBase} quote={quote} setQuote={setQuote} rate={rate} amount={amount} setAmount={setAmount} handleReverse={handleReverse} baseOpen={baseOpen} setBaseOpen={setBaseOpen} quoteOpen={quoteOpen} setQuoteOpen={setQuoteOpen} baseSearch={baseSearch} setBaseSearch={setBaseSearch} quoteSearch={quoteSearch} setQuoteSearch={setQuoteSearch} favorites={favorites} createFavorite={createFavorite} removeFavorite={removeFavorite} logs={logs} createLog={createLog} removeLog={removeLog} user={user} isDesktop={isDesktop}/>
          <View view={view} setView={setView} viewOpen={viewOpen} setViewOpen={setViewOpen} views={views} favorites={favorites} logs={logs} user={user} isDesktop={isDesktop} />
          <AnimatePresence mode='wait'>
            {view == 'HISTORY' && (
              <ExchangeGraph graphData={graphData} graphLoading={graphLoading} setGraphVis={setGraphVis} base={base} quote={quote} key={view} graphVis={graphVis}/>
            )}
            {view == 'COMPARE' && (
              <Compare amount={amount} base={base} quote={quote} favorites={favorites} createFavorite={createFavorite} removeFavorite={removeFavorite} user={user}/>
            )}
            {view == 'LOGGED' && (
              <Logs logs={logs} user={user} removeLog={removeLog} key={view} />
            )}
            {view == 'FAVORITES' && (
              <Favorites favorites={favorites} user={user} removeFavorite={removeFavorite} key={view}/>
            )}
          </AnimatePresence>
        </>}>
        </Route>
        <Route path='/user' element={<UserScreen navigate={navigate} user={user}/>} />
        <Route path='/login' element={<Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} user={user}/>} />
        <Route path='/logout' element={<Logout handleLogout={handleLogout} />}/>
        <Route path='/register' element={<Register name={name} username={username} password={password} setName={setName} setUsername={setUsername} setPassword={setPassword} handleRegister={handleRegister}/>} />
      </Routes>
    </div>
  )
}

export default App
