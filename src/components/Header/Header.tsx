import { PiMoonStarsFill, PiSunDimFill } from 'react-icons/pi';
import { HeaderProps } from '../../types/types';
import { HeaderWrapper, ThemeButton } from './style';

const Header = ({ handleThemeToggle, isDarkTheme, textColor }: HeaderProps) => {
  return (
    <HeaderWrapper className='todo-sticker__header'>
      <ThemeButton
        onClick={handleThemeToggle}
        style={{ color: textColor }}
    >
        {isDarkTheme ? <PiSunDimFill size={24} /> : <PiMoonStarsFill size={24} />}
      </ThemeButton>
    </HeaderWrapper>
  );
};

export default Header;
