import { MediaProvider } from './../../providers/media/media';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AudioProvider } from '../../providers/audio/audio';
import { InAppBrowser } from '@ionic-native/in-app-browser';

export interface PageInterface {
	title: string;
	pageName: string;
	tabComponent?: any;
	index?: number;
	icon: string;
}

@IonicPage()
@Component({
	selector: 'page-menu',
	templateUrl: 'menu.html',
})
export class MenuPage {
	// Basic root for our content view
	rootPage = 'TabsPage';
	player: any;

	// Reference to the app's root nav
	@ViewChild(Nav) nav: Nav;

	pages: PageInterface[] = [
		{ title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'ios-home-outline' },
		{ title: 'Jesus', pageName: 'JesusPage', icon: 'ios-heart-outline' },
		{ title: 'About', pageName: 'AboutPage', icon: 'ios-information-circle-outline' },
		{ title: 'Sermons', pageName: 'TabsPage', tabComponent: 'SeriesPage', index: 1, icon: 'ios-headset-outline' },
		{ title: 'Events', pageName: 'TabsPage', tabComponent: 'EventsPage', index: 2, icon: 'ios-calendar-outline' },
		{ title: 'Giving', pageName: 'GivingPage', tabComponent: 'GivingPage', index: 3, icon: 'ios-cash-outline' },
		{ title: 'Service Times', pageName: 'TabsPage', tabComponent: 'TimesPage', index: 4, icon: 'ios-time-outline' },
		{ title: 'Watch Live', pageName: 'LivePage', icon: 'ios-videocam-outline' },
		{ title: 'Staff', pageName: 'StaffPage', icon: 'ios-contact-outline' },
		{ title: 'Location', pageName: 'LocationPage', icon: 'ios-pin-outline' },
		// { title: 'Prayer', pageName: 'PrayerPage', icon: 'ios-chatboxes-outline' },
		{ title: 'Credits', pageName: 'CreditsPage', icon: 'ios-ribbon-outline' },
	];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public audioProvider: AudioProvider, 
		public mediaProvider: MediaProvider,
		private iab: InAppBrowser
	) {
		this.player = audioProvider;
		//this.player = mediaProvider;
	}

	openPage(page: PageInterface) {
		let params = {};

		// The index is equal to the order of our tabs inside tabs.ts
		if (page.index) {
			params = { tabIndex: page.index };
		}

		if (page.pageName == "LivePage") {
			this.iab.create('https://livestream.com/FBCWF/events/7167625', '_system');
		} else {
			if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
				this.nav.getActiveChildNavs()[0].select(page.index);
			} else {
				// Tabs are not active, so reset the root page 
				// In this case: moving to or from SpecialPage
				this.nav.getActiveChildNavs()[0].getSelected().push(page.pageName);
			}
		}
	}

	isActive(page: PageInterface) {
		// Again the Tabs Navigation
		let childNav = this.nav.getActiveChildNavs()[0];

		if (childNav) {
			if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
				return 'primary';
			}
			return;
		}

		// Fallback needed when there is no active childnav (tabs not active)
		if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
			return 'primary';
		}
		return;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MenuPage');
	}

	pause() {
		this.audioProvider.pause();
		//this.mediaProvider.pause();
	}

	scrub(percent) {
		console.log('scrubbed');
		this.audioProvider.scrub(percent);
		//this.mediaProvider.scrub(percent);
	}
}
