import AppGallery from "@/components/AppGallery";
import Backdrop from "@/components/Backdrop";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import FitCoins from "@/components/FitCoins";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Nav from "@/components/Nav";
import PreRegister from "@/components/PreRegister";
import TrustStrip from "@/components/TrustStrip";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />

      <main>
        <Hero />
        <TrustStrip />
        <AppGallery />
        <Features />
        <HowItWorks />
        <FitCoins />
        <PreRegister />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
