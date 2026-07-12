(() => {
  const startBgm = () => {
    const audio = document.querySelector(".site-bgm");
    if (!audio) return;

    const button = document.querySelector(".site-bgm-toggle");
    let userPaused = false;

    const updateButton = (isPlaying) => {
      if (!button) return;
      button.textContent = isPlaying ? "音樂 ON" : "音樂 OFF";
      button.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    };

    audio.volume = 0.1;
    audio.loop = true;

    const play = () => {
      if (userPaused) return;
      audio.play()
        .then(() => updateButton(true))
        .catch(() => {
          updateButton(false);
          // Browsers often block sound until the first user gesture.
        });
    };

    const events = ["pointerdown", "touchstart", "keydown", "scroll"];
    const playAfterGesture = (event) => {
      if (event.target?.closest?.(".site-bgm-toggle")) return;
      play();
      events.forEach((eventName) => {
        window.removeEventListener(eventName, playAfterGesture);
      });
    };

    if (button) {
      button.addEventListener("click", () => {
        if (audio.paused) {
          userPaused = false;
          play();
        } else {
          userPaused = true;
          audio.pause();
          updateButton(false);
        }
      });
    }

    updateButton(false);
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
