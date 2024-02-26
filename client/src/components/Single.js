

// import Sidebar from './About'
// import SinglePost from './RecipePost'
// export default function Single(){
//     return(
//         <div className='single'>
//             {/*post*/}
//             <SinglePost />
//             <About />
//         </div>
//     )
// }
import React from 'react';
import RecipePost from './RecipePost';
import About from './About';

export default function Single() {
    return (
        <div className='single'>
            {/* Display the single post */}
            <RecipePost />

            {/* Display the About section */}
            <About />
        </div>
    );
}
