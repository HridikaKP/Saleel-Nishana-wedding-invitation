
import { useEffect, useRef, useState } from "react";
import "./index.css";

const MAP_LINK = "https://maps.app.goo.gl/LPGDuALou8Y1kwhaA";

const WEDDING_DATE = new Date(
  "2026-12-12T17:00:00+05:30"
).getTime();

/* COUNTDOWN */

function Countdown() {
  const calculateTime = () => {
    const difference = WEDDING_DATE - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];

  return (
    <div className="countdown">
      {items.map(([label, value]) => (
        <div className="countdown-item" key={label}>
          <span className="countdown-number">
            {String(value).padStart(2, "0")}
          </span>

          <span className="countdown-label">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* DECORATIVE ORNAMENT */

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <b>✧</b>
      <span />
    </div>
  );
}

/* MAIN APP */

function App() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  /* INTERSECTION OBSERVER — adds is-visible to animate sections in */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.08,       // trigger when 8% of the section is visible
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const sections = document.querySelectorAll(".page-section");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [opened]); // re-run when invitation opens so new sections are observed

  /* START BACKGROUND MUSIC */

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      audio.volume = 0.35;
      await audio.play();
      setMusicPlaying(true);
    } catch (error) {
      console.error("Music playback error:", error);
      setMusicPlaying(false);
    }
  };

  /* PLAY / PAUSE MUSIC */

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await startMusic();
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  /* OPEN INVITATION */

  const openInvitation = () => {
    setOpened(true);

    startMusic();

    setTimeout(() => {
      document.getElementById("invitation")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  /* BACK TO COVER */

  const backToCover = () => {
    setOpened(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="wedding-site">

      {/* BACKGROUND MUSIC */}

      <audio
        ref={audioRef}
        src="/music/wedding-music.mp3.wav"
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      {/* FLOATING MUSIC CONTROL */}

      {opened && (
        <button
          className={`music-control ${
            musicPlaying ? "playing" : ""
          }`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
          title={musicPlaying ? "Pause music" : "Play music"}
        >
          <span className="music-icon">
            {musicPlaying ? "Ⅱ" : "♪"}
          </span>

          <span className="music-label">
            {musicPlaying ? "MUSIC ON" : "PLAY MUSIC"}
          </span>
        </button>
      )}

      {!opened ? (

        /* OPENING COVER */

        <section className="page-section opening-page">

          <div className="opening-content">

            <img
              className="monogram"
              src="/Elegant_S___N_Monogram_Emblem-removebg-preview.png"
              alt="Saleel and Nishana wedding monogram"
            />

            <button
              className="open-button"
              onClick={openInvitation}
            >
              OPEN INVITATION <span>→</span>
            </button>

          </div>

        </section>

      ) : (

        <>

          {/* PAGE 1 - WEDDING INVITATION */}

          <section
            className="page-section invitation-page"
            id="invitation"
          >

            <div className="section-content">

              <p className="arabic-text">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <p className="small-label">
                WITH THE BLESSINGS OF ALLAH
              </p>

              <h2 className="script-heading">
                Wedding Invitation
              </h2>

              <Ornament />

              <p className="invitation-message">
                With hearts filled with joy and gratitude,
                we cordially invite you to celebrate
                the wedding of
              </p>

              <div className="invitation-couple">

                <h2>
                  Adv. Saleel Nelliyali
                </h2>

                <span>&</span>

                <h2>
                  Nishana Sherin
                </h2>

              </div>

              <Ornament />

              <p className="invitation-message closing-text">
                Your gracious presence and blessings
                will make our celebration truly memorable.
              </p>

            </div>

          </section>


          {/* PAGE 2 - THE FAMILIES */}

          <section className="page-section couple-page">

            <div className="section-content">

              <p className="small-label">
                TWO FAMILIES · ONE CELEBRATION
              </p>

              <h2 className="script-heading">
                The Families
              </h2>

              <Ornament />

              <div className="family-details">

                {/* GROOM */}

                <div className="family-block">

                  <p className="family-role">
                    THE GROOM
                  </p>

                  <h2 className="person-name">
                    Adv. Saleel Nelliyali
                  </h2>

                  <div className="family-line" />

                  <p className="parent-details">
                    Son of
                    <br />
                    Abdul Majeed & Safiya
                  </p>

                </div>

                <div className="and-symbol">
                  &
                </div>

                {/* BRIDE */}

                <div className="family-block">

                  <p className="family-role">
                    THE BRIDE
                  </p>

                  <h2 className="person-name">
                    Nishana Sherin
                  </h2>

                  <div className="family-line" />

                  <p className="parent-details">
                    Daughter of
                    <br />
                    Abdul Majeed C & Suhara P
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* PAGE 3 - SAVE THE DATE */}

          <section className="page-section date-page">

            <div className="section-content">

              {/* MATCHING SCRIPT HEADING */}

              <h2 className="script-heading">
                Save the Date
              </h2>

              <Ornament />

              {/* DATE CARD */}

              <div className="date-card">

                <p className="weekday">
                  SATURDAY
                </p>

                <div className="date-display">

                  <span className="date-side-line" />

                  <h2 className="date-number">
                    12
                  </h2>

                  <span className="date-side-line" />

                </div>

                <p className="month-year">
                  DECEMBER
                </p>

                <p className="year-label">
                  2026
                </p>

              </div>

              <Ornament />

              {/* WEDDING TIME */}

              <div className="time-display">

                <p className="time-label">
                  WEDDING CELEBRATION
                </p>

                <h3 className="wedding-time">
                  5:00 PM <span>–</span> 9:00 PM
                </h3>

              </div>

              {/* COUNTDOWN */}

              <div className="countdown-area">

                <p className="countdown-heading">
                  COUNTING DOWN TO OUR SPECIAL DAY
                </p>

                <Countdown />

              </div>

            </div>

          </section>


          {/* PAGE 4 - WEDDING VENUE */}

          <section className="page-section venue-page">

            <div className="section-content">

              <p className="small-label">
                YOUR PRESENCE MEANS THE WORLD TO US
              </p>

              <h2 className="script-heading">
                Join Our Celebration
              </h2>

              <Ornament />

              <div className="venue-decoration">
                ⌖
              </div>

              <p className="venue-overline">
                THE WEDDING VENUE
              </p>

              <h2 className="venue-name">
                Koyas Convention Center
              </h2>

              <p className="venue-location">
                Valiyaparamba
              </p>

              <div className="venue-date">

                <span>
                  12 DECEMBER 2026
                </span>

                <span>
                  5:00 PM – 9:00 PM
                </span>

              </div>

              <Ornament />

              <a
                className="location-button"
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="map-symbol">
                  ⌖
                </span>

                VIEW LOCATION

                <span>
                  ↗
                </span>
              </a>

              <p className="location-note">
                Tap to open the venue in Google Maps
              </p>

            </div>

          </section>


          {/* PAGE 5 - CLOSING */}

          <section className="page-section closing-page">

            <div className="section-content">

              <p className="small-label">
                WITH LOVE & BLESSINGS
              </p>

              <h2 className="script-heading">
                A New Beginning
              </h2>

              <Ornament />

              <p className="closing-message">
                We look forward to celebrating
                this beautiful occasion with you.
                <br />
                Keep us in your prayers.
              </p>

              <div className="closing-names">

                <h2>
                  Saleel
                </h2>

                <span>&</span>

                <h2>
                  Nishana
                </h2>

              </div>

              <p className="closing-date">
                12 · 12 · 2026
              </p>

              <Ornament />

              <button
                className="back-button"
                onClick={backToCover}
              >
                ↑ BACK TO COVER
              </button>

            </div>

          </section>

        </>

      )}

    </main>
  );
}

export default App;
