import './About.css';
//import {Link} from "react-scroll"

export default function About() {
    return (
        <div name='about' className='sidebar' >
            <div className='sidebarItem'>
                <span className='sidebarTitle'>ABOUT US</span>
                <img className='sidebarimg' src='/images/Logo.png' alt='CulinaShare Logo' />
                <h2>Our Mission</h2>
                <p>CulinaShare is dedicated to providing a platform for food enthusiasts to share their favorite recipes, discover new culinary
                     creations, and connect with like-minded individuals from around the world.
                    CulinaShare is a vibrant community dedicated to the love of cooking and sharing
                     delicious recipes. Our mission is to foster culinary exploration, making it accessible to individuals of all skill levels and backgrounds.

                    Whether you're a kitchen novice or a seasoned chef, CulinaShare provides a platform where you can discover 
                    a diverse array of recipes, contribute your own culinary creations, and build a personalized collection of favorite dishes.

                    We believe that the joy of cooking extends beyond the kitchen and has the power to bring people together. 
                    At CulinaShare, we strive to inspire creativity, foster a sense of community, and celebrate the art of crafting delicious meals.
                </p>
            </div>

            <div className='sidebarItem'>
                <span className='sidebarTitle'>OUR TEAM</span>
                <ul className='sidebarList'>
                    <li className="team-member">
                        <img src="/images/female.jpg" alt="Jane Doe" />
                        <h3>Jane Doe</h3>
                        <p>Co-founder & CEO</p>
                    </li>
                    <li className="team-member">
                        <img src="/images/mann.png" alt="John Smith" />
                        <h3>John Smith</h3>
                        <p>Co-founder & CTO</p>
                    </li>
                </ul>
            </div>

            <div className='sidebarItem'>
                <span className='sidebarTitle'>FOLLOW US</span>
                <div className='sidebarSocial'>
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>

            {/* Footer placed outside the sidebar */}
            <footer>
                <p>&copy; 2024 CulinaShare. All rights reserved.</p>
            </footer>
        </div>
    );
};
