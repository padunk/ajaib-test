## 1. Explain how Object Oriented Programming works with a thorough understanding of the keyword this and the new keyword

- JS is prototype based programming language and its embrace OOP through constructor functions and with ES6 Class keyword. A class is like a blueprint and an instance is initiated with the `new` keyword . The new keyword will create new object and sets the prototype of this object to its constructor property.
- `this` in JS in complicated. But in class / constructor function, `this` refer to the class/ function itself or more specific the current instance.

## 2. What is the new class syntax and how to create instance methods, class methods?

- Class syntax is a syntatic sugar over constructor functions, introduce in ES6 . So it looks like writing class in other programming language in JS. JS doesn’t have native class object. `class Person {}; typeof Person // function`
- Class method and instance method is create by declaring a function as a method, just like creating function in object. Example:

  ```js
  class Person {
    constructor(name) {
      this.name = name;
    }

    greet() {
      console.log(this.name);
    }
  }
  ```

## 3. Give an example of how to implement inheritance in ES2015 using extends and super.

- Example:

```ts
class People {
  readonly nationality: string;

  constructor(nationality: string) {
    this.nationality = nationality;
  }

  check() {
    console.log(" I am a " + this.nationality);
  }
}

class Person extends People {
  constructor(nationality: string) {
    super(nationality);
  }

  talk() {
    console.log("talk");
  }
}
```

- The `extends` keyword means that the Person class inherit from the People class
- The `super` keyword means to invoke parent / base class’s constructor. Super is needed to call before using any of `this` keyword in the child class if the class has constructor. You don’t need `super` in parent class.

## 4. Imagine refactoring an ES5 application to use ES2015, how would you go about it?

- We must know and discuss the difference first and what is the trade-off to our codebase.
- ES2015/ ES6 offer so many quirks and features to JS, but as a developer you don’t need to use all of them and refactor the whole code base on the new feature because there is a chance that your code / app will break at some point.
- We must also consider how it will effect the customer
  - Did the customer browser support it?
  - If we need polyfills for unsupported browser how does it affect app performance?
  - Focus on the one that really add value and already has a lot of browser supports

## 5. Give an example of how you structure applications with design patterns using closure and modules

- I don’t really get this question . Closure is a language features, it has nothing to do with design patterns.
- With modules / class / OOP, we can use many popular design patterns like singleton, factory, façade, proxy, observer, etc.
- We also need to understand there is always a trade-off for this, because there is no patterns suit all.

## 6. What are your preferred ways of testing your web application?

- E2E testing using cypress and / or react testing library
- Unit testing with jest / vitetest

## 7. Which web server do you use? Why? Ex plain pros and cons of your choice.

- Nginx, pros:
  - Familiarity with it
  - Easy learning curve
  - Lightweight / low memory
- Cons:
  - Limited community support
  - Less list of modules

## 8. What is your preferred production deployment process?

- CI/CD pipeline using Docker

## 9. Give an example of clean README.md documentation

- Readme is very important since it will describe what your ‘product’ is and it is very much like ‘instruction’ about how to do / interact with your product.
- Simple readme will need to have
  - About ( version, features, what is this product aim to solve and what is not).
  - Detail step by step instruction s on how to use it ( installation, documentation)
  - FAQ on common problems or
  - Example is great if you have one
  - License
- Other consideration that good readme is
  - Table of content if you have massive readme (easier for user to navigate)
  - How it works / philosophy behind it
  - Screenshot / gif animation / demo project if this product about animation / ui
  - Size of the product
  - Compatibility, contributing, bugs found, etc
  - Roadmap (long term plan)
  - Community support
- Some example of best readme can be found here: [GitHub Awesome Readme](https://github.com/matiassingers/awesome-readme)
