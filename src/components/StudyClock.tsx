import { useEffect, useState } from "react";
import { MdFullscreen } from "react-icons/md"

export default function StudyClock() {
  /* a feladathoz igazából nincs sok köze, csak kellett valami nem túl figyelemelvonó, ami a monitoron megy tanulás közben */
  const [seconds, setSeconds] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (

    <section id="fullscreen-clock" className="hidden lg:flex h-screen relative justify-center items-center">
      <h2 className="py-4">Tanulást segítő óra</h2>

      <button className="absolute top-3 right-3" onClick={async () => {
        const clock = document.getElementById("fullscreen-clock")
        let wakeLock: WakeLockSentinel | null = null;
        if (!document.fullscreenElement) {
          clock?.requestFullscreen()
          wakeLock = await navigator.wakeLock.request()
        } else {
          document.exitFullscreen()
          wakeLock!.release()
        }
      }}>
        <MdFullscreen size={24} />
      </button>
      <div className="relative font-semibold lg:*:text-9xl xl:*:text-[15rem] *:flex  *:top-0">

        <p>{new Date(seconds + 1000).toTimeString().substring(0, 9).replaceAll(":", " : ").trim()}</p>
      </div>

      {/* nincs elmentve, csak dekoratív elem */}
      <div className="absolute items-center flex flex-col bottom-2">
        <input type="text" name="moth" placeholder="Jelenlegi cél" className="opacity-50 text-2xl text-center bg-transparent shadow-none" />
      </div>

    </section>
  )
}