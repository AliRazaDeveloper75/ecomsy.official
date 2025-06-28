function sayHello(name) {
  let greeting = "Hello, " + name;
  debugger; // code will pause here if DevTools is open
  console.log(greeting);
  return greeting;
}

sayHello("Ali");
