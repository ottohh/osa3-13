module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      "node_modules/(?!(react-native"
        +"|axios"
        + "|react-native-splash-screen"
        + "|react-native-screens"
        + "|react-native-reanimated"
      + ")/)",
    ],
    testTimeout:10
  }