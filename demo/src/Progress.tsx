import useCooldown, { FREQUENCIES } from "../../src";
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Progress.css';

const DURATION = 3000;

const Progress = () => {
  const [onCooldownLinear, startCooldownLinear, { timeRemaining: timeRemainingLinear }] = useCooldown({ key: "linear", updateFrequency: FREQUENCIES[60] });
  const [onCooldownRadial, startCooldownRadial, { timeRemaining: timeRemainingRadial }] = useCooldown({ key: "radial", updateFrequency: FREQUENCIES[60] });
  const linearPercent = Math.trunc(timeRemainingLinear / DURATION * 100);
  const background = linearPercent > 0 ?
    `linear-gradient(90deg,rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) ${linearPercent - 1}%, rgba(26, 26, 26, 1) ${linearPercent}%)` :
    "#1a1a1a";

  const radialPercent = onCooldownRadial ? 100 - Math.trunc(timeRemainingRadial / DURATION * 100) : 0;
  return (
    <>
      <button
        disabled={onCooldownLinear}
        onClick={() => startCooldownLinear(DURATION)}
        style={{ background }}
      >
        Linear Cooldown Bar
      </button>
      <div className="circular-progress" onClick={onCooldownRadial ? () => { } : () => startCooldownRadial(3000)} aria-disabled={onCooldownRadial}>
        <CircularProgressbarWithChildren value={radialPercent} strokeWidth={12} styles={buildStyles({
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // Text size
          textSize: '12px',
          pathTransition: 'none',
          trailColor: onCooldownRadial ? "#FF0000" : "#1A1A1A",
          pathColor: "#1A1A1A"
        })} >
          <span style={{ fontSize: 18, color: onCooldownRadial ? "#75747A" : "#FFFFFF" }}>Radial <br /> Cooldown</span>
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}

export default Progress;
