// 1. Create an enum that would fit as argument for the given function:
enum AnimalType {
  Dog,
  Cat,
  Bird,
  Fish,
  Penguin,
}
function makeAnimalSound(type: AnimalType) {
  switch (type) {
    case 0:
      console.log("Woof!");
      break;
    case 1:
      console.log("Meow!");
      break;
    case 2:
      console.log("Chirp!");
      break;
    case 3:
      console.log("Blub!");
      break;
    default:
      console.log("Unknown animal type");
      break;
  }
}

// 2. Add a type that would cover the structure of the given object:

type Pet = {
  name: string;
  age: number;
  type: AnimalType;
};
function getPetDescription(pet: Pet) {
  const animal = AnimalType[pet.type];
  return `${pet.name} is a ${animal.toLowerCase()} that is ${
    pet.age
  } years old.`;
}

const myPet: Pet = {
  name: "Fluffy",
  age: 5,
  type: AnimalType.Cat,
};

console.log(getPetDescription(myPet));

// 3. Add an interface that would cover the structure of the given object(reuse the type from the previous task):

interface PetOwner {
  name: string;
  age: number;
  pets: Pet[];
}

function getPetOwnerDescription(owner: PetOwner) {
  const pets = owner.pets.map((pet) => {
    const animal = AnimalType[pet.type];
    return `${pet.name} the ${animal.toLowerCase()}`;
  });
  return `${owner.name} is ${owner.age} years old and has ${
    pets.length
  } pets: ${pets.join(", ")}.`;
}

const myPetOwner: PetOwner = {
  name: "John Doe",
  age: 30,
  pets: [
    {
      name: "Fluffy",
      age: 5,
      type: AnimalType.Cat,
    },
    {
      name: "Spot",
      age: 3,
      type: AnimalType.Dog,
    },
  ],
};

console.log(getPetOwnerDescription(myPetOwner));

// 4. Create a generic function that would make the following code compile:

const mapPetNames = <T extends Pet>(pets: T[]) => {
  return pets.map((pet) => pet.name);
};
const myPets = [
  { name: "Max", age: 3, type: AnimalType.Dog },
  { name: "Fluffy", age: 1, type: AnimalType.Cat },
  { name: "Tweety", age: 2, type: AnimalType.Bird },
];

const petNames = mapPetNames<Pet>(myPets);
console.log(petNames); // ['Max', 'Fluffy', 'Tweety']
/* ******************************************************************************************************************************** */

const printValue = <T>(arg: T) => {
  console.log(arg);
};

printValue("hello");
printValue(42);
printValue(true);
/* ******************************************************************************************************************************** */
function firstElement<T>(arr: T[]) {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers); // firstNumber is of type number

const strings = ["apple", "banana", "orange"];
const firstString = firstElement(strings); // firstString is of type string
/* ******************************************************************************************************************************** */

type Pair<F, S> = {
  first: F;
  second: S;
};
function outputPair<F, S>(pair: Pair<F, S>): void {
  console.log(pair.first, pair.second);
}
let pair1: Pair<string, number> = { first: "one", second: 1 };
let pair2: Pair<() => void, []> = { first: () => {}, second: [] };
let pair3: Pair<boolean, { x: number }> = { first: true, second: { x: 1 } };

outputPair(pair1);
outputPair(pair2);
outputPair(pair3);

function log(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  if (descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${String(propertyKey)} with arguments:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`Result:`, result);
      return result;
    };
  }
}

class MyClass {
  @log
  myMethod(arg1: number, arg2: number): number {
    return arg1 + arg2;
  }
}

const myObj = new MyClass();
myObj.myMethod(2, 3);

// Result:
// Calling myMethod with arguments: [2, 3]
// Result: 5

// 6. Create a mixin that will add the ability to play, pause, and stop a video, as well as to show its duration and current playback time.
/*
  -Create a TypeScript mixin named Playable that will add the functionality to a video class:
    -duration
    -currentTime
    -play()
    -pause()
    -stop()
    -getDuration()
    -getCurrentTime()
  -Create instances of each video class and test their Playable functionality by calling the methods and displaying their properties.
  */

type Constructor<T = {}> = new (...args: any[]) => T;

function Playable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    private _duration: number = 20000;
    private _currentTime: number = 0;
    private _isPlaying: boolean = false;
    private _intervalId: number | null = null;

    get duration() {
      return this._duration;
    }

    get currentTime() {
      return this._currentTime;
    }

    play() {
      if (this._isPlaying) return;
      this._isPlaying = true;
      this._intervalId = setInterval(() => {
        if (this._currentTime < this._duration) {
          this._currentTime++;
          console.log("duration", this.currentTime);
        } else {
          this.stop();
        }
      }, 1000);
    }

    pause() {
      if (this._isPlaying) {
        this._isPlaying = false;
        if (this._intervalId !== null) {
          clearInterval(this._intervalId);
          this._intervalId = null;
        }
        console.log("duration", this.currentTime);
      }
    }

    stop() {
      if (this._intervalId !== null) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
      this._isPlaying = false;
      this._currentTime = 0;
      console.log("duration", this.currentTime);
    }
  };
}

class RegularVideo {
  title: string;
  url: string;
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

class PremiumVideo {
  title: string;
  url: string;
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

class LiveVideo {
  title: string;
  url: string;
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

const PlayableRegularVideo = Playable(RegularVideo);
const PlayablePremiumVideo = Playable(PremiumVideo);
const PlayableLiveVideo = Playable(LiveVideo);

const regularVideo = new PlayableRegularVideo("Regular Video", "test-url");
regularVideo.play();

setTimeout(() => regularVideo.pause(), 5000);

setTimeout(() => regularVideo.play(), 7000);

setTimeout(() => regularVideo.stop(), 15000);

// 7. Apply typescript utility types to the given type:
/*
    -Create a new type from the given one
        -where all the properties are optional
        -where all the properties are required
        -where all the properties are readonly
        -with only properties specified: name, age, isStudent, hobbies
        -with the specified properties omited: job, phoneNumbers, birthday
        -union type where values are given type's keys
    -
  */
type MyType = {
  name: string;
  age: number;
  isStudent: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  email?: string;
  job?: {
    title: string;
    company: string;
    salary: number;
  };
  phoneNumbers: Map<string, string>;
  birthday: Date;
};

type OptionalType = Partial<MyType>;
type RequiredType = Required<MyType>;
type ReadOnlyType = Readonly<MyType>;
type SelectedPropertiesType = Pick<
  MyType,
  "name" | "age" | "isStudent" | "hobbies"
>;
type OmittedPropertiesType = Omit<MyType, "job" | "phoneNumbers" | "birthday">;
type KeysOfMyType = keyof MyType;
