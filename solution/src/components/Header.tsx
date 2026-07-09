import logo from '../../../starter-code/assets/images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Header = ({ navigate }) => {
  return (
    <div className='text-[#9D9D9D] flex flex-row justify-between items-center text-[0.55rem] p-4'>
      <img src={logo} alt="" className='w-30 xl:w-35'/>
      <div>
        <p className='xl:text-xs'>55 CURRENCIES · EOD · ECB DATA</p>
      </div>
      <FontAwesomeIcon icon={faUser} onClick={() => navigate('/user')} className='text-lg text-white cursor-pointer'/>
    </div>
  )
}