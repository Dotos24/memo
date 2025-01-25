"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export default function Home() {


  return (
    <>
      <Support />
      <Header />
    <Footer />
    </>
  );
}
