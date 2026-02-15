 
 import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FAQ from "./FQA";
import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { AllContexts } from "../Context/Allcontext";
import { backend_url } from "../App";
// Simple lightbox modal (unchanged)
const LightboxModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image} alt="Enlarged view" className="w-full h-auto rounded-lg shadow-2xl" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 transition"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [galleryImage, setGalleryImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const {ishow , setshow}  = useContext(AllContexts)
  useEffect(() => {
    axios.get(backend_url + "/api/content")
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
 
  const heroTitle = content.heroTitle || "Thinking of a Fantastic Vicinity?";
  const heroSubtitle = content.heroSubtitle || "Where luxury meets serenity";
  const projectName = content.projectName || "VIGHNAHARTA INFINITY";
  const price1 = content.price1 || "₹74.99 Lacs*";
  const price2 = content.price2 || "₹1.05 Cr*";
  const location = content.location || "Vikhroli East, Mumbai";
  const overview = content.overview ||
    "Nestled in the heart of Vikhroli East, Vighnaharta Infinity offers an unparalleled lifestyle with world‑class amenities and spacious homes designed for the modern family.";
  const about = content.about ||
    "With over two decades of excellence, our commitment to quality and innovation has made us a trusted name in luxury real estate. Every detail is crafted to provide you with a home that exudes elegance and comfort.";

  const amenities = content.amenities?.length ? content.amenities : [
    { icon: "🏊", title: "Infinity Pool", desc: "Climate controlled with sun deck" },
    { icon: "🏋️", title: "Royal Gym", desc: "Technogym equipment & personal trainer" },
    { icon: "🌳", title: "Zen Gardens", desc: "Landscaped by award‑winning designers" },
    { icon: "🎾", title: "Tennis Court", desc: "Floodlit for evening play" },
    { icon: "🧘", title: "Spa & Yoga", desc: "Steam, sauna & meditation pavilion" },
    { icon: "🎭", title: "Grand Clubhouse", desc: "Party hall, lounge & indoor games" },
  ];

  const galleryImages = [
    "/park.png", "/Parking.png", "/playground.png",
    "/Meetings.png", "/Hall.png", "/park.png"
  ];

  const openLightbox = (img) => {
    setGalleryImage(img);
    setModalOpen(true);
  };

  const closeLightbox = () => {
    setModalOpen(false);
    setGalleryImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-amber-600 border-opacity-75"></div>
      </div>
    );
  }

  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.15 } },
    viewport: { once: true }
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-white overflow-x-hidden">
      <LightboxModal isOpen={modalOpen} image={galleryImage} onClose={closeLightbox} />
 
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-xl shadow-sm py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/20"
      >
        <div className="flex items-center space-x-2">
          <span className="text-3xl text-amber-600 drop-shadow">👑</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">DreamLands</span>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {["Home", "About", "Amenities", "FAQ", "Gallery", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>
        {ishow ? (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate("/Dashboard")}
    className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-2 rounded-full shadow-md"
  >
    Dashboard
  </motion.button>
) : (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate("/login")}
    className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-2 rounded-full shadow-md"
  >
    Login
  </motion.button>
)}

      </motion.nav>

     
   <section
  id="home"
  className="relative min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center"
  style={{ backgroundImage: "url('/hero-bg.jpg')" }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">

 
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="hidden md:flex justify-center"
    >
      <div className="relative w-full max-w-[650px]">
        <img
          src="/Heroimg.png"
          alt="Project"
          className="w-full object-cover rounded-3xl shadow-2xl border-4 border-white/20 hover:scale-105 transition duration-700"
        />

         
        <div className="absolute -inset-6 bg-amber-400/10 blur-3xl rounded-full"></div>
      </div>
    </motion.div>
 
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="text-center md:text-left"
    >
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        {heroTitle}
      </h1>

      <p className="text-xl md:text-2xl mt-4 text-amber-200 font-light">
        {heroSubtitle}
      </p>

      
      <h2 className="
        text-5xl md:text-7xl
        font-extrabold
        mt-6
        leading-tight
        tracking-wide
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-yellow-200
        via-amber-300
        to-orange-400
      ">
        {projectName}
      </h2>

       
      <div className="flex flex-wrap gap-6 mt-10 justify-center md:justify-start">
        {[price1, price2].map((price, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl w-48 text-center"
          >
            <p className="text-3xl font-bold text-amber-300">{price}</p>
            <p className="text-xs uppercase mt-1">
              {idx === 0 ? "Smart 1 BHK" : "Premium 2 BHK"}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-lg flex items-center justify-center md:justify-start">
        <span className="bg-amber-600 p-2 rounded-full mr-3">📍</span>
        {location}
      </p>
 
      <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
        <motion.button
          whileHover={{ scale: 1.07 }}
          className="bg-gradient-to-r from-amber-600 to-amber-500 px-10 py-3 rounded-full font-semibold shadow-xl"
        >
          Enquiry Now
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.07 }}
          className="border-2 border-white px-10 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
        >
          Download Brochure
        </motion.button>
      </div>
    </motion.div>
  </div>

</section>

 
      <section id="about" className="py-20 px-6 md:px-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/Parks.png" alt="Luxury living" className="w-full h-96 object-cover hover:scale-110 transition duration-700" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border-4 border-amber-500 overflow-hidden shadow-xl hover:scale-110 transition">
              <img src="/Parks.png" alt="Detail" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-6 left-6 bg-amber-600 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center text-3xl shadow-lg">
              👑
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-amber-700">Project</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">{overview}</p>
            <p className="text-gray-600 mt-4 text-lg">{about}</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "500+", label: "Happy Families" },
                { value: "10", label: "Acres Land" },
                { value: "2025", label: "Possession" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-5 rounded-2xl shadow-lg text-center border-t-4 border-amber-500 hover:shadow-xl transition"
                >
                  <div className="text-3xl font-bold text-amber-700">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
 
      <section id="amenities" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Royal <span className="text-amber-700">Amenities</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-gray-500 text-xl max-w-2xl mx-auto"
          >
            Experience unparalleled luxury with our curated amenities.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {amenities.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-amber-100 hover:border-amber-300"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition transform-gpu">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-500 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      <section id="faq" className="py-20 px-6 md:px-12 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          >
            Frequently Asked <span className="text-amber-700">Questions</span>
          </motion.h2>
          <FAQ />
        </div>
      </section>
 
      <section id="gallery" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Photo <span className="text-amber-700">Gallery</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-gray-500 text-xl max-w-2xl mx-auto"
          >
            A glimpse into your future home.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
                onClick={() => openLightbox(img)}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      <section id="contact" className="py-20 px-6 md:px-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Find <span className="text-amber-700">Us</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">Visit our sales gallery or get in touch with us.</p>
            <div className="space-y-6">
              {[
                { icon: "📍", title: "Address", content: "Bldg. No. 223/224, Kannamwar Nagar I, Vikhroli East, Mumbai - 400083" },
                { icon: "📞", title: "Phone", content: "+91 98765 43210" },
                { icon: "✉️", title: "Email", content: "info@dreamlands.com" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="bg-amber-600 text-white rounded-full p-3 mr-4 mt-1 group-hover:scale-110 transition">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-xl">{item.title}</p>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200 hover:shadow-3xl transition"
          >
            <iframe
              width="100%"
              height="350"
              src="https://maps.google.com/maps?q=Vikhroli%20East%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full"
              title="Location map"
            ></iframe>
          </motion.div>
        </div>
      </section>

 
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl text-amber-500">👑</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">DreamLands</span>
            </div>
            <p className="text-gray-400">Redefining luxury living with premium apartments and world‑class amenities.</p>
          </div>
          <div>
            <h5 className="font-semibold text-lg mb-4 text-amber-400">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              {["Home", "About", "Amenities", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg mb-4 text-amber-400">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg mb-4 text-amber-400">Follow Us</h5>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram"].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-amber-600 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social === "facebook" && <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>}
                    {social === "twitter" && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.774c.825-1.642 1.3-3.486 1.3-5.404 0-.082-.002-.164-.006-.245A9.93 9.93 0 0024 4.59z"/>}
                    {social === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.014 7.052.072 5.197.157 3.605.73 2.168 2.168.73 3.605.157 5.197.072 7.052.014 8.332 0 8.756 0 12s.014 3.668.072 4.948c.085 1.855.658 3.447 2.096 4.884 1.437 1.437 3.029 2.011 4.884 2.096 1.28.058 1.704.072 4.948.072s3.668-.014 4.948-.072c1.855-.085 3.447-.658 4.884-2.096 1.437-1.437 2.011-3.029 2.096-4.884.058-1.28.072-1.704.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.658-3.447-2.096-4.884C20.395.73 18.803.157 16.948.072 15.668.014 15.244 0 12 0z"/> }
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} DreamLands. All rights reserved.
        </div>
      </footer>
 
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.032 2.001c-5.513 0-9.99 4.475-9.99 9.986 0 1.759.462 3.487 1.336 5.013l-1.374 4.208 4.386-1.372a9.96 9.96 0 005.642 1.724c5.513 0 9.99-4.475 9.99-9.986 0-5.511-4.477-9.986-9.99-9.986zm5.492 13.537c-.312.877-1.255 1.646-2.152 1.913-.574.168-1.318.302-2.622-.549-1.635-1.068-2.943-2.66-3.395-3.41-.226-.371-.512-.973-.1-1.528.412-.555.694-.768.934-.993.132-.132.269-.256.396-.391.238-.252.292-.423.042-.806-.249-.384-1.125-1.532-1.456-2.005-.373-.534-.797-.486-1.09-.495-.292-.009-.627-.009-.962.009-.47.027-1.233.174-1.787 1.01-.554.836-.554 1.932.058 3.096.848 1.613 2.421 3.242 4.172 4.123 1.04.522 1.846.714 2.476.851.616.135 1.176.115 1.612.073.496-.048 1.53-.577 1.748-1.135.218-.558.218-1.036.154-1.136-.064-.1-.235-.162-.492-.284-.258-.122-1.522-.716-1.758-.797-.236-.081-.408-.122-.58.122-.171.244-.67.795-.822.958-.152.163-.305.183-.563.061-.258-.122-1.09-.404-2.076-1.287-.767-.687-1.286-1.534-1.437-1.793-.151-.259-.016-.398.114-.527.115-.115.258-.302.387-.453.129-.151.172-.259.258-.431.086-.172.043-.323-.021-.455-.064-.132-.577-1.394-.791-1.91-.207-.501-.417-.423-.573-.43-.157-.007-.338-.007-.518-.007-.18 0-.472.07-.719.334-.247.264-.943.922-.943 2.248 0 1.327.965 2.608 1.099 2.789.134.181 1.884 2.873 4.561 3.927.638.251 1.136.401 1.524.515.637.187 1.218.161 1.677.099.514-.069 1.582-.61 1.806-1.199.224-.589.224-1.094.158-1.2-.066-.106-.243-.171-.5-.293z" />
        </svg>
      </motion.a>
    </div>
  );
}