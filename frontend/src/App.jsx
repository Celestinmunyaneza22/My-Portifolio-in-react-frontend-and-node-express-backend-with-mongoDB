import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route,Navigate,} from 'react-router-dom';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import {FaGithub,FaLinkedin,} from 'react-icons/fa'; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  { useState,useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';


  function PrivateRoute({ token, children }) {
  return token ? children : <Navigate to="/admin-login" />;
}

function App() {

const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const handleLogin = (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
  };


  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const [formData, setFormData] = useState({
  email: '',
  location: '',
  comments:''
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/contact', formData);
    alert('Message sent: ' + response.data.message);
    // Optionally reset the form:
    setFormData({ email: '', location: '', comments: '' });
  } catch (error) {
    alert('Failed to send: ' + error.response?.data?.message || error.message);
  }
};

useEffect(() => {
  AOS.init({ duration: 3000 });
}, []);

  return (
    <>
    <Navbar />
{/* Home Section */}
      <section id="home"
  className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-[length:200%_200%] animate-gradient-x flex flex-col items-center justify-center px-4"
>
        <h1 className="text-4xl font-bold mb-4 text-center">MUNYANEZA Celestin</h1>
        <p className="text-lg text-gray-700 max-w-xl text-center mb-4">
I am a full-stack software developer and technical trainer with over 5 years of experience in delivering practical software development training and building full-stack web applications. Proven expertise in both front-end (HTML, CSS, JavaScript, React.js, Next.js, Vue.js) and back-end development (Node.js,Express.js, PHP, Python), with hands-on experience in database design and integration (MySQL, MSS, MongoDB,PostgreSQL). Skilled in teaching and applying data structures, algorithms, machine learning, and system analysis and design.
</p>
<p><i>Details on me</i>  <a 
  href="/CelestinCV.pdf" 
  download
  className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-500"
>
  Download CV
</a></p>
 <p>
      <Router>
      <Routes>
<Route
  path="/admin"
  element={
    <PrivateRoute token={token}>
      <AdminDashboard token={token} setToken={setToken} />
    </PrivateRoute>
  }
/>
        <Route
          path="/admin-login"
          element={<AdminLogin setToken={handleLogin} />}
        />
        {/* other public routes */}
      </Routes>
    </Router>
 </p>
      </section>

      <div className="relative">
  <svg
    className="absolute top-0 left-0 w-full h-24 text-blue-200"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="currentColor"
      d="M0,32L60,64C120,96,240,160,360,160C480,160,600,96,720,74.7C840,53,960,75,1080,96C1200,117,1320,139,1380,149.3L1440,160V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
    />
  </svg>
</div>
<section id="skills" className="py-16 bg-gradient-to-br from-white to-blue-50 px-4">
  <h2 className="text-3xl font-bold text-center mb-8">Technical Skills</h2>
  {/* Frontend Skills */}
  <div className="mb-12">
    <h3 className="text-2xl font-semibold text-center text-blue-600 mb-6">Frontend Development</h3>
    <div className="max-w-5xl mx-auto">
      <Slider {...sliderSettings}>
        {[
          { name: 'HTML/CSS', level: 96 },
          { name: 'JavaScript', level: 94 },
          { name: 'React', level: 92 },
          { name: 'Tailwind CSS', level: 91 },
          { name: 'Bootstrap', level: 86 },
          { name: 'Next.js', level: 70 },
          { name: 'TypeScript', level: 75 },
          { name: 'Vue.js', level: 80 },
        ].map((skill, idx) => (
          <div key={idx} className="px-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-2">
                <CircularProgressbar
                  value={skill.level}
                  text={`${skill.level}%`}
                  styles={buildStyles({
                    textColor: '#1f2937',
                    pathColor: '#2563eb',
                    trailColor: '#e5e7eb',
                  })}
                />
              </div>
              <p className="mt-2 text-center font-medium text-gray-700">{skill.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>

  {/* Backend Skills */}
  <div>
    <h3 className="text-2xl font-semibold text-center text-green-600 mb-6">Backend Development</h3>
    <div className="max-w-5xl mx-auto">
      <Slider {...sliderSettings}>
        {[
          { name: 'Node.js', level: 91 },
          { name: 'Express.js', level: 90 },
          { name: 'MongoDB', level: 82 },
          { name: 'MS SQL', level: 81 },
          { name: 'PostgreSQL', level: 74 },
          { name: 'REST APIs', level: 83 },
          { name: 'PHP', level: 92 },
          { name: 'Python', level: 74 },
        ].map((skill, idx) => (
          <div key={idx} className="px-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-2">
                <CircularProgressbar
                  value={skill.level}
                  text={`${skill.level}%`}
                  styles={buildStyles({
                    textColor: '#1f2937',
                    pathColor: '#16a34a',
                    trailColor: '#e5e7eb',
                  })}
                />
              </div>
              <p className="mt-2 text-center font-medium text-gray-700">{skill.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
  {/* DevOps Skills */}
  <div>
    <h3 className="text-2xl font-semibold text-center text-orange-600 mb-6 mt-6">DevOps and Other software tools</h3>
    <div className="max-w-5xl mx-auto">
      <Slider {...sliderSettings}>
        {[
          { name: 'Docker', level: 85 },
          { name: 'Git', level: 90 },
          { name: 'GitHub', level: 90 },
          { name: 'Testing with Jest', level: 75 },
        ].map((skill, idx) => (
          <div key={idx} className="px-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-2">
                <CircularProgressbar
                  value={skill.level}
                  text={`${skill.level}%`}
                  styles={buildStyles({
                    textColor: '#1f2937',
                    pathColor: '#f7e62eff',
                    trailColor: '#e5e7eb',
                  })}
                />
              </div>
              <p className="mt-2 text-center font-medium text-gray-700">{skill.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
</section>

      {/* experiences Section */}
      <section id="experiences" className="py-16 bg-gray-50 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8">Experiences</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Software Development Trainer</h3>
            <p className="text-2xl font-bold text-green-600">January 2020- December 2022 </p>
            <p className="text-gray-600 mt-2">Modules: Website development, website and database integration, web application 
development in PHP, web application deployment, System analysis and design. </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Software Development Trainer</h3>
            <p className="text-2xl font-bold text-blue-600">December 2022-up to now </p>
            <p className="text-gray-600 mt-2">Modules: JavaScript fundamentals, Data structure and algorithm using JavaScript, Back-End 
application development using Node.JS, Machine learning application using Python, Front-End 
app development using React.JS, Python programming.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Full-stack software developer</h3>
            <p className="text-2xl font-bold text-purple-600">over 5 years of experience</p>
            <p className="text-gray-600 mt-2">Skilled and motivated in developing full-stack web applications using Node.js, PHP, Python, React.js, Vue.js, and JavaScript, with a strong grasp of database integration (MySQL, MSSQL, MongoDB,PostgreSQL) and DevOps tools (Git, Docker, VMware).<i className='text-green-500'>My projects on -:</i> <a href="https://github.com/Celestinmunyaneza22" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">
        <FaGithub size={20} />
      </a></p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-bl from-gray-50 to-white px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <div className="max-w-3xl mx-auto text-full">
          <p className="text-gray-700 mb-4">
            Full-stack software developer and trainer with over 5 years of experience in both front-end and back-end development, as well as trainer of core software engineering concepts. Skilled in developing full-stack web applications using Node.js, PHP, Python, React.js, Vue.js, and JavaScript, with a strong grasp of database integration (MySQL, MSSQL, MongoDB,PostgreSQL) and DevOps tools (Git, Docker, VMware). Delivered hands-on training in JavaScript fundamentals, data structures and algorithms, machine learning applications, and web systems design. Proven ability to explain complex technical concepts and mentor learners in application development, system design, and software engineering best practices.
          </p>
          <p className="text-gray-700 mb-4">
            Have questions or need help? Reach out to me anytime.
            <p className="text-blue-600">munezacelestin@gmail.com</p>
  <p className="text-blue-600">(+250)789577093 or (+250)787602802</p>
          </p>
          <div className="mt-4">
  <p className="text-lg font-semibold">Contact Me:</p>
  {/* <p className="text-blue-600">munezacelestin@gmail.com</p>
  <p className="text-blue-600">(+250)789577093 or (+250)787602802</p> */}

  {/* Get in Touch Form */}
  <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-center mb-4">Get in Touch</h3>
    <form onSubmit={handleSubmit} className="space-y-4">
<div>
  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
  <input type="email"  id="email" name="email" value={formData.email} onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>
</div>
      <div>
        <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Location</label>
        <input type="text"  id="location" name="location" value={formData.location} onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>
</div>
<div>
  <label htmlFor="comments" className="block text-gray-700 font-medium mb-1">Comments</label>
  <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} 
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"   required>

  </textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</div>
        </div>
      </section>
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
    
    {/* Left side: © */}
    <div className="text-sm text-center md:text-left mb-4 md:mb-0">
      © {new Date().getFullYear()} Celestin. All rights reserved.
    </div>

    {/* Middle: Social Icons */}
    <div className="flex space-x-4 mb-4 md:mb-0">
      <a href="https://github.com/Celestinmunyaneza22" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">
        <FaGithub size={20} />
      </a>
      <a href="https://linkedin.com/in/munyaneza-celestin-7b34b5123" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
        <FaLinkedin size={20} />
      </a>
    </div>

    {/* Right side: links */}
    <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
      <a href="#" className="hover:text-blue-500">Privacy</a>
      <a href="#" className="hover:text-blue-500">Terms</a>
      <a href="#" className="hover:text-blue-500">Support</a>
    </div>
  </div>
</footer>
    </>
  );
}

export default App;


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-blue-600 hover:text-blue-800"
      onClick={onClick}
    >
      ▶
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-blue-600 hover:text-blue-800"
      onClick={onClick}
    >
      ◀
    </div>
  );
};