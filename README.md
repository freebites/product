# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

# Getting Started:

## Running it!

Run `npm install` or `npx expo install` to install all dependencies if you're not done yet.

Open a terminal and run `npm run server` to start the back end.

Open a new terminal and run `npx expo start` to start the app. Then scan the QR code on your Phone, or hit 'a' for android emulator or 'i' for iOS emulator.

Common issues include not being able to connect to the network -- then make sure your ipv4 address is correct in .env.local (don't have a period at the end). We're currently trying to figure out how to set it automatically but it'll take a bit

### Running Dev Client (EAS Build)

Assuming you've run through the EAS build setup steps (if not then ask one of the tech leads), you should be able to just open the .apk or the app after npx expo start (TBD). To set up an EAS build, follow [this video](https://www.youtube.com/watch?v=LUFHXsBcW6w), or if you prefer a tutorial in text, follow [this link](https://docs.expo.dev/develop/development-builds/create-a-build/). By the time most devs see this, the EAS build should be configured, but if it isn't working, try [this link](https://docs.expo.dev/build/setup/) to configure for EAS build first, and then follow the first link.

## Extensions for Devs:

We have a couple of extensions that make it easier, but also we're going to start enforcing these packages:

- ESLint
- Prettier

Also ES7+ for snippets and autocomplete is good too!
