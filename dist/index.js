"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// 1. Create an enum that would fit as argument for the given function:
var AnimalType;
(function (AnimalType) {
    AnimalType[AnimalType["Dog"] = 0] = "Dog";
    AnimalType[AnimalType["Cat"] = 1] = "Cat";
    AnimalType[AnimalType["Bird"] = 2] = "Bird";
    AnimalType[AnimalType["Fish"] = 3] = "Fish";
    AnimalType[AnimalType["Penguin"] = 4] = "Penguin";
})(AnimalType || (AnimalType = {}));
function makeAnimalSound(type) {
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
function getPetDescription(pet) {
    var animal = AnimalType[pet.type];
    return "".concat(pet.name, " is a ").concat(animal.toLowerCase(), " that is ").concat(pet.age, " years old.");
}
var myPet = {
    name: "Fluffy",
    age: 5,
    type: AnimalType.Cat,
};
console.log(getPetDescription(myPet));
function getPetOwnerDescription(owner) {
    var pets = owner.pets.map(function (pet) {
        var animal = AnimalType[pet.type];
        return "".concat(pet.name, " the ").concat(animal.toLowerCase());
    });
    return "".concat(owner.name, " is ").concat(owner.age, " years old and has ").concat(pets.length, " pets: ").concat(pets.join(", "), ".");
}
var myPetOwner = {
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
var mapPetNames = function (pets) {
    return pets.map(function (pet) { return pet.name; });
};
var myPets = [
    { name: "Max", age: 3, type: AnimalType.Dog },
    { name: "Fluffy", age: 1, type: AnimalType.Cat },
    { name: "Tweety", age: 2, type: AnimalType.Bird },
];
var petNames = mapPetNames(myPets);
console.log(petNames); // ['Max', 'Fluffy', 'Tweety']
/* ******************************************************************************************************************************** */
var printValue = function (arg) {
    console.log(arg);
};
printValue("hello");
printValue(42);
printValue(true);
/* ******************************************************************************************************************************** */
function firstElement(arr) {
    return arr[0];
}
var numbers = [1, 2, 3, 4, 5];
var firstNumber = firstElement(numbers); // firstNumber is of type number
var strings = ["apple", "banana", "orange"];
var firstString = firstElement(strings); // firstString is of type string
function outputPair(pair) {
    console.log(pair.first, pair.second);
}
var pair1 = { first: "one", second: 1 };
var pair2 = { first: function () { }, second: [] };
var pair3 = { first: true, second: { x: 1 } };
outputPair(pair1);
outputPair(pair2);
outputPair(pair3);
function log(target, propertyKey, descriptor) {
    if (descriptor) {
        var originalMethod_1 = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("Calling ".concat(String(propertyKey), " with arguments:"), args);
            var result = originalMethod_1.apply(this, args);
            console.log("Result:", result);
            return result;
        };
    }
}
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function (arg1, arg2) {
        return arg1 + arg2;
    };
    __decorate([
        log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", Number)
    ], MyClass.prototype, "myMethod", null);
    return MyClass;
}());
var myObj = new MyClass();
myObj.myMethod(2, 3);
function Playable(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._duration = 20000;
            _this._currentTime = 0;
            _this._isPlaying = false;
            _this._intervalId = null;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "currentTime", {
            get: function () {
                return this._currentTime;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.play = function () {
            var _this = this;
            if (this._isPlaying)
                return;
            this._isPlaying = true;
            this._intervalId = setInterval(function () {
                if (_this._currentTime < _this._duration) {
                    _this._currentTime++;
                    console.log("duration", _this.currentTime);
                }
                else {
                    _this.stop();
                }
            }, 1000);
        };
        class_1.prototype.pause = function () {
            if (this._isPlaying) {
                this._isPlaying = false;
                if (this._intervalId !== null) {
                    clearInterval(this._intervalId);
                    this._intervalId = null;
                }
                console.log("duration", this.currentTime);
            }
        };
        class_1.prototype.stop = function () {
            if (this._intervalId !== null) {
                clearInterval(this._intervalId);
                this._intervalId = null;
            }
            this._isPlaying = false;
            this._currentTime = 0;
            console.log("duration", this.currentTime);
        };
        return class_1;
    }(Base));
}
var RegularVideo = /** @class */ (function () {
    function RegularVideo(title, url) {
        this.title = title;
        this.url = url;
    }
    return RegularVideo;
}());
var PremiumVideo = /** @class */ (function () {
    function PremiumVideo(title, url) {
        this.title = title;
        this.url = url;
    }
    return PremiumVideo;
}());
var LiveVideo = /** @class */ (function () {
    function LiveVideo(title, url) {
        this.title = title;
        this.url = url;
    }
    return LiveVideo;
}());
var PlayableRegularVideo = Playable(RegularVideo);
var PlayablePremiumVideo = Playable(PremiumVideo);
var PlayableLiveVideo = Playable(LiveVideo);
var regularVideo = new PlayableRegularVideo("Regular Video", "test-url");
regularVideo.play();
setTimeout(function () { return regularVideo.pause(); }, 5000);
setTimeout(function () { return regularVideo.play(); }, 7000);
setTimeout(function () { return regularVideo.stop(); }, 15000);
