import useCooldown, { FREQUENCIES } from "react-cooldown";

const DURATION = 3000;

const Progress = () => {
  const [onCooldownLinear, startCooldownLinear, { timeRemaining }] = useCooldown({ key: "linear", updateFrequency: FREQUENCIES[60]  });
  const percent = Math.trunc(timeRemaining / DURATION * 100);
  const background = percent > 0 ?
    `linear-gradient(90deg,rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) ${percent - 1}%, rgba(26, 26, 26, 1) ${percent}%)` :
    "#1a1a1a";
  return (
    <button
      disabled={onCooldownLinear}
      onClick={() => startCooldownLinear(DURATION)}
      style={{ background }}
    >
      Linear Cooldown Bar
    </button>
  )
}

export default Progress;
