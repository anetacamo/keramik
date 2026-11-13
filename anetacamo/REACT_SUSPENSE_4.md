# react suspense

## 1 | DATA FETCHING

- pending state
- error state

### useHook

useHook is used to consume promises
no await syntax

### Throwing Promises

```tsx
function PhoneDetails() {
  const details = use(phoneDetailsPromise);
  // now you have the details
}
```

```tsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<>error</>}>
      <Suspense fallback={<>loading</>}>
        <PhoneDetails />
      </Suspense>
    </ErrorBoundary>
  );
}
```

> If this OR ANY of the kids components throw an error, Error Boundary will render.
> This way error boundary will also handle error that can potentially happen within the Suspense

### Error Handling

## 3 | OPTIMISTIC UI

mechanism for updating the state durning transition
heart will turn red right away after being clicked before the actual backend call / computation is being made

### useOptimistic()

here in state we are setting a fallback value = NOT OPTIMISTIC

```tsx
cons[(isComplete, setIsComplete)] = useOptimistic(todo.isComplete);
```

form actions are called within useTransition so untill the call will be complete
we will hold the old value of the UI. you cannot call the state within formAction because react will not update the state and will wait for the whole transition to be doneuse

FormStatus()submit button has to be a child
form status gives us pending, formData, method, action

```tsx
const [message, setMessage] = useOptimistic(‘Create’);

return (
    <div>
        <p>Create a new Ship</p>
            <ErrorBoundary />
                <form action={async formData => {
                    setMessage(‘Creating…’)
                    setOptimisticShip(await createOptimisticShip(formData))
                    await createShip(formData,2000)
                    setMessage(‘Created, loading…’)
                    setShipName(formData.get(‘name’) as string))

```

```tsx
function SubmitButton() {
    const formStatus = useFormStatus()

    return (
        <button type="submit" disabled={pending}>
            {children} {formStatus.pending ? ‘Creating…’ : ‘Create’}
        </button>
    )
}
```

MultiStepActions
4 | SUSPENSE IMG

strange default image behaviour: when image is loading it gets grayed out after the laoding is done it gets ungrayed and THEN it changes. Img error boundaryfunction ShipIng(props: React.ComponentProps<‘img’>) { return ( <ErrorBoundary fallback={<img {…props} />}> <Ing {…props} /> </ErrorBoundary> )}
5 | RESPONSIVENESS
the problem: now anytime we update input whole component suspends including the input and does not track another key strokes UNTILL component is loadedTHEREFORE useTransition is not ideal for this use case. we will use useDeferredValue instead.useDeferredValue will allow component to BRANCH and render one component instantly on every key stroke while suspending other componentit will keep too states: old state and new stateconst [search, setSearch] = useState(‘’);const defferedSearch = useDeferredValue(search)const isPending = useSpinDelay(search !== deferredSearch, { delay:300, minDuration: 350,})
6 | OPTIMISATIONS

Parallel loading

by default loading happens in the waterfall manner.
we are loading the data - then we are loading the image - then we render the componentwe do not fetch the ship from props but directly
we suspend when we call use
function ProfileDetails() { const favouritesCount = use(getFavouriteCounts(usename))
const friends = use(getFriends(usename))}this code with trigger one call and then it will be waiting for the whole coll to finishTHEN it will call friendsbut those two are not dependent on each other so can as well be called simultaneously

function ProfileDetails() { const favouritesCountPromise = getFavouriteCounts(usename)
const friendsPromise = getFriends(usename) const favouritesCount = use(favouriteCountPromise)
const friends = use(friendsPromise)}Server cache

- showed a difference between useTransition and useDeferredValuereact will render your component twiceonce will old value and once with newonce new is loaded it will replace the oldconst defferedValue(useDeferredValue(value)const pending = defferedValue !== value—ACCOUNT SELECTORfirst time you want to see skeletonson search you want to useDefferedValue+ optimisitc update on toggle statesfind places where useOptimistic can be used usedTransitionstyles.isStillmake utility classes -> we used it in multiple places
