
// import React from 'react';
// import './Header.css';

// export default function Header() {
//     return (
//         <div className='header'>
//             <div className='headerTitles'>
//                 <span className='headerTitleSm'>Create &amp; read</span>
//                 <span className='headerTitleLg'>Recipes</span>
//             </div>
//             <img className='headerImg' src='/images/landingPageimg.png' alt='Landing Page Image' />
//         </div>
//     );
// }
import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <div className='header'>
            <div className='headerTitles'>
                <span className='headerTitleSm'>Create &amp; read</span>
                <span className='headerTitleLg'>Recipes</span>
            </div>
            <img className='headerImg' src={`/images/landingPageimg.png`} alt='Landing Page Image' />
        </div>
    );
}
