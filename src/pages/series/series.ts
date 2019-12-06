import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GreybackProvider } from '../../providers/greyback/greyback';

@IonicPage()
@Component({
	selector: 'page-series',
	templateUrl: 'series.html',
})
export class SeriesPage {
	series: any[];
	latest: any;
	rootUrl: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public greybackProvider: GreybackProvider) {
		console.log('constructor SeriesPage');
		this.rootUrl = greybackProvider.rootUrl;
		this.greybackProvider.getSeries().subscribe(series => {
			this.series = series.data;
		});

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SeriesPage');
		this.greybackProvider.getLatestSermon().subscribe(latest => {
			this.latest = latest.data;
		});
	}

	ionViewWillEnter() {
		console.log('ionViewWillEnter SeriesPage');
	}

	viewSeries(series) {
		this.navCtrl.push('SermonsPage', {
			series: series,
			seriesId: series.id
		});
	}

}
