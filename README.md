# react-cooldown

A hook allowing for frontend cooldowns in a React project.

## Installation

```bash
# NPM
npm install react-cooldown
# Yarn
yarn add react-cooldown
# PNPM
pnpm add react-cooldown
```

## Usage

Basic usage:
```typescript
import useCooldown from 'react-cooldown';

const CooldownButton = () => {
  const [onCooldown, startCooldown] = useCooldown();

  const handleClick = () => {
    startCooldown(10000);
    // other stuff ...
  }

  return (
    <button disabled={onCooldown} onClick={handleClick}>
  )
}
```
