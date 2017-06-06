function changeProp(event, store) {
  event.preventDefault();
  const el = event.target;
  if (el.id in store)
    store[el.id] = el.value;
  else if (el.name in store)
    store[el.name] = el.value;
  else
    console.warn('Store not updated. Not found key from react element.');
}


export { changeProp };
