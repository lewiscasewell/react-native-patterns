# react-native-patterns

### A react native component library that allows you to build reproducible abstract patterns for your application.

This library was built using `@shopfiy/react-native-skia`

## Features

- uniqueKey prop allows you to assign a pattern to an id
- Can blur, or add an overlay, or custom styles
- Works just like a View component
- Written in typescript
- Compatible with expo

## Installation

```bash
yarn add react-native-reanimated
yarn add @shopify/react-native-skia
yarn add react-native-patterns
```

## Usage

```tsx
import { MeshGradient } from 'react-native-patterns';

const uniqueKey = 'some-unique-key';
const someNiceColors = ['#51C4D3', '#FF2BF1', '#32FF2B', '#311263'];

function App() {
  return (
    <MeshGradient
      // required
      uniqueKey={uniqueKey}
      width={200}
      height={200}
      // optional
      // default colors are randomly selected
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
