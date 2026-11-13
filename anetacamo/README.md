# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Element optimization

Sometimes part of component changes and part remains static.
Static part does not need to be re-rendered.

```jsx
function App() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);

  render(
    <div>
      //static
      <Message greeting="hello" />
      //dynamic
      <Counter count={count} />
    </div>,
  );
}
```

THIS WAY: message becomes an object.
That object will be triple equal. JSX1 is triple equal to JSX2. These are exactly the same.
When React is going through and doing its virtual DOM diffing, comparing old elements with the new elements, these are the exact same object.

```jsx
// jsx1 === jsx2
const message = <Message greeting="hello" />

<div>
  {message}
  <Counter count={count} />
</div>
```

the idea of this element is unchanged, therefore, we don't need to re-render it.

## ADDITION

```jsx
function App(props) {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      {props.message}
      <Counter count={count} />
    </div>
  );
}

ReactDOM.render(
  <App message={<Message greeting="hello" />} />,
  document.getElementById("root"),
);
```

PREVIOSLY: Because the Message props object has changed, React needs to re-run the Message function to make sure that it doesn't get any new JSX based on the new props object

BUT: If the props don't change, then React knows that our effects shouldn't need to be re-run and our JSX shouldn't change
HOWEVER: react creates a brand new props object every time we create a React element
SOLUTION: divide the props

In summary, if you're experiencing performance issues, try this:

"Lift" the expensive component to a parent where it will be rendered less often.
Then pass the expensive component down as a prop.

That composition actually does improve performance, because it eliminates unnecessary re-renders.

02:20 When a component is rendered by a parent and has some state change in that parent, and it doesn't care about that state, yeah, by composing, you can make it faster.

# Optimize Context

## Intro

## Memoize Context

```tsx

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("")
  const [name, setName] = useState("")
  const value = {color, name};
  return (
    <FooterContext value={value}>
      <FooterSetters setColor={setColor} setName={setName}>
      <Counter count={count} setCount={setCount}>
      <Main footer={<Footer/>}>
    </FooterContext>
  )
}

```

```tsx
<Main>
  <Footer />
</Main>
```

if you have one global state <FilterContext /> and wrap everything around it it will get all the children re rendered.

In this example footer doesn't care about the app count
we dont want to rerender footer on app count changes

footer is re-rendering because the context changed, even though the individual values of context did not change. So we need to memoize this.

on this line we are actually creating a brand new object on each render which makes the whole Context rerender.
So triple equals false.

`const value = {color, name};`

therefore this is EXACTLY what needs to be memoized.

`const value = useMemo(() => ({color, name}), [color, name]);`

## Provider component

```tsx

const FooterContext = createContext<{
  color: string;
  setColor: (color:string) => void
  name: string;
  setName: (name:string) => void
} | null>(null)

function FooterProvider({ children }:{ children:React.RectNode }) {
  const [color, setColor] = useState("")
  const [name, setName] = useState("")
  const value = useMemo(
    () => ({color, name, setColor, setName}),
    [color, name, setColor, setName]
  );

  return (
    <FooterContext value={value}>
      {children}
    </FooterContext>
  )
}

function useFooter() {
  const context = use(FooterContext)
  if (!context) throw new Error('FooterContext not found')
  return context
}


function App() {
  const [count, setCount] = useState(0)
  return (
    <FooterProvider>
      <FooterSetters />
      <Counter count={count} setCount={setCount}>
      <Main><Footer /></Main>
    </FooterProvider>
  )
}
```

footer provider is receiving color and name as children and if they dont change the component wont rerender

## Split context
