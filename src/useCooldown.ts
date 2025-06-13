import { useCallback, useEffect, useState } from "react";
import { clearTimer, getTimer, setTimer, type Timer } from "./storage";

type Params = {
  key?: string
  updateFrequency?: number
}

/**
 *
 * @param key Can be used to make different cooldowns on the same component.
 * @param updateFrequency The frequency in which to update the time remaining (and cooldown state), in milliseconds. Defaults to 1000 (once a second).
 * @returns
 */
const useCooldown = (params?: Params): [
  boolean,
  (duration: number) => void,
  {
    timeRemaining: number,
    secondsRemaining: number,
  }
] => {
  const { key = "timer", updateFrequency = 1000 } = params ?? { };

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [onCooldown, setOnCooldown] = useState(false);

  const startTimerIntervalFn = useCallback((timer: Timer): NodeJS.Timeout => {
    const update = (): number => {
      const diff = new Date().getTime() - timer.time;
      setTimeRemaining(timer.duration - diff);
      setSecondsRemaining(Math.trunc(Math.min(((timer.duration - diff) / 1000) + 1, timer.duration / 1000)));
      return diff;
    }

    update()
    /** Update Loop */
    const intervalId = setInterval(() => {
      const diff = update();
      if (diff > timer.duration) {
        setOnCooldown(false);
        setTimeRemaining(0);
        setSecondsRemaining(0);
        clearTimer(key)
        clearInterval(intervalId);
      }
    }, updateFrequency)
    return intervalId;

  }, [key, updateFrequency]);

  /**
   *
   */
  const startCooldown = useCallback((duration: number) => {
    setOnCooldown(true);
    const timer = setTimer(key, duration);
    startTimerIntervalFn(timer);
  }, [key, startTimerIntervalFn])

  // Run on first render only
  useEffect(() => {
    const previousTimer = getTimer(key);
    if (previousTimer) {
      if (previousTimer.time + previousTimer.duration < new Date().getTime()) {
        setOnCooldown(false);
        clearTimer(key);
        return;
      }

      const intervalId = startTimerIntervalFn(previousTimer);
      setOnCooldown(true);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [onCooldown, startCooldown, { timeRemaining, secondsRemaining }];
}

export default useCooldown;
