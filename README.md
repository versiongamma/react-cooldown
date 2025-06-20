# React Cooldown
![NPM Version](https://img.shields.io/npm/v/react-cooldown?logo=npm)
![NPM License](https://img.shields.io/npm/l/react-cooldown)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/react-cooldown?logo=npm)
![GitHub branch check runs](https://img.shields.io/github/check-runs/versiongamma/react-cooldown/main?logo=github)

A hook allowing for frontend cooldowns in a React project.

> ⚠️ NOTE: This is only for frontend protection. It will not protect direct access to endpoints, and should be paired with
> rate limiting or some other kind of endpoint protection if necessary.

See examples of how it can be used [here](https://versiongamma.github.io/react-cooldown/).

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
