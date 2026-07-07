import { Shell } from "@/components/layout/Shell";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Architecture } from "@/components/sections/Architecture";
import { AI } from "@/components/sections/AI";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <Shell>
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Architecture />
        <Skills />
        <AI />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </Shell>
  );
}
