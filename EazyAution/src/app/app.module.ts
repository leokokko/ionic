// Project Name: IonicEcommerce
// Project URI: http://eazyactions.com
// Author: HAPG Team
// Author URI: http://honestappguys.com/
// Version: 1.0

if (localStorage.langId == undefined) {
  localStorage.langId = '1';
}
if (localStorage.direction == undefined) {
  localStorage.direction = 'ltr';
}

import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IonicStepperModule } from 'ionic-stepper'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { createTranslateLoader } from '../providers/translate/translate';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { CardIO } from '@ionic-native/card-io';
import { StarRatingModule } from 'ionic3-star-rating';
import { LanguagePage } from '../pages/language/language';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { LoadingProvider } from '../providers/loading/loading';
import { SharedDataProvider } from '../providers/shared-data/shared-data';

import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

import { BannersComponent } from '../components/banners/banners';
import { ProductComponent } from '../components/product/product';
import { FooterComponent } from '../components/footer/footer';
import { ComponentsModule } from '../components/components.module';
import { SlidingTabsComponent } from '../components/sliding-tabs/sliding-tabs';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { HeaderComponent } from '../components/header/header';
import { CartPage } from '../pages/cart/cart';
import { CurencyPipe } from '../pipes/curency/curency';
import { Toast } from '@ionic-native/toast';
import { SearchPage } from '../pages/search/search';
import { AlertProvider } from '../providers/alert/alert';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductsPage } from '../pages/products/products';
import { WishListPage } from '../pages/wish-list/wish-list';
import { ShippingAddressPage } from '../pages/shipping-address/shipping-address';
import { SelectCountryPage } from '../pages/select-country/select-country';
import { SelectZonesPage } from '../pages/select-zones/select-zones';
import { BillingAddressPage } from '../pages/billing-address/billing-address';
import { ShippingMethodPage } from '../pages/shipping-method/shipping-method';
import { OrderPage } from '../pages/order/order';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { Stripe } from '@ionic-native/stripe';
import { CouponProvider } from '../providers/coupon/coupon';
import { PayPal } from '@ionic-native/paypal';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyShippingAddressesPage } from '../pages/my-shipping-addresses/my-shipping-addresses';
import { EditShippingAddressPage } from '../pages/edit-shipping-address/edit-shipping-address';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { NewsPage } from '../pages/news/news';
import { SettingsPage } from '../pages/settings/settings';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NewsListPage } from '../pages/news-list/news-list';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Categories2Page } from '../pages/categories2/categories2';
import { SubCategoriesPage } from '../pages/sub-categories/sub-categories';
import { Home5Page } from '../pages/home5/home5';
import { Home4Page } from '../pages/home4/home4';
import { Home3Page } from '../pages/home3/home3';
import { Home2Page } from '../pages/home2/home2';
import { Categories3Page } from '../pages/categories3/categories3';
import { Categories4Page } from '../pages/categories4/categories4';
import { Categories5Page } from '../pages/categories5/categories5';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermServicesPage } from '../pages/term-services/term-services';
import { RefundPolicyPage } from '../pages/refund-policy/refund-policy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Network } from '@ionic-native/network';
import { SubCategories2Page } from '../pages/sub-categories2/sub-categories2';
import { SubCategories3Page } from '../pages/sub-categories3/sub-categories3';
import { SubCategories4Page } from '../pages/sub-categories4/sub-categories4';
import { SubCategories5Page } from '../pages/sub-categories5/sub-categories5';
import { Categories6Page } from '../pages/categories6/categories6';
import { SubCategories6Page } from '../pages/sub-categories6/sub-categories6';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdMobFree} from '@ionic-native/admob-free';
import { FCM } from '@ionic-native/fcm';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Timer } from '../components/countdown-timer/timer';
import { MessageListPage } from '../pages/message-list/message-list';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { ChatServiceProvider } from '../providers/chat/chat-service';
import { AddListingPage } from '../pages/add-listing/add-listing';
import { AddFlawComponent } from '../components/add-flaw/add-flaw';
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
import { AddReviewPage } from '../pages/add-review/add-review';
import { BoxedProtectionPage } from '../pages/boxed-protection/boxed-protection';
import { TrackNowPage } from '../pages/track-now/track-now';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { ReturnsPage } from '../pages/returns/returns';
import { EazyReturnsPage } from '../pages/eazyreturns/eazyreturns';
import { SellerReturnsPage } from '../pages/seller-returns/seller-returns';
import { OfferRefundPage } from '../pages/offer-refund/offer-refund';
import { ItemDetailsPage } from '../pages/item-details/item-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    CartPage,
    Home2Page,
    Home3Page,
    Home4Page,
    Home5Page,
    SearchPage,
    CategoriesPage,
    Categories2Page,
    Categories3Page,
    Categories4Page,
    Categories5Page,
    Categories6Page,
    IntroPage,
    SubCategoriesPage,
    SubCategories2Page,
    SubCategories3Page,
    SubCategories4Page,
    SubCategories5Page,
    SubCategories6Page,
    ProductsPage,
    LanguagePage,
    ContactUsPage,
    AboutUsPage,
    IntroPage,
    LoginPage,
    SignUpPage,
    WishListPage,
    ShippingAddressPage,
    ForgotPasswordPage,
    HeaderComponent,
    BannersComponent,
    SelectZonesPage,
    MyShippingAddressesPage,
    BillingAddressPage,
    SelectCountryPage,
    MyAccountPage,
    ProductComponent,
    FooterComponent,
    SlidingTabsComponent,
    ProductDetailPage,
    CurencyPipe,
    ShippingMethodPage,
    ThankYouPage,
    OrderPage,
    OrderDetailPage,
    MyOrdersPage,
    PrivacyPolicyPage,
    RefundPolicyPage,
    TermServicesPage,
    EditShippingAddressPage,
    NewsPage,
    NewsDetailPage,
    NewsListPage,
    SettingsPage,
    Timer,
    MessageListPage,
    ChatRoomPage,
    AddListingPage,
    AddFlawComponent,
    BuyerHomePage,
    SellerHomePage,
    FollowersPage,
    CreditCardScanPage,
    SoldListingsPage,
    LiveListingsPage,
    DraftsPage, 
    OffersPage,
    ShippingPage,
    InactivePage,
    InvestigationsPage,
    ReviewsPage,
    AddReviewPage,
    BoxedProtectionPage,
    TrackNowPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    ReturnsPage,
    EazyReturnsPage,
    SellerReturnsPage,
    OfferRefundPage,
    ItemDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'md',
      mode:'md',
    }),
    IonicStepperModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    LazyLoadImageModule,
    StarRatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Home2Page,
    Home3Page,
    Home4Page,
    Home5Page,
    SearchPage,
    CategoriesPage,
    Categories2Page,
    Categories3Page,
    Categories4Page,
    Categories5Page,
    Categories6Page,
    SubCategoriesPage,
    SubCategories2Page,
    SubCategories3Page,
    SubCategories4Page,
    SubCategories5Page,
    SubCategories6Page,
    IntroPage,
    PrivacyPolicyPage,
    RefundPolicyPage,
    TermServicesPage,
    LanguagePage,
    ProductsPage,
    ContactUsPage,
    AboutUsPage,
    IntroPage,
    WishListPage,
    ShippingAddressPage,
    CartPage,
    LoginPage,
    SignUpPage,
    BillingAddressPage,
    MyShippingAddressesPage,
    SelectCountryPage,
    SelectZonesPage,
    MyAccountPage,
    ForgotPasswordPage,
    HeaderComponent,
    BannersComponent,
    ProductComponent,
    FooterComponent,
    SlidingTabsComponent,
    ProductDetailPage,
    ShippingMethodPage,
    OrderPage,
    MyOrdersPage,
    OrderDetailPage,
    ThankYouPage,
    EditShippingAddressPage,
    NewsPage,
    NewsDetailPage,
    NewsListPage,
    SettingsPage,
    Timer,
    MessageListPage,
    ChatRoomPage,
    AddListingPage,
    AddFlawComponent,
    BuyerHomePage,
    SellerHomePage,
    FollowersPage,
    CreditCardScanPage,
    SoldListingsPage,
    LiveListingsPage,
    DraftsPage, 
    OffersPage,
    ShippingPage,
    InactivePage,
    InvestigationsPage,
    ReviewsPage,
    AddReviewPage,
    BoxedProtectionPage,
    TrackNowPage,
    ReturnsPage,
    EazyReturnsPage,
    SellerReturnsPage,
    OfferRefundPage,
    ItemDetailsPage
  ],
  providers: [
    HTTP,
    ConfigProvider,
    StatusBar,
    SplashScreen,
    SocialSharing,
    Toast,
    ConfigProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    SharedDataProvider,
    ChatServiceProvider,
    Camera,
    Stripe,
    AlertProvider,
    CouponProvider,
    PayPal,
    Push,
    Device,
    Facebook,
    GooglePlus,
    LocalNotifications,
    InAppBrowser,
    Network,
    AdMobFree,
    FCM,
    AppVersion,
    OneSignal,
    Md5,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthProvider,
      multi: true
    }
  ]
})
export class AppModule { }
