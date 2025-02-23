"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Maximize, Linkedin } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function InterviewPageFinal() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Load stored progress when the component mounts
  useEffect(() => {
    const savedProgress = localStorage.getItem("videoProgress")
    if (savedProgress && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedProgress)
      setProgress((parseFloat(savedProgress) / videoRef.current.duration) * 100)
    }

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      const newTime = (videoRef.current.duration * percentage) / 100
      videoRef.current.currentTime = newTime
      setProgress(percentage)
      localStorage.setItem("videoProgress", newTime.toString()) // Save progress
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(newProgress)
      localStorage.setItem("videoProgress", videoRef.current.currentTime.toString()) // Update progress
    }
  }

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <div className="relative h-screen bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">Paolo Gaudiano</h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-300">An Expert in Diversity & Inclusion</p>
          <div className="mx-auto flex space-x-4 justify-center">
            <Link
              href="/nowhere"
              className="bg-white text-black hover:bg-gray-200 text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105"
            >
              Access full report
            </Link>

            <Link
              href="/reports/paolo-meeting-planner"
              className="bg-white text-black hover:bg-gray-200 text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105"
            >
              Access meeting planner
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-full">
            {/* Video Container */}
            <div
              ref={containerRef}
              className={`relative aspect-video mb-8 ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => {
                if (isPlaying && !isFullscreen) setShowControls(false)
              }}
            >
              <video
                ref={videoRef}
                src={"/videos/interview.mp4"}
                className="w-full h-auto rounded-lg"
                controls={false} // Custom controls only
                onPlay={() => setShowControls(false)}
                onPause={() => setShowControls(true)}
                onTimeUpdate={handleTimeUpdate} // Track video progress
              />

              {/* Custom Play/Pause Button */}
              {showControls && (
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-30 ${
                    isFullscreen ? "!bg-opacity-30" : ""
                  }`}
                >
                  <button
                    className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </button>
                </div>
              )}

              {/* Custom Video Controls (Including Fullscreen) */}
              {showControls && (
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 ${
                    isFullscreen ? "fixed bottom-4 left-1/2 transform -translate-x-1/2 w-3/4" : ""
                  }`}
                >
                  <div className="flex items-center justify-between text-white">
                    {/* Progress Bar */}
                    <input
                      type="range"
                      className="w-full"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleProgressChange}
                    />
                    <div className="mx-3 flex space-x-4">
                      <Maximize className="h-6 w-6 cursor-pointer" onClick={toggleFullScreen} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Speaker Info */}
            <div className="bg-gray-900 text-white rounded-lg shadow-lg">
              <div className="p-6 flex items-center space-x-6">
                <Image src="/person/paolo.png" alt="Paolo Gaudiano" width={150} height={150} className="rounded-full" />
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
