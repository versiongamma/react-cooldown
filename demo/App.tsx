import useCooldown from 'react-cooldown';
import './App.css'
import Progress from './Progress';

const App = () => {
  const [onCooldown1, startCooldown1, { secondsRemaining: secondsRemaining1 }] = useCooldown();
  const [onCooldown2, startCooldown2, { secondsRemaining: secondsRemaining2 }] = useCooldown({ key: 'timer-2' });
  const [onCooldown3, startCooldown3, { secondsRemaining: secondsRemaining3 }] = useCooldown({ key: 'timer-3' });
  return (
    <>
      <h1>React Cooldown Demo</h1>
      <div className="card">
        <button onClick={() => startCooldown1(10000)} disabled={onCooldown1}>
          {onCooldown1 ? `Wait ${secondsRemaining1} Seconds` : "Start 10 Second Cooldown"}
        </button>
        <button onClick={() => startCooldown2(5000)} disabled={onCooldown2}>
          {onCooldown2 ? `Wait ${secondsRemaining2} Seconds` : "Start 5 Second Cooldown"}
        </button>
        <button onClick={() => startCooldown3(3000)} disabled={onCooldown3}>
          {onCooldown3 ? `Wait ${secondsRemaining3} Seconds` : "Start 3 Second Cooldown"}
        </button>
      </div>
      <Progress />
    </>
  )
}

export default App
