import { motion, MotionConfig } from "framer-motion";
import { useState } from "react";

const HamburgerMenu = () => {
    const [active, setActive] = useState(false);

    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.button
                initial={false}
                onClick={() => setActive((prev) => !prev)}
                className="relative h-20 w-20 rounded-full transition-colors bg-white/0 hover:bg-white/20"
                animate={active ? "open" : "close"}
            >
                <motion.span
                    style={{
                        left: "50%",
                        top: "35%",
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-1 w-10 bg-white"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "45deg"],
                            top: ["35%", "50%", "50%"],
                        },
                        close: {
                            rotate: ["45deg", "0deg", "0deg"],
                            top: ["50%", "50%", "35%"],
                        },
                    }}
                />
                <motion.span
                    style={{
                        left: "50%",
                        top: "50%",
                        x: "-50%",
                        y: "-50%",
                    }}
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "-45deg"],
                        },
                        close: {
                            rotate: ["-45deg", "0deg", "0deg"],
                        },
                    }}
                    className="absolute h-1 w-10 bg-white"
                />
                <motion.span
                    style={{
                        left: "50%",
                        bottom: "35%",
                        x: "-50%",
                        y: "50%",
                    }}
                    variants={{
                        open: {
                            bottom: ["35%", "50%", "50%"],
                            opacity: [1, 1, 0],
                        },
                        close: {
                            bottom: ["50%", "50%", "35%"],
                            opacity: [0, 1, 1],
                        },
                    }}
                    className="absolute h-1 w-10 bg-white"
                />
            </motion.button>
        </MotionConfig>
    );
};

export default HamburgerMenu;
