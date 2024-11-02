import { motion } from "framer-motion";

const heading = "Evelegant text reveal";

const text =
    "Transform your webcomponent using Framer Motion's UTF-16 text animations. Each character, a vibrant performer, dances dynamically, waving a captivating narrative. Elevate user engagement with the art of animated storytelling.";

const RevealTyping = () => {
    const charVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const headingChars = splitText(heading);
    const textChars = splitText(text);

    return (
        <>
            <motion.h1 initial="hidden" whileInView="visible" transition={{ staggerChildren: 0.02 }}>
                {headingChars.map((char, idx) => (
                    <motion.span key={idx} variants={charVariants} transition={{ duration: 0.5 }}>
                        {char}
                    </motion.span>
                ))}
            </motion.h1>
            <motion.p initial="hidden" whileInView="visible" transition={{ staggerChildren: 0.02 }}>
                {textChars.map((char, idx) => (
                    <motion.span key={idx} variants={charVariants} transition={{ duration: 0.5 }}>
                        {char}
                    </motion.span>
                ))}
            </motion.p>
        </>
    );
};

const splitText = (text: string): string[] => {
    const chars: string[] = [];
    const regex = /[\s\S]/gu;

    let match;

    while ((match = regex.exec(text)) != null) {
        chars.push(match[0]);
    }

    return chars;
};

export default RevealTyping;
