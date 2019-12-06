import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GreybackProvider } from '../../providers/greyback/greyback';

@IonicPage({
	segment: 'sermons/:seriesId'
})
@Component({
	selector: 'page-sermons',
	templateUrl: 'sermons.html',
})
export class SermonsPage {
	series: any;
	sermons: any[];
	latest: any;
	rootUrl: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public greybackProvider: GreybackProvider) {
		this.greybackProvider.getSeriesById(this.navParams.get('seriesId')).subscribe(sermons => {
			this.sermons = sermons.data;
		});
		this.series = this.navParams.get('series');
		this.rootUrl = greybackProvider.rootUrl;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SermonsPage');
	}

	ionViewWillEnter() {
		console.log('ionViewWillEnter SermonsPage');
	}

	viewSermon(sermon) {
		this.navCtrl.push('SermonPage', {
			series: this.series,
			sermon: sermon,
			sermonId: sermon.id
		});
	}
}
