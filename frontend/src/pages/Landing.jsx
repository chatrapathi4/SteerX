import { useEffect } from "react"

import Nav from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Philosophy from "../components/Philosophy";
import Showcase from "../components/Showcase";
import StatsBar from "../components/StatsBar";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

export default function Landing() {

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "")
      const el = document.getElementById(id)

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Philosophy />
      <Showcase />
      <StatsBar />
      <Services />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}