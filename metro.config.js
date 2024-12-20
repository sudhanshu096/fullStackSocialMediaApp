const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration for React Native with Reanimated
 * https://reactnative.dev/docs/metro
 * @type {import('metro-config').MetroConfig}
 */

// Step 1: Get the default Metro config
const defaultConfig = getDefaultConfig(__dirname);

// Step 2: Define your custom configuration options (if any)
const customConfig = {
  // Your custom Metro configuration options
  // Example:
  // transformer: {
  //   babelTransformerPath: require.resolve('react-native-svg-transformer'),
  // },
};

// Step 3: Merge the default config with custom options
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Step 4: Wrap with Reanimated Metro configuration
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);

