# install

# development

## ios

**run on device**

Use Command

`ionic capacitor run ios --livereload --external`

To enable livereload add to `capacitor.config.json`. See [more](https://capacitorjs.com/docs/guides/live-reload#using-with-framework-clis)

```json
{
  "server": {
    "url": "http://192.168.178.94:8100",
    "cleartext": true
  }
}
```

## update

**capacitor**

https://capacitorjs.com/docs/ios/updating

```sh
npm install @capacitor/ios@latest
npx cap sync ios
```

# debugging on iOS

`brew install ideviceinstaller ios-webkit-debug-proxy`
