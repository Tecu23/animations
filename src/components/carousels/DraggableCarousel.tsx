import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { motion, useMotionValue } from "framer-motion";

const DRAG_BUFFER = 50;

const DraggableCarousel = () => {
    const [imgIdx, setImgIdx] = useState(0);

    const dragX = useMotionValue(0);

    const imgs = ["/vite.svg", "/vite.svg", "/vite.svg", "/vite.svg", "/vite.svg", "/vite.svg"];

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIdx((pv) => (pv === imgs.length - 1 ? 0 : pv + 1));
            }
        }, 10 * 1000);

        return () => clearInterval(intervalRef);
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-neutral-950 py-8">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                animate={{
                    translateX: `-${imgIdx * 100}%`,
                }}
                style={{
                    x: dragX,
                }}
                transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 400,
                    damping: 50,
                }}
                onDragEnd={() => {
                    const x = dragX.get();

                    if (x <= -DRAG_BUFFER && imgIdx < imgs.length - 1) {
                        setImgIdx((pv) => pv + 1);
                    } else if (x >= DRAG_BUFFER && imgIdx > 0) {
                        setImgIdx((pv) => pv - 1);
                    }
                }}
                className="flex items-center cursor-grab active:cursor-grabbing"
            >
                <Images images={imgs} imgIdx={imgIdx} />
            </motion.div>

            <Dots images={imgs} imgIdx={imgIdx} setImgIdx={setImgIdx} />
        </div>
    );
};

export default DraggableCarousel;

const Images = ({ images, imgIdx }: { images: string[]; imgIdx: number }) => {
    return (
        <>
            {images.map((img, idx) => (
                <motion.div
                    key={idx}
                    animate={{
                        scale: imgIdx == idx ? 0.95 : 0.85,
                    }}
                    transition={{
                        type: "spring",
                        mass: 3,
                        stiffness: 400,
                        damping: 50,
                    }}
                    style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    className="aspect-video w-screen flex-shrink-0 rounded-xl bg-neutral-800 object-cover"
                ></motion.div>
            ))}
        </>
    );
};

const Dots = ({ images, imgIdx, setImgIdx }: { images: string[]; imgIdx: number; setImgIdx: Dispatch<SetStateAction<number>> }) => {
    return (
        <div className="mt-4 flex w-full justify-center gap-2">
            {images.map((_, idx) => (
                <button className={`h-3 w-3 rounded-full transition-colors ${imgIdx == idx ? "bg-neutral-50" : "bg-neutral-500"}`} key={idx} onClick={() => setImgIdx(idx)} />
            ))}
        </div>
    );
};
