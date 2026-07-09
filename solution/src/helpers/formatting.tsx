export const jsonDate = () => {
  const date = new Date()
  let day = '0' + date.getDate();
  let months = '0' + (date.getMonth() + 1).toString()
  let year = date.getFullYear();
  console.log('Json date: ', `${year}-${months}-${day}`)

  return `${year}-${months}-${day}`
}

export const monthName = ({ date }) => {
  const stuff = date.split('-')
  stuff.shift()
  let month
  switch (stuff[0]) {
    case '01':
      month = 'Jan'
      break
    case '02':
      month = 'Feb'
      break
    case '03':
      month = 'Mar'
      break
    case '04':
      month = 'Apr'
      break
    case '05':
      month = 'May'
      break
    case '06':
      month = 'Jun'
      break
    case '07':
      month = 'Jul'
      break
    case '08':
      month = 'Aug'
      break
    case '09':  
      month = 'Sep'
      break
    case '10':
      month = 'Oct'
      break
    case '11':
      month = 'Nov'
      break
    case '12':
      month = 'Dec'
      break
  }
  return month + ' ' + stuff[1]
}