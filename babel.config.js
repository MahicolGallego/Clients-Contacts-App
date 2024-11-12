module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: [
          'API_KEY_GOOGLE_MAPS',
          'API_OPENWEATHERMAPS_BASE_URL',
          'API_KEY_OPENWEATHERMAPS',
        ], // DEPRECATED
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
  ],
};
