import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root: any = 'HomePage';
	tab2Root: any = 'SeriesPage';
	tab3Root: any = 'EventsPage';
	tab4Root: any = 'TimesPage';
	tab5Root: any = 'AboutPage';
	tab6Root: any = 'GivingPage';

	myIndex: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
		this.myIndex = navParams.data.tabIndex || 0;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabsPage');
	}

	giving() {
		this.iab.create('http://www.fbcwf.org/pages/page.asp?page_id=239772','_system');
	}

}
