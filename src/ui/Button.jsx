import { Link } from 'react-router-dom';
function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const style = {
    primary: `${base} bg-yellow-400 hover:bg-yellow-300 px-4 py-3 md:px-6 md:py-4`,
    small: `${base} bg-yellow-400 hover:bg-yellow-300 px-4 py-2 sm:px-5 sm:py-2.5 text-xs`,
    secondary: `${base} bg-stone-200 text-stone-800 hover:bg-stone-300 px-4 py-3 md:px-6 md:py-4`,
    round: `${base} bg-yellow-400 hover:bg-yellow-300 w-8 h-8 p-0 flex items-center justify-center text-lg`,
  };

  if (to) {
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  } else if (onClick) {
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return (
      <button disabled={disabled} className={style[type]}>
        {children}
      </button>
    );
  }
}

export default Button;
