import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Credibility from "@/components/Credibility";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import SuccessStories from "@/components/SuccessStories";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Quote from "@/components/Quote";
import Testimonials from "@/components/Testimonials";
import Careers from "@/components/Careers";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stats />
      <Credibility />
      <About />
      <Services />
      <Products />
      <Projects />
      <SuccessStories />
      <TechStack />
      <Process />
      <Team />
      <Gallery />
      <Quote />
      <Testimonials />
      <Careers />
      <Faq />
      <Contact />
    </main>
  );
}
