import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import Work from "@/components/Work";
import Featured from "@/components/Featured";
import Products from "@/components/Products";
import CaseStudies from "@/components/CaseStudies";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stats />
      <Clients />
      <Work />
      <Featured />
      <Products />
      <CaseStudies />
      <Projects />
      <Stack />
      <Process />
      <Faq />
      <Contact />
    </main>
  );
}
