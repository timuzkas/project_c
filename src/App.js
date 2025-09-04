
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const RandomString = () => {
  const [str, setStr] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setStr(Math.random().toString(36).substring(2, 15));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <p className="random-string">{str}</p>;};

const Barcode = () => (
  <svg className="barcode" width="200" height="50">
    <rect x="10" y="10" width="2" height="30" fill="#0f0" />
    <rect x="15" y="10" width="1" height="30" fill="#0f0" />
    <rect x="20" y="10" width="3" height="30" fill="#0f0" />
    <rect x="25" y="10" width="1" height="30" fill="#0f0" />
    <rect x="30" y="10" width="2" height="30" fill="#0f0" />
    <rect x="35" y="10" width="1" height="30" fill="#0f0" />
    <rect x="40" y="10" width="3" height="30" fill="#0f0" />
    <rect x="45" y="10" width="1" height="30" fill="#0f0" />
    <rect x="50" y="10" width="2" height="30" fill="#0f0" />
    <rect x="55" y="10" width="1" height="30" fill="#0f0" />
    <rect x="60" y="10" width="3" height="30" fill="#0f0" />
    <rect x="65" y="10" width="1" height="30" fill="#0f0" />
    <rect x="70" y="10" width="2" height="30" fill="#0f0" />
    <rect x="75" y="10" width="1" height="30" fill="#0f0" />
    <rect x="80" y="10" width="3" height="30" fill="#0f0" />
    <rect x="85" y="10" width="1" height="30" fill="#0f0" />
    <rect x="90" y="10" width="2" height="30" fill="#0f0" />
    <rect x="95" y="10" width="1" height="30" fill="#0f0" />
    <rect x="100" y="10" width="3" height="30" fill="#0f0" />
    <rect x="105" y="10" width="1" height="30" fill="#0f0" />
    <rect x="110" y="10" width="2" height="30" fill="#0f0" />
    <rect x="115" y="10" width="1" height="30" fill="#0f0" />
    <rect x="120" y="10" width="3" height="30" fill="#0f0" />
    <rect x="125" y="10" width="1" height="30" fill="#0f0" />
    <rect x="130" y="10" width="2" height="30" fill="#0f0" />
    <rect x="135" y="10" width="1" height="30" fill="#0f0" />
    <rect x="140" y="10" width="3" height="30" fill="#0f0" />
    <rect x="145" y="10" width="1" height="30" fill="#0f0" />
    <rect x="150" y="10" width="2" height="30" fill="#0f0" />
    <rect x="155" y="10" width="1" height="30" fill="#0f0" />
    <rect x="160" y="10" width="3" height="30" fill="#0f0" />
    <rect x="165" y="10" width="1" height="30" fill="#0f0" />
    <rect x="170" y="10" width="2" height="30" fill="#0f0" />
    <rect x="175" y="10" width="1" height="30" fill="#0f0" />
    <rect x="180" y="10" width="3" height="30" fill="#0f0" />
    <rect x="185" y="10" width="1" height="30" fill="#0f0" />
  </svg>
);

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  const handleRead = () => {
    setVideoPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => console.error("Video play failed:", error));
      video.requestFullscreen().catch(error => console.error("Fullscreen failed:", error));
    }
  };

  useEffect(() => {
    if (unlocked) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 5000); // 5-second hacker animation
      return () => clearTimeout(timer);
    }
  }, [unlocked]);

  useEffect(() => {
    if (videoPlaying) {
      const video = videoRef.current;
      const handleVideoState = () => {
        if (video.paused) {
          video.play();
        }
      };
      video.addEventListener('pause', handleVideoState);
      video.addEventListener('ended', handleVideoState);

      const onPlay = () => {
        video.muted = false;
        video.volume = 1;
      };
      video.addEventListener('play', onPlay);

      return () => {
        video.removeEventListener('pause', handleVideoState);
        video.removeEventListener('ended', handleVideoState);
        video.removeEventListener('play', onPlay);
      };
    }
  }, [videoPlaying]);

  return (
    <div className="App">
      <div className="noise"></div>
      {!unlocked && (
        <div className="unlock-screen fade-in">
          <button onClick={handleUnlock}>Unlock</button>
        </div>
      )}
      {unlocked && !animationComplete && (
        <div className="hacker-animation fade-in">
          <p>&gt; Initiating sequence...</p>
          <p>&gt; Bypassing security protocols...</p>
          <RandomString />
          <p>&gt; Locating primary node...</p>
          <p>&gt; Connection established.</p>
          <p>&gt; Fetching messages...</p>
          <Barcode />
        </div>
      )}
      {animationComplete && !videoPlaying && (
        <div className="message-screen fade-in">
          <h1>New messsage!</h1>
          <div className="button-container">
            <button onClick={handleRead}>Read</button>
            <span className="notification-badge">1</span>
          </div>
        </div>
      )}
      {videoPlaying && (
        <video
          ref={videoRef}
          src="/prank.mp4"
          className="fullscreen-video"
          preload="auto"
          autoPlay
          muted // Muted to allow autoplay
        />
      )}
    </div>
  );
}

export default App;
