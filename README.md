# My Movies

## Description

A small react native app that shows popular movies from TMDB. You can view movie details and add movies to watchlist and favorites list. 
_Note: As you access as a guest movies added to watchlist/favorites will not be synched with your TMDB account._

## Getting started

### Step 1: Clone application
```bash
git clone https://github.com/HannaKarlson/my-movies.git
```

### Step 2: Install dependencies

```bash
cd my-movies
npm install
```

### Step 3: Install Pods

This step is needed to run the application on ios devices

```bash
cd ios && pod install
```

### Step 4: Run project

Back in the root of the project

```bash
npx react-native run-android
```

or

```bash
npx react-native run-ios
```

## Further improvements

This project was written as a code challange with limited time available. In the future we could add state persistance, search functionallity, type check as well as graphical improvements such as icons and fonts.
