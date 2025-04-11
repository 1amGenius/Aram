import localFont from "next/font/local";

export const Bubblegum = localFont({
    src: [
        {
            path: "../../public/fonts/st-bubblegum.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/st-bubblegum.otf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-bubblegum",
    display: "swap",
});

export const BubblegumInline = localFont({
    src: [  
        {
            path: "../../public/fonts/st-bubblegum-inline.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/st-bubblegum-inline.otf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-bubblegum-inline",
    display: "swap",
}); 