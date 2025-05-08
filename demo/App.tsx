import useCooldown from '../src'
import './App.css'

const App = () => {
  const { onCooldown, timeRemaining, startCooldown } = useCooldown(5000, 100);
  return (
    <>
      <h1>React Cooldown Demo</h1>
      <div className="card">
        <p>{timeRemaining}</p>
        <button onClick={startCooldown} disabled={onCooldown}>
          Start Cooldown
        </button>
      </div>
    </>
  )
}

export default App
