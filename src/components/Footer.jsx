import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

// oi eu sou o goku!

export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="footer"
    >
      <fieldset>
        <legend>Footer</legend>
        <footer>
          <a href="/drinks">
            <img
              src={ drinkIcon }
              alt="drink icon"
              data-testid="drinks-bottom-btn"
            />
          </a>
          <a href="/meals">
            <img
              src={ mealIcon }
              alt="meal icon"
              data-testid="meals-bottom-btn"
            />
          </a>
        </footer>
      </fieldset>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import '../styles/Footer.css';

// export default function Footer() {
//   const history = useHistory();
//   const [showFooter, setShowFooter] = useState(false);

//   const { pathname } = history.location;

//   useEffect(() => {
//     if (
//       pathname === '/profile'
//       || pathname === '/meals'
//       || pathname === '/drinks'
//     ) setShowFooter(true);
//   }, [pathname]);

//   return (
//     showFooter && (
//       <div
//         data-testid="footer"
//         className="footer"
//       >
//         <fieldset>
//           <legend>Footer</legend>
//           <footer>
//             <a href="/drinks">
//               <img
//                 src="src/images/drinkIcon.svg"
//                 alt="drink icon"
//                 data-testid="drinks-bottom-btn"
//               />
//             </a>
//             <a href="/meals">
//               <img
//                 src="src/images/mealIcon.svg"
//                 alt="meal icon"
//                 data-testid="meals-bottom-btn"
//               />
//             </a>
//           </footer>
//         </fieldset>
//       </div>
//     ));
// }
