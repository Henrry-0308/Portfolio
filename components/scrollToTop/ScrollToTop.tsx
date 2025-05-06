'use client'

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import {
    ChevronsUp,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'


export default function ScrollToTop() {

    const [showTopIcon, setShowTopIcon] = useState(false)

    const chatIconRef = useRef<HTMLButtonElement>(null)

    const toggleTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowTopIcon(true)
            } else {
                setShowTopIcon(false)
            }
        }

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, []);

    return (
        <div className="bg-black">
            <AnimatePresence>
                {showTopIcon && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50"
                    >
                        <Button
                            ref={chatIconRef}
                            onClick={toggleTop}
                            size="icon"
                            className="rounded-full size-14 p-2 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500"
                        >
                            <ChevronsUp className="size-12" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
