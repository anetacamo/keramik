## ADVANCED STATE MANAGEMENT

```tsx
function NameReducer(previousName: string, newName: string) {
  return NewName;
}

const initialNameValue = "Joe";

function NameInput() {
  const [name, setName] = useReducer(nameReducer, initialNameValue);
  const handleChange = (event) => setName(event.currentTarget.value);
  return (
    <div>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You type: {name}</div>
    </div>
  );
}
```

## STATE OPTIMIZATION

if useState is number zero and we set our component to number 0 react wont cause re-render
however if we have object { count: 0 } and we setState to { count:0 } - it will be understood as new instance of this object
form submitting the same value will also trigger unnecessary re-render

trick to avoid the rerenders when values are unchanged

```tsx
setSearchParamsState((prevParams) => {
  if (prevParams.toString() === searchParams.toString()) {
    return prevParams;
  }
  return searchParams;
});
```

## CUSTOM HOOKS

> functions that use other hooks
> always prefixed with hooks.

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}
```

#### memoisation

take a computation, store it somewhere. And anytime you need to perform that computation again, you can look there and see, did we already do this - and return that instead.

#### useMemo

```tsx
const increment = useMemo(() => () => setCount((c) => c + 1), []);
```

#### useCallback

helper build on top of useMemo
this will memoize the function thats its given.
and as long as the dependency wont change it will give you the same function back.

```tsx
const increment = useCallback(() => setCount((c) => c + 1), []);
```

### Hook function

## SHARED CONTEXT

two different components might need access to the same computation.

## PORTALS

```tsx
const { createPortal } from 'react-dom'

function Modal({title, handleClose}:{title:string, handleClose: () => void}) {
    return createPortal(
        <div>{title}</div>,
        document.body,
    )
}

```

## LAYOUT COMPUTATION

### Mount phase

- run lazy initializers

### Update

- Render
- React updates dom
- Cleanup layout effects
- Run layout effects
- Browser pains screen
- Cleanup effects
- Run effects

### useLayoutEffect

> If what you are doing in the use effect is going to impact the way that something looks in the UI, on initial render especially, then you are going to want to use use layout effect.

```tsx
let now = performance.now();
while (performance.now() - now < 100) {
  // do nothing for a bit
}
```

```tsx
export default function Tooltip() {
  const ref = useRef<HTMLElement | null>(null);
  const [toolTipHeight, setToolTipHeight] = useState(0);

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const { height } = rect;
    setTooltipHeight(height);
  }, []);

  let toolTipY = 0;
  let toolTipX = 0;
  if (targetRect !== null) {
    toolTipY = targetRect.left;
    toolTipX = targetRect.top - toolTipHeight;
    if (toolTipY < 0) {
      toolTipY = targetRect.bottom;
    }
  }
}
```
