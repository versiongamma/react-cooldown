import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = 'time';

/**
 * 
 * @param cooldownDuration Duration of the cooldown, in milliseconds. 
 * @param updateFrequency Frequency for the `timeRemaining` to update, in milliseconds. Default is 1000 (1 second). 
 * @returns 
 */
const useCooldown = (cooldownDuration: number, updateFrequency: number = 1000) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [onCooldown, setOnCooldown] = useState(false);

  const getTimeSinceStart = (): number => {
    const startTime = localStorage.getItem(STORAGE_KEY);
    if (startTime) {
      const diff = new Date().getTime() - parseInt(startTime);
      return diff;
    }

    return 0;
  }

  const startTimerIntervalFn = useCallback((elapsed?: number): number => {
    const update = (): number => {
      const diff = getTimeSinceStart();
      setTimeRemaining(cooldownDuration - diff - (elapsed ?? 0));
      return diff;
    }

    update()
    const intervalId = setInterval(() => {
      const diff = update();
      if (diff > cooldownDuration) {
        setOnCooldown(false);
        setTimeRemaining(0);
        localStorage.removeItem(STORAGE_KEY);
        clearInterval(intervalId);
      }
    }, updateFrequency)
    return intervalId;
  }, [cooldownDuration, updateFrequency])

  const startCooldown = () => {
    setOnCooldown(true);
    localStorage.setItem(STORAGE_KEY, new Date().getTime().toString())
    startTimerIntervalFn();
  }

  useEffect(() => {
    const previousStartTime = localStorage.getItem(STORAGE_KEY);
    if (previousStartTime) {
      const intervalId = startTimerIntervalFn();
      setOnCooldown(true);
      return () => clearInterval(intervalId);
    }
  }, [startTimerIntervalFn])

  return { onCooldown, timeRemaining, startCooldown }
}

export default useCooldown;