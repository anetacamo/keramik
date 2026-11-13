## INTRO

## Hello world

## Raw react APIs

## USING JSX

### spread operators

```js
const props = {children: "hello world", className: "container2}
const element = <div />
const element = <div className={props.className} children={props.children} />
const element = <div {...props} />
```

> the last will always win, so here the class my-container will be overwritten
> by container.

```js
const element = <div className="my-container" {...props} />;
const element = (
  <div className="my-container" {...props} className="my-other-container">
    Goodbye, world
  </div>
);
```

> so this will print `my-other-container` and Goodbye, world.

this is how those elements are being created:

```
var element = React.createElement("div", _extends(
        {className: "my-container"},
        props,
        {className: "my-other-container"}
    ),
    "Goodbye World);
createRoot(rootElement).render(element);
```

this creates a new instance of the object and gives it exactly the same
properties `const newObject = {...props}`

### Nesting JSX

jsx properties are a lot more similar to `dom properties` then to
`html attributes`. in jsx with use dom properties not html attributes

html attributes like class, for tag in forms are transformed into dom properties
like htmlFor

#### HTML attribute

- Defined in HTML markup
- Always a string
- Sets the initial value

```js
<input value="hello">
el.getAttribute("class")
```

#### DOM properties

- Exists on the element’s JS object
- Can be any data type
- Represents the current value/state

```js
input.value;
el.className;
```

### Fragments

since we are using createElement function `createElement('div')` you cannot
assign a two values to single variable. there is space for only one div or only
one fragment.

## CUSTOM COMPONENTS

functions (that createElements) with parameters (object via props) that return
something renderable: string or components

```
const props = {name: "World"}
<Greeting name="world">

function Greeting(props) { return <h1>Hello, {props.name}</h1> }
```

### 1.Simple functions

### 2.Raw API

### Jsx Components

### Props

## TYPESCRIPT

## STYLING

## FORMS

## INPUTS

### radio

comes from old fashion push button radios'

```js
<fieldset>
  <legend>Visibility</legend>
  <label>
    <input name="visibility" type="radio" value="public" />
    Public
  </label>
  <label>
    <input name="visibility" type="radio" value="private" />
    Private
  </label>
</fieldset>
```

### hidden inputs

```js
<input type="hidden" name="userId" value="0078">
```

## ERROR BOUNDARIES

```
const { showBoundary } = useErrorBoundary()
```

## RENDERING ARRAYS
