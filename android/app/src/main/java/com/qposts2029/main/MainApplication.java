package com.qposts2029.main;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;

import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNFirebasePackage(),
            new ReactNativeOneSignalPackage(),
            new AsyncStoragePackage(),
            new NetInfoPackage(),
            new RNCWebViewPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new LottiePackage(),
            new RNSharePackage(),
            new RNFirebaseAnalyticsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance(); 
    sharedI18nUtilInstance.forceRTL(this, true); 
    sharedI18nUtilInstance.allowRTL(this, true); 

    SoLoader.init(this, /* native exopackage */ false);
  }
}
