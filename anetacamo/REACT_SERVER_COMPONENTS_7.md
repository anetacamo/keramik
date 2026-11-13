## Warmup

### Typical SPA

- User goes to a site (Browser).
- Browser requests a document from Server.
- Server sends the document back to Browser
- Browser renders spinner to User
- Browser requests client code from Server
- Server sends client code to Browser
- Browser updates UI to User
- Browser requests data from Server
- Server sends JSON to Browser
- Browser updates UI with JSON data to User
- User interacts, triggers state change => Browser
- Browser renders pending UI to User
- Browser requests new data from Server
- Servers sends JSON to Browser

## Server components / actions

- User goes to a site (Browser).
- Browser requests a document from Server.
- Server sends the document back to Browser.
- Browser requests JSX payload from Server
- Browser renders Suspense Fallback to User

> we are sending ui over to the server, where its serialized and after deserialized.

special format for react serv components

#### RSC payload

similar to json

https://rsc-parser.vervel-app

renderToPipeableStram => takes components and serializes them into the json like looking code

server side components vs server side rendering

we are fetching index
server components have to be stateless

tanstack start -> client first approach
loader functions and before load will be loaded on the server
we can load without using users memory

## streaming

## Client router

not requesting data - but UI

### Race conditions

```tsx
const latestNav = useRef(null);

function navigate(nextLocation, { replace = false } = {}) {
  setNextLocation(nextLocation);
  const thisNav = Symbol(`Nav for the ${nextLocation}`);
  latestNav.current = thisNav;
}
```
