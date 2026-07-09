import axios from "axios"

export const getGraphs = ({ graphVis, quote, base }) => {
  const newDate = new Date()
  switch (graphVis) {
    case '1D': {
      newDate.setDate(newDate.getDate() - 1)
      break
    }
    case '1W': {
      newDate.setDate(newDate.getDate() - 7)
      break
    }
    case '1M': {
      newDate.setMonth(newDate.getMonth() -1) 
      break
    }
    case '3M': {
      newDate.setMonth(newDate.getMonth() -3) 
      break
    }
    case '1Y': {
      newDate.setFullYear(newDate.getFullYear() - 1)
      break
    }
  }
  const response = axios.get(`https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}&from=${newDate}`)
  return response.then(res => res.data)
}

export const getLive = () => {
  const response = axios.get(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,GBP,JPY,CAD`)
  return response.then(res => res.data)
}

export const getYesterday = () => {
  const newDate = new Date()
  newDate.setDate(newDate.getDate() - 1)
  const response = axios.get(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,GBP,JPY,CAD&date=${newDate}`)
  return response.then(res => res.data)
}

export const getRate = ({ base, quote }) => {
  const response = axios.get(`https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}`)
  return response.then(res => res.data)
}