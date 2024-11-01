import type { IconType } from "react-icons";
import { SiAdobe, SiApple, SiFacebook, SiGoogle, SiLinkedin, SiShopify, SiSoundcloud, SiSpotify, SiTiktok } from "react-icons/si";

import { useAnimate } from "framer-motion";
import React from "react";

type Side = "left" | "bottom" | "right" | "top";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const ClipLinks = () => {
    const LinkBox = ({ Icon, href }: { Icon: IconType; href: string }) => {
        const [scope, animate] = useAnimate();

        const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
            const side = getNearestSide(e);
            animate(scope.current, {
                clipPath: ENTRANCE_KEYFRAMES[side],
            });
        };
        const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
            const side = getNearestSide(e);

            animate(scope.current, {
                clipPath: EXIT_KEYFRAMES[side],
            });
        };

        const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>): Side => {
            const target = e.target as HTMLAnchorElement;
            const box = target.getBoundingClientRect();

            const proximityToLeft = {
                proximity: Math.abs(box.left - e.clientX),
                side: "left" as Side,
            };

            const proximityToTop = {
                proximity: Math.abs(box.top - e.clientY),
                side: "top" as Side,
            };
            const proximityToRight = {
                proximity: Math.abs(box.right - e.clientX),
                side: "right" as Side,
            };

            const proximityToBottom = {
                proximity: Math.abs(box.bottom - e.clientY),
                side: "bottom" as Side,
            };

            const min = [proximityToRight, proximityToBottom, proximityToTop, proximityToLeft].reduce(
                (min, obj) => {
                    return obj.proximity < min.proximity ? obj : min;
                },
                { proximity: Infinity, side: "left" },
            );

            return min.side;
        };

        return (
            <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36" href={href}>
                <Icon className="text-xl sm:text-3xl md:text-4xl" />

                <div ref={scope} style={{ clipPath: "polygon(0 0, 100% 0, 0 0, 0 100%)" }} className="absolute inset-0 grid place-content-center bg-neutral-900">
                    <Icon className="text-xl sm:text-3xl md:text-4xl text-white" />
                </div>
            </a>
        );
    };
    return (
        <div className="border divide-y divide-neutral-900 border-neutral-900">
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox Icon={SiGoogle} href="#" />
                <LinkBox Icon={SiShopify} href="#" />
            </div>
            <div className="grid grid-cols-4 divide-x divide-neutral-900">
                <LinkBox Icon={SiApple} href="#" />
                <LinkBox Icon={SiSoundcloud} href="#" />
                <LinkBox Icon={SiAdobe} href="#" />
                <LinkBox Icon={SiFacebook} href="#" />
            </div>
            <div className="grid grid-cols-3 divide-x divide-neutral-900">
                <LinkBox Icon={SiTiktok} href="#" />
                <LinkBox Icon={SiSpotify} href="#" />
                <LinkBox Icon={SiLinkedin} href="#" />
            </div>
        </div>
    );
};

export default ClipLinks;
