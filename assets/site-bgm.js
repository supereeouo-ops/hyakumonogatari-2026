(() => {
  const startBgm = () => {
    const audio = document.querySelector(".site-bgm");
    if (!audio) return;

    audio.volume = 0.2;
    audio.loop = true;

    const play = () => {
      audio.play().catch(() => {
        // Browsers often block sound until the first user gesture.
      });
    };

    const events = ["pointerdown", "touchstart", "keydown", "scroll"];
    const playAfterGesture = () => {
      play();
      events.forEach((eventName) => {
        window.removeEventListener(eventName, playAfterGesture);
      });
    };

    play();
    events.forEach((eventName) => {
      window.addEventListener(eventName, playAfterGesture, { once: true, passive: true });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startBgm, { once: true });
  } else {
    startBgm();
  }
})();
