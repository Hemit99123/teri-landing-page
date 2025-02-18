"use client";

import { useState, useRef } from "react";
import { Play, Pause, Maximize, Linkedin } from "lucide-react";
import Image from "next/image";

export default function InterviewPageFinal() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <div className="relative h-screen bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">Paolo Gaudiano</h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-300">An Expert in Diversity & Inclusion</p>
          <button className="bg-white text-black hover:bg-gray-200 text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105">
            Access full report
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-2">
            <div
              className="relative aspect-video mb-8"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => {
                if (isPlaying) setShowControls(false);
              }}
            >
              <video
                ref={videoRef}
                src="/videos/interview.mp4"
                className="w-full h-auto rounded-lg"
                controls={false}
                onPlay={() => setShowControls(false)}
                onPause={() => setShowControls(true)}
              />

              {showControls && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-30">
                  <button
                    className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </button>
                </div>
              )}

              {showControls && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <input 
                      type="range" 
                      className="w-2/3" 
                      min="0" 
                      max="100" 
                      defaultValue="0" 
                      onChange={(e) => {
                        const percentage = parseFloat(e.target.value);
                        if (videoRef.current) {
                          videoRef.current.currentTime = (videoRef.current.duration * percentage) / 100;
                        }
                      }}
                    />
                    <div className="flex space-x-4">
                      <Maximize className="h-6 w-6 cursor-pointer" onClick={toggleFullScreen} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-900 text-white rounded-lg shadow-lg">
              <div className="p-6 flex items-center space-x-6">
                <Image
                  src="/person/paolo.png"
                  alt="Paolo Gaudiano"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Paolo Gaudiano</h2>
                  <p className="text-gray-300 mb-4">TEDx Speaker | Diversity & Inclusion Expert</p>
                  <a
                    href="https://www.linkedin.com/in/pgaudiano/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 relative">
              Key Insights
              <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-white"></span>
            </h2>
            {["Inclusive Innovation", "Future of DEI", "Overcoming Bias", "Measuring Impact"].map((insight, index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-semibold mb-2 transition-transform transform group-hover:translate-x-2">
                  {insight}
                </h3>
                <p className="text-gray-400">
                  Discover groundbreaking perspectives on {insight.toLowerCase()} in the workplace.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500 pb-8">
        <p>© 2025 DEI360. Empowering diversity, equity, and inclusion.</p>
      </footer>
    </div>
  );
}
