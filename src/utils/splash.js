/*
----------------------------------------------------
AgroTorch AgriOS
File: src/utils/splash.js
Version: 0.2.0
Description:
Splash Screen Controller
----------------------------------------------------
*/

export function startSplash(nextScreen) {

    const messages = [

        "🌾 Preparing your agricultural workspace...",

        "🧠 Loading Decision Intelligence...",

        "🌍 Connecting the Agricultural Ecosystem...",

        "🚀 Welcome to AgroTorch AgriOS"

    ];

    let index = 0;

    const loadingText = document.getElementById("loadingText");

    const interval = setInterval(() => {

        index++;

        if (index < messages.length && loadingText) {

            loadingText.textContent = messages[index];

        }

    }, 1000);

    setTimeout(() => {

        clearInterval(interval);

        nextScreen();

    }, 4000);

}