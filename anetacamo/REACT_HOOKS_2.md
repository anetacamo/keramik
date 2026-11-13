## INTRO

What happens when the state changes?

## MANAGING UI STATE

#### React app lifecycle

- _initial render_ - react creates dom nodes from existing elements. ->
- _dom elements are created_
- _user interacts_
- _state changes/updates_
- _re-render_ - React compares existing state to user triggered changes and ->
- _updates dom again_

> use state will render its own self including all the children, unless you prevent it with:

- React.memo
- useMemo
- useCallback

> it is prefered to derive constants from state

### useState

in console:
right click any element and write `$0.value` will print its value

### Controlling input

-> we wanna programmatically manipulate or control the users input.
if all you're doing is setting the value to what the user is actually typing, then you dont need this as thats default input behavior already.

#### Uncontrolled input (DOM controls value)

You read the value when needed (via ref), not on every keystroke.

```
export default function UncontrolledInput() {
  const inputRef = useRef();

  const handleClick = () => {
    alert(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} placeholder="Uncontrolled input" />
      <button onClick={handleClick}>Get value</button>
    </>
  );
}
```

### Derived State

if we have two states and one is dependent on the other, it is easier to derive the second one from the first one in order to avoid unwanted re-renders

### Initialize State

### Init CallBack

Let's imagine we have a function that calculates the initial value and it's computationally expensive:

#### lazy initializor for useState

```js
const initialValue = calculateInitialValue();
const [val, setValue] = useState(initialValue);
```

calculateInitialValue() runs every render of the component function
even though React only uses it on the first mount

So you pay the cost every render unnecessarily.

```js
const [val, setValue] = useState(() => calculateInitialValue());
```

lazy initializor

- React calls the function only once
- only during the initial render (mount)
- never again on re-renders

## SIDE EFFECTS

Side-effects are things that happen outside our React components.
For example, things outside our React components include:
Browser APIs like local storage, geolocation, media devices, etc.
Integrations with third-party libraries like D3, Chart.js, etc.

### useEffect

hook with callback

```js
useEffect(() => {
    doSomething()
    return function cleanup() {
    doSomeCleanup();
  },
},[dep1, dep2])

```

> strict mode enabled calls the useEffect callback twice, this will catch problems like lack of idempotency in your component

It will call the callback, then it will call the cleanup, then it will call the callback again.

_idempotency_ -> Doing it once or many times gives the same result.

#### cleanup

Use cleanup when you set up something that doesn’t auto-stop:

- timers
- event listeners
- Subscriptions (WebSockets, APIs, etc.)

Cleanup runs:

before the effect runs again (on dependency change)
when the component unmounts

#### MOUNT PHASE

- Run lazy initializers: - This step involves executing any lazy initialization functions provided to hooks like useState or useReducer. These functions are only run during the initial render.

#### UPDATE PHASE

triggered by a parent re-render, state change, or context change

- Render: The component re-renders, evaluating its function body.
- React updates DOM: React applies any changes from the render phase to the DOM.
- Cleanup LayoutEffects: Before running any new layout effects, React cleans up the previous ones defined in useLayoutEffect.
- Run LayoutEffects: Runs the effects defined in useLayoutEffect immediately after DOM updates, blocking the browser painting until complete.
- Browser paints screen: The browser updates the visual representation of the page.
- Cleanup Effects: Cleans up any effects defined in useEffect from the previous render.
- Run Effects: Runs the effects defined in useEffect. These are scheduled to run after the paint, so they don't block the browser from updating the screen.

UNMOUNT PHASE

- React performs cleanup for both useEffect and useLayoutEffect hooks, preventing memory leaks by removing event listeners, canceling network requests, or invalidating timers set up by the component.

```js
useEffect(() => {
  window.addEventListener("popstate", () => setQuery(getQueryParam()));
}, []);
```

### Lifting the state

### DOM Side Effects

#### Primitive dependencies

by avoiding comparing object to object (always returns false even if same) destructure the objects into its value and compare those

### unique Ids

`const id = useId();`
