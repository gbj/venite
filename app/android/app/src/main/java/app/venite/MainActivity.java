package app.venite;

import android.os.Bundle;

import com.baumblatt.capacitor.firebase.auth.CapacitorFirebaseAuth;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import com.getcapacitor.community.tts.TextToSpeech;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(FirebaseAnalytics.class);
      add(CapacitorFirebaseAuth.class);
      add(TextToSpeech.class);
    }});
  }
}
