# Get started

## Server

1. Setup the .env file (I was using `.env.local`)

2. Install the dependencies

```
yarn
```

3. Start expo the server

```
yarn start
```

# About the app

## Techs and tools

### Expo Secure Store

Similar to Async Storage, provides a way to persist sensible content locally in the device which can be accessed later by the app. In this app, this was used to store credentials.

### Redux

This is the main tool for app's state management. Although it's boilerplate can look big, after it's all setup it gets easy to scale the app state data. Also MobX could be useful for this project, but has less tooling than the first one, so when using it, you must be aware that you may need to build behaviors and patterns on your own.

### Axios

Main library to make HTTP requests, there are also two very useful feature that are interceptors for both requests and responses. Those for example were used to provide the token for signed in users, and also, handle logout on app which is handled by an observer as seen on repo.

### Reactotron

Great tool to inspect all the requests coming from the app. Easy to install, easy to use and provides essential information about the requests.

## Future improvements

### Routing

I still don't have much ground with expo based apps, I feel safer dealing with bare React Native projects which I know that there are less things under the hood that I should be aware of (like routing). I had some issues on the beggining of development with routing on expo that probably I wouldn't have on CRNA based apps.

### Design System

In this project the styles could be largely improved by providing a design system, personally I use styled-components for that, all components would be linked to theme variables, later on if the theme changes, no component would need to be updated, it would be just a matter of changing the variables values and the app would react accordingly.

### Tests

Tests are expensive, but as the apps starts growing, we will also start to understand their importance... This was out of my focus, and I would be using vitest by it's great performance and good integration with Typescript and detox for e2e tests.

######################################################################

# Machine Health App (React Native Expo)

Welcome to the Machine Health App, a React Native Expo project designed to evaluate the health of various machines in an automobile factory. This README will guide you on setting up and running the app, as well as understanding its structure.

## Getting Started

To get started with the app, follow these steps:

### Prerequisites

Before you begin, make sure you have the following software installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (package manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running Expo projects)

### Installation

```bash
yarn
```

### Running the App

To run the app, use the following command:

```bash
yarn start
```

This will launch the Expo development server, and you can access the app on your device using the Expo Go app or an emulator. You can hit `i` or `a` on the keyboard to launch the ios or android app respectively.

## Project Structure

The project structure is organized as follows:

- `App.tsx`: The entry point of the Expo app, where the navigation is configured.
- `components/`: Contains reusable components used throughout the app.
- `app/`: Contains individual screens or pages/tabs of the app.
- `data/`: Stores JSON files with machine and part data for evaluation.

## Screens and Features

The app has the following screens and features:

- **Machine Health**: Allows users to select a machine, part name, and part value, and calculates the health score of the machine.

## Adding Tests

You are free to choose how you'd like to test this repo, think about options and approaches and build out (and document!) what you think would be an appropriate testing infrastructure. Hint: think about a combo of unit tests and integration tests, there is an android APK in the root of the exercise if it's helpful.

## Customization

If you would like, feel free to modify the app as needed.
