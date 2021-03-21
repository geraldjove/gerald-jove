import React from 'react'
import Hero from '../components/HeroSection/hero.component';
import Navbar from '../components/navbar/navbar.component';
import About from './about.js';
import Experience from './experience.js';
import Skill from './skill';
import Education from './education';
import Contact from './contact';
import Footer from '../components/footer/footer.component';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Skill />
            <Education />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home
