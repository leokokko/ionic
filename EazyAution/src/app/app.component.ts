// Project Name: IonicEcommerce
// Project URI: http://eazyactions.com
// Author: HAPG Team
// Author URI: http://honestappguys.com/

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic3-star-rating';
import { HomePage } from '../pages/home/home';
import { LanguagePage } from '../pages/language/language';
import { IntroPage } from '../pages/intro/intro';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutUsPage } from '../pages/about-us/about-us';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/config/config';
import { SharedDataProvider } from '../providers/shared-data/shared-data';
import { CategoriesPage } from '../pages/categories/categories';
import { WishListPage } from '../pages/wish-list/wish-list';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { MyShippingAddressesPage } from '../pages/my-shipping-addresses/my-shipping-addresses';
import { NewsPage } from '../pages/news/news';
import { ProductsPage } from '../pages/products/products';
import { SettingsPage } from '../pages/settings/settings';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { Home2Page } from '../pages/home2/home2';
import { Home3Page } from '../pages/home3/home3';
import { Home4Page } from '../pages/home4/home4';
import { Home5Page } from '../pages/home5/home5';
import { Categories2Page } from '../pages/categories2/categories2';
import { Categories4Page } from '../pages/categories4/categories4';
import { Categories5Page } from '../pages/categories5/categories5';
import { Categories3Page } from '../pages/categories3/categories3';
import { Categories6Page } from '../pages/categories6/categories6';
import { trigger, transition, animate, style } from '@angular/animations';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import { MessageListPage } from '../pages/message-list/message-list';
import { AddListingPage } from '../pages/add-listing/add-listing';
import { BuyerHomePage } from '../pages/buyer-home/buyer-home';
import { SellerHomePage } from '../pages/seller-home/seller-home';
import { FollowersPage } from '../pages/followers/followers';
import { CreditCardScanPage } from '../pages/credit-card-scan/credit-card-scan';
import { SoldListingsPage } from '../pages/sold-listings/sold-listings';
import { LiveListingsPage } from '../pages/live-listings/live-listings';
import { DraftsPage } from '../pages/drafts/drafts';
import { OffersPage } from '../pages/offers/offers';
import { ShippingPage } from '../pages/shipping/shipping';
import { InactivePage } from '../pages/inactive/inactive';
import { InvestigationsPage } from '../pages/investigations/investigations';
import { ReviewsPage } from '../pages/reviews/reviews';
import { ReturnsPage } from '../pages/returns/returns';
import { AddReviewPage } from '../pages/add-review/add-review';
import { BoxedProtectionPage } from '../pages/boxed-protection/boxed-protection';
import { TrackNowPage } from '../pages/track-now/track-now';
import { EazyReturnsPage } from '../pages/eazyreturns/eazyreturns';
import { SellerReturnsPage } from '../pages/seller-returns/seller-returns';
import { OfferRefundPage } from '../pages/offer-refund/offer-refund';
import { ItemDetailsPage } from '../pages/item-details/item-details';

