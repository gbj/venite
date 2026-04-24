#!/bin/bash
# Post-install patches for @capacitor-firebase/authentication
# This plugin's web.js uses Firebase v9+ modular API, which is incompatible
# with our Firebase v8. Since we only use the plugin on native platforms
# (web auth uses Firebase v8 directly), we patch out the web registration
# and widen the CocoaPods FirebaseAuth version constraint.

PLUGIN_DIR="node_modules/@capacitor-firebase/authentication"

if [ -d "$PLUGIN_DIR" ]; then
  # 1. Widen FirebaseAuth pod version constraint (12.7.x -> 12.7+)
  sed -i '' "s/~> 12.7.0/~> 12.7/" "$PLUGIN_DIR/CapacitorFirebaseAuthentication.podspec" 2>/dev/null

  # 2. Remove web implementation registration to avoid Firebase v9 import errors
  sed -i '' "s|web: () => import('./web').then(m => new m.FirebaseAuthenticationWeb()),||" "$PLUGIN_DIR/dist/esm/index.js" 2>/dev/null
fi
