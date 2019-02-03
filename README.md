# karma-safarinative-launcher
Karma Safari launcher that uses mac Launch services<br/>
With Safari 12, the browser cannot load html files from disk without user permissions.

This launcher uses the MAC Launch services API to open karma url in Safari browser.

## Usage
```javascript
module.exports = function(config) {
  config.set({
    plugins: ['karma-safarinative-launcher'],
    // start these browsers
    browsers: ['SafariNative'],
  })
}
```
