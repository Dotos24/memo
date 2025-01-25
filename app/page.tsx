"use client";

import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Carousel from "@/components/Carousel/Carousel";
import TopProduct from "@/components/TopProduct/TopProduct";
import FAQWidget from "@/components/FAQ/FAQWidget";
import Coments from "@/components/Coments/Coments";
import Footer from "@/components/Footer/Footer";

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";


export default function Home() {
  return (
    <>
      <Support />
      <Header />
      <Carousel />
      <VelocityScroll>MEMO GAMES</VelocityScroll>
      <TopProduct />
      <Coments />
      <FAQWidget />
      <Footer />
    </>
  );
}
