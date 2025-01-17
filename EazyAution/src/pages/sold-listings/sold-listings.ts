import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Content, ActionSheetController, Slides } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { CartPage } from '../cart/cart';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the SoldListingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sold-listings',
  templateUrl: 'sold-listings.html',
})
export class SoldListingsPage {

  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  scrollTopButton = false;

  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  //@ViewChild(IonRange) priceRange: IonRange;
  products = new Array;
  selectedTab = '';
  categoryId = '';
  categoryName = '';
  sortOrder = 'newest';
  sortArray = ['Newest', 'A - Z', 'Z - A', 'Price : high - low', 'Price : low - high', 'Top Seller', 'Special Products', 'Most Liked'];
  page = 0;
  applyFilter = false;
  filters = [];
  selectedFilters = [];
  price = { lower: 0, upper: 500 };
  maxAmount = 500;
  side = "right";
  productView = 'grid';
  httpRunning = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider,
    public translate: TranslateService,
    public httpClient: HttpClient,
    public actionSheet: ActionSheetController) {

    if (shared.dir == "rtl") this.side = "left";

    if (this.navParams.get('id') != undefined) this.selectedTab = this.categoryId = this.navParams.get('id');
    if (this.navParams.get('name') != undefined) this.categoryName = this.navParams.get('name');
    if (this.navParams.get('sortOrder') != undefined) this.sortOrder = this.navParams.get('sortOrder');
    this.getProducts(null);
    this.getFilters(this.categoryId);



  }

  getProducts(infiniteScroll) {
    this.httpRunning = true;
    if (this.page == 0) { this.loading.show(); }
    var dat: { [k: string]: any } = {};
    if (this.shared.customerData != null)//in case user is logged in customer id will be send to the server to get user liked products
      dat.customers_id = this.shared.customerData.customers_id;
    if (this.applyFilter == true) {
      dat.filters = this.selectedFilters;
      dat.price = { minPrice: this.price.lower, maxPrice: this.price.upper };
    }
    dat.categories_id = this.selectedTab;
    dat.page_number = this.page;
    dat.type = this.sortOrder;
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getallproducts', dat).subscribe((data: any) => {
      this.httpRunning = false;
      // console.log(data.product_data.length + "   " + this.page);
    //  this.infinite.complete();
      if (this.page == 0) { this.products = new Array; this.loading.hide(); this.scrollToTop(); }
      if (data.success == 1) {
        this.page++;
        var prod = data.product_data;
        for (let value of prod) {
          this.products.push(value);
        }
      }
      if (data.success == 1 && data.product_data.length == 0) { this.infinite.enable(false); }
      if (data.success == 0) { this.infinite.enable(false); }

    }, (error: any) => {
      this.httpRunning = false;
    });

  }

  //changing tab
  changeTab(c) {
    this.applyFilter = false;
    this.infinite.enable(true);
    this.page = 0;
    if (c == '') this.selectedTab = c
    else this.selectedTab = c.id;
    this.getProducts(null);
    this.getFilters(this.selectedTab);
  }

  //============================================================================================  
  // filling filter array for keyword search 
  fillFilterArray = function (fValue, fName, keyword) {
    if (fValue._value == true) {
      this.selectedFilters.push({ 'name': fName, 'value': keyword });
    }
    else {
      this.selectedFilters.forEach((value, index) => {
        if (value.value == keyword) {
          this.selectedFilters.splice(index, 1);
        }
      });
    } //console.log(this.selectedFilters);
  };
  //============================================================================================  
  //getting countries from server
  getFilters = function (id) {
    var dat: { [k: string]: any } = {};
    dat.categories_id = id;
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getfilters', dat).subscribe((data: any) => {
      //  console.log(data);
      if (data.success == 1)
        this.filters = data.filters;
      this.maxAmount = this.price.upper = data.maxPrice;
    });
  };
  applyFilters() {
    this.applyFilter = true;
    this.infinite.enable(true);
    this.page = 0;
    this.getProducts(null);
  }
  resetFilters() {
    this.getFilters(this.selectedTab);
  }
  removeFilters() {
    this.applyFilter = false;
    this.infinite.enable(true);
    this.page = 0;
    this.getProducts(null);
    this.getFilters(this.selectedTab);

  }
  ionViewDidEnter() {
    //this.product = this.navParams.get('data');
  }
  ngOnChanges() {

  }

  getSortProducts(value) {

    if (value == 'Newest') value = 'newest';
    else if (value == 'A - Z') value = 'a to z';
    else if (value == 'Z - A') value = 'z to a';
    else if (value == 'Price : high - low') value = 'high to low';
    else if (value == 'low to high') value = 'low to high';
    else if (value == 'Top Seller') value = 'top seller';
    else if (value == 'Special Products') value = 'special';
    else if (value == 'Most Liked') value = 'most liked';
    else value = value;

    //console.log(value);
    if (value == this.sortOrder) return 0;
    else {
      this.sortOrder = value;
      this.infinite.enable(true);
      this.page = 0;
      this.getProducts(null);
    }
  }

  openSortBy() {
    var buttonArray = [];
    this.translate.get(this.sortArray).subscribe((res) => {

      for (let key in res) {
        buttonArray.push({ text: res[key], handler: () => { this.getSortProducts(key) } });
      }
      buttonArray.push(
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      );

      var actionSheet = this.actionSheet.create({
        buttons: buttonArray
      });
      actionSheet.present();
    });


  }
  changeLayout() {
    if (this.productView == 'list') this.productView = "grid";
    else this.productView = "list";

    this.scrollToTop();
  }

  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    //else this.scrollTopButton=false;
    //   console.log(e);
  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  ionViewDidLoad() {
    // console.log("loaded");

    try {
      setTimeout(() => {
        let ind = 0;
        this.shared.subCategories.forEach((value, index) => {
          if (this.selectedTab == value.id) { ind = index; }
        });
       // this.slides.slideTo(ind, 1000, true);
      }, 100);
    } catch (error) {

    }
  }

}
