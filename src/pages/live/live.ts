import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@IonicPage()
@Component({
	selector: 'page-live',
	templateUrl: 'live.html',
})
export class LivePage {
	url: SafeResourceUrl;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public sanitzier: DomSanitizer
	) {
		this.url = this.sanitzier.bypassSecurityTrustResourceUrl("https://fbcwf.org/live");//"https://livestream.com/accounts/11452393/events/7167625/player?autoPlay=false");
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LivePage');
	}

}