@Component({
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  homeList = true;
  homeListIcon = 'add';
  categoriesList = true;
  categoriesListIcon = 'add';
  shopList = true;
  shopListIcon = 'add';
  public counter = 0;

  constructor(
    public platform: Platform,
    public modalCtrl: ModalController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public storage: Storage,
    public shared: SharedDataProvider,
    public http: Http,
    public config: ConfigProvider,
    public network: Network,
    public alert: AlertProvider,
    public loading: LoadingProvider,
    private admobFree: AdMobFree,
    public events: Events,
    public plt: Platform,
    private appVersion: AppVersion,
    public iab: InAppBrowser,
    private socialSharing: SocialSharing,
  ) {


    this.platform.ready().then(() => {

      this.statusBar.styleDefault();

      this.doubleTapToExit();
    });
    let connectedToInternet = true;
    network.onDisconnect().subscribe(() => {
      connectedToInternet = false;
      translate.get(["Please Connect to the Internet", "Disconnected"]).subscribe((res) => {
        this.alert.showWithTitle(res["Please Connect to the Internet"], res["Disconnected"]);
      });
      //  console.log('network was disconnected :-(');

    });

    network.onConnect().subscribe(() => {
      if (!connectedToInternet) {
        window.location.reload();
        //this.loading.show();
        //console.log('network connected!');
        translate.get(["Network connected Reloading Data", "Connected"]).subscribe((res) => {
          this.alert.showWithTitle(res["Network connected Reloading Data"] + '...', res["Connected"]);
        });

      }
      //connectSubscription.unsubscribe();
    });
    this.platform.setDir(localStorage.direction, true);
    shared.dir = localStorage.direction;
    //setting default languge on start up 
    translate.setDefaultLang(this.config.url + "applabels3?lang=" + this.config.langId);
    if(this.config.siteSetting()){
    this.initializeApp();
    }
    events.subscribe('showAd', () => {
      this.showInterstitial();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.config.siteSetting().then((value) => {
        this.storage.get('firsttimeApp').then((val) => {
          let value = val;
          if (this.config.showIntroPage == 0) value = 'firstTime';

          if (value == 'firstTime') {
            if (this.config.homePage == 1) { this.rootPage = HomePage; }
            if (this.config.homePage == 2) { this.rootPage = Home2Page; }
            if (this.config.homePage == 3) { this.rootPage = Home3Page; }
            if (this.config.homePage == 4) { this.rootPage = Home4Page; }
            if (this.config.homePage == 5) { this.rootPage = Home5Page; }
            setTimeout(() => {
              this.splashScreen.hide();
            }, 700);
          }
          else {
            this.nav.push(IntroPage);
          }
          this.storage.set('firsttimeApp', 'firstTime');
        });
        if (this.plt.is('ios')) {
          if (this.config.admobIos == 1) this.initializeAdmob(this.config.admobBanneridIos, this.config.admobIntidIos);
          this.config.admob = this.config.admobIos;
        } else if (this.plt.is('android')) {
          if (this.config.admob == 1) this.initializeAdmob(this.config.admobBannerid, this.config.admobIntid);
        }
        //subscribe for push notifiation
        this.storage.get('pushNotification').then((val) => {
          if (val == undefined) {
            this.shared.subscribePush();
            this.storage.set('pushNotification', "loaded");
          }
        });
      });

      this.statusBar.styleLightContent();

    });
  }
  doubleTapToExit() {
    this.platform.registerBackButtonAction(() => {
      if (this.shared.currentOpenedModel != null) {
        this.shared.currentOpenedModel.dismiss();
        this.shared.currentOpenedModel = null;
      }
      else {
        let navig = this.nav;
        if (navig.canGoBack()) {
          navig.pop();
        }
        else {
          if (this.counter == 0) {
            this.counter++;
            this.shared.toast("Press Back to Exit");
            setTimeout(() => { this.counter = 0 }, 2500)
          } else {
            // console.log("exitapp");
            this.platform.exitApp();
          }
        }
      }
    }, 0)

  }
  initializeAdmob(bannerId, intId) {
    if (this.platform.is('cordova')) {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: bannerId,
        isTesting: false,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
        })
        .catch(e => console.log(e));

      const interstitialConfig: AdMobFreeInterstitialConfig = {
        id: intId,
        isTesting: false,
        autoShow: true
      };
      this.admobFree.interstitial.config(interstitialConfig);
      this.admobFree.interstitial.prepare();
    }
  }

  showInterstitial() {
    if (this.platform.is('cordova')) {
      this.admobFree.interstitial.isReady().then(() => {
        this.admobFree.interstitial.show();
      });
      this.admobFree.interstitial.prepare();
    }
  }
  openPage(page) {
    if (page == 'home') this.openHomePage();
    else if (page == 'home1') this.nav.setRoot(HomePage);
    else if (page == 'home2') this.nav.setRoot(Home2Page);
    else if (page == 'home3') this.nav.setRoot(Home3Page);
    else if (page == 'home4') this.nav.setRoot(Home4Page);
    else if (page == 'home5') this.nav.setRoot(Home5Page);
    else if (page == 'categories') this.openCategoryPage();
    else if (page == 'categories1') this.nav.setRoot(CategoriesPage);
    else if (page == 'categories2') this.nav.setRoot(Categories2Page);
    else if (page == 'categories3') this.nav.setRoot(Categories3Page);
    else if (page == 'categories4') this.nav.setRoot(Categories4Page);
    else if (page == 'categories5') this.nav.setRoot(Categories5Page);
    else if (page == 'categories6') this.nav.setRoot(Categories6Page);
    else if (page == 'products') this.nav.setRoot(ProductsPage);
    else if (page == 'myWishList') this.nav.setRoot(WishListPage);
    else if (page == 'myShippingAddresses') this.nav.setRoot(MyShippingAddressesPage);
    else if (page == 'myAccount') this.nav.setRoot(MyAccountPage);
    else if (page == 'myOrders') this.nav.setRoot(MyOrdersPage);
    else if (page == 'contactUs') this.nav.setRoot(ContactUsPage);
    else if (page == 'aboutUs') this.nav.setRoot(AboutUsPage);
    else if (page == 'news') this.nav.setRoot(NewsPage);
    else if (page == 'intro') this.nav.setRoot(IntroPage);
    else if (page == 'settings') this.nav.setRoot(SettingsPage);
    else if (page == 'newest') this.nav.push(ProductsPage, { sortOrder: 'newest' });
    else if (page == 'topSeller') this.nav.push(ProductsPage, { sortOrder: 'top seller' });
    else if (page == 'deals') this.nav.push(ProductsPage, { sortOrder: 'special' });
    else if (page == 'mostLiked') this.nav.push(ProductsPage, { sortOrder: 'most liked' });
    else if (page == 'messages') this.nav.push(MessageListPage);
    else if (page == 'newlist') this.nav.push(AddListingPage);
    else if (page == 'buyerHome') this.nav.push(BuyerHomePage);
    else if (page == 'sellerHome') this.nav.push(SellerHomePage);
    else if (page == 'followers') this.nav.push(FollowersPage);
    else if (page == 'creditCardScan') this.nav.push(CreditCardScanPage);
    else if (page == 'soldListings') this.nav.push(SoldListingsPage);
    else if (page == 'liveListings') this.nav.push(LiveListingsPage);
    else if (page == 'drafts') this.nav.push(DraftsPage);
    else if (page == 'offers') this.nav.push(OffersPage);
    else if (page == 'shipping') this.nav.push(ShippingPage);
    else if (page == 'inactive') this.nav.push(InactivePage);
    else if (page == 'investigations') this.nav.push(InvestigationsPage);
    else if (page == 'reviews') this.nav.push(ReviewsPage);
    else if (page == 'addreview') this.nav.push(AddReviewPage);
    else if (page == 'boxedprotection') this.nav.push(BoxedProtectionPage);
    else if (page == 'tracknow') this.nav.push(TrackNowPage);
    else if (page == 'returns') this.nav.push(ReturnsPage);
    else if (page == 'eazyreturns') this.nav.push(EazyReturnsPage);
    else if (page == 'sellerreturns') this.nav.push(SellerReturnsPage);
    else if (page == 'offerrefund') this.nav.push(OfferRefundPage);
    else if (page == 'itemdetails') this.nav.push(ItemDetailsPage);
  }
  openHomePage() {
    if (this.config.homePage == 1) { this.nav.setRoot(HomePage); }
    if (this.config.homePage == 2) { this.nav.setRoot(Home2Page); }
    if (this.config.homePage == 3) { this.nav.setRoot(Home3Page); }
    if (this.config.homePage == 4) { this.nav.setRoot(Home4Page); }
    if (this.config.homePage == 5) { this.nav.setRoot(Home5Page); }
  }
  openCategoryPage() {
    if (this.config.categoryPage == 1) { this.nav.setRoot(CategoriesPage); }
    if (this.config.categoryPage == 2) { this.nav.setRoot(Categories2Page); }
    if (this.config.categoryPage == 3) { this.nav.setRoot(Categories3Page); }
    if (this.config.categoryPage == 4) { this.nav.setRoot(Categories4Page); }
    if (this.config.categoryPage == 5) { this.nav.setRoot(Categories5Page); }
    if (this.config.categoryPage == 6) { this.nav.setRoot(Categories6Page); }
  }

  openLanguagePage() {
    let modal = this.modalCtrl.create(LanguagePage);
    modal.present();
  }

  openLoginPage() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
  openSignUpPage() {
    let modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  }
  logOut() {
    this.shared.logOut();
  }
  showHideHomeList() {
    if (this.homeList == false) { this.homeList = true; this.homeListIcon = 'remove'; }
    else { this.homeList = false; this.homeListIcon = 'add'; }
  }
  showHideCategoriesList() {
    if (this.categoriesList == false) { this.categoriesList = true; this.categoriesListIcon = 'remove'; }
    else { this.categoriesList = false; this.categoriesListIcon = 'add'; }
  }
  showHideShopList() {
    if (this.shopList == false) { this.shopList = true; this.shopListIcon = 'remove'; }
    else { this.shopList = false; this.shopListIcon = 'add'; }
  }
  ionViewWillEnter() {

    console.log("ionViewCanEnter");
  }
  rateUs() {
    this.loading.autoHide(2000);
    if (this.plt.is('ios')) {
      this.iab.create(this.config.packgeName.toString(), "_system");
    } else if (this.plt.is('android')) {
      this.appVersion.getPackageName().then((val) => {
        this.iab.create("https://play.google.com/store/apps/details?id=" + val, "_system");
      });
    }
  }

  share() {
    this.loading.autoHide(2000);
    if (this.plt.is('ios')) {
      this.socialSharing.share(
        "Nice Application",
        this.config.appName,
        "assets/logo_header.png",
        this.config.packgeName.toString()
      ).then(() => {
      }).catch(() => {

      });
    } else if (this.plt.is('android')) {

      this.appVersion.getPackageName().then((val) => {
        this.socialSharing.share(
          "Nice Application",
          this.config.appName,
          "assets/logo_header.png",
          "https://play.google.com/store/apps/details?id=" + val
        ).then(() => {

        }).catch(() => {
        });
      });
    }
  }
}
