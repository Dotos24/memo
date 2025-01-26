"use client";

import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Carousel from "@/components/Carousel/Carousel";
import TopProduct from "@/components/TopProduct/TopProduct";
import FAQWidget from "@/components/FAQ/FAQWidget";
import Coments from "@/components/Coments/Coments";
import Footer from "@/components/Footer/Footer";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Support />
            <Header />
            
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <Carousel />
            </motion.div>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
            >
                <VelocityScroll>MEMO GAMES</VelocityScroll>
            </motion.section>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <TopProduct />
                </motion.div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
            >
                <Coments />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
            >
                <FAQWidget />
            </motion.div>

            <Footer />
        </div>
    );
}
