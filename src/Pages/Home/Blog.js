import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto'>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="mb-10 border-t border-b divide-y">
                    <div className="py-8">
                        <div className="">
                            <div className="mb-3">
                                <Link
                                    to="/"
                                    aria-label="Article"
                                    className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                                >
                                    <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                        What are the different ways to manage a state in a React application?
                                    </p>
                                </Link>
                            </div>
                            <p className="text-gray-700">
                                There are four main types of state you need to properly manage in your React apps:

                                Local (UI) state – Local state is data we manage in one or another component.

                                Local state is most often managed in React using the useState hook.

                                Global (UI) state – Global state is data we manage across multiple components.

                                Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.
                                Sometimes state we think should be local might become global.

                                Server state – Data that comes from an external server that must be integrated with our UI state.

                                Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.


                                URL state – Data that exists on our URLs, including the pathname and query parameters.

                                URL state is often missing as a category of state, but it is an important one.
                                In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!
                            </p>
                        </div>
                    </div>
                    <div className="py-8">
                        <div className="">
                            <div className="mb-3">
                                <Link
                                    to="/"
                                    aria-label="Article"
                                    className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                                >
                                    <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                        How does prototypical inheritance work?
                                    </p>
                                </Link>
                            </div>
                            <p className="text-gray-700">
                                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                            </p>
                        </div>
                    </div>
                    <div className="py-8">
                        <div className="">
                            <div className="mb-3">
                                <Link
                                    to="/"
                                    aria-label="Article"
                                    className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                                >
                                    <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                        What is a unit test? Why should we write unit tests?
                                    </p>
                                </Link>
                            </div>
                            <p className="text-gray-700">
                                What is meant by unit testing?
                                A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.. The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                            </p>
                        </div>
                    </div>
                    <div className="py-8">
                        <div className="">
                            <div className="mb-3">
                                <Link
                                    to="/"
                                    aria-label="Article"
                                    className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                                >
                                    <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                        Difference between React, Angular and Vue?
                                    </p>
                                </Link>
                            </div>
                            <p className="text-gray-700">
                                Both - Angular JS and React JS frameworks are used to create web interfaces for front end development. Angular is Google's matured and advanced JavaScript framework based on TypeScript, whereas Vue is a progressive open-source front-end JavaScript framework created by Evan You
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Blog;