# react-native-patterns

### A react native component library that allows you to build reproducible abstract patterns for your application.

This library was built using `@shopfiy/react-native-skia`

<img width="1226" alt="Screenshot 2023-11-08 at 14 27 58" src="https://github.com/lewiscasewell/react-native-patterns/assets/64678409/00eb3935-61e9-4b7e-82b7-41cbae402bf1">

## Features

- uniqueKey prop allows you to assign a pattern to an id, so that it will be the same every time
- Can blur, or add an overlay, or custom styles
- Works just like a View component
- Written in typescript
- Compatible with expo

![Screen Recording 2023-11-28 at 11 35 30](https://github.com/lewiscasewell/react-native-patterns/assets/64678409/864c8443-c321-44ab-9015-454a94b72524)

## Installation

```bash
yarn add @shopify/react-native-skia
yarn add react-native-patterns
```

## Usage

### MeshGradient

```tsx
import { MeshGradient } from 'react-native-patterns';

const uniqueKey = 'some-unique-key'; // such as an id
const someNiceColors = ['#51C4D3', '#FF2BF1', '#32FF2B', '#311263'];

function App() {
  return (
    <MeshGradient
      // required
      uniqueKey={uniqueKey}
      width={200}
      height={200}
      // optional
      // default colors are generated via uniqueKey
      colors={someNiceColors}
      // default black
      overlayColor="white"
      overlayOpacity={0.5}
      blurRadius={0.5}
      style={{
        borderRadius: 20,
      }}
    />
  );
}
```

Or you can also choose to wrap around other components…

```tsx
<MeshGradient
  uniqueKey="hello-world"
  width={200}
  height={200}
  overlayOpacity={0.5}
  style={{
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Text>Hello, world!</Text>
</MeshGradient>
```

If using in list, would recommend using with `@shopify/flash-list` for better performance.

### Grid

```tsx
import { Grid } from 'react-native-patterns';

const uniqueKey = 'some-unique-key'; // such as an id

function App() {
  return (
    <Grid
      // required
      uniqueKey={uniqueKey}
      width={200}
      height={200}
      // optional
      frontColor="#51C4D3"
      backColor="#FF2BF1"
      borderSize={0.5}
      zoomPercentage={40}
      mask="none"
      style={{
        borderRadius: 20,
      }}
    />
  );
}
```
