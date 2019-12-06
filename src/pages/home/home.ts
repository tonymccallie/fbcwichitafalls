import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GreybackProvider } from '../../providers/greyback/greyback';
import { SharedModule } from '../../app/shared.module';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

export interface Article {
	title: string;
	body: string;
}

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	news: any[];
	posts: any[];
	rootUrl: string;

	@ViewChild(Slides) slides: Slides;

	constructor(public navCtrl: NavController, public navParams: NavParams, private greybackProvider: GreybackProvider, public shared: SharedModule) {
		this.rootUrl = greybackProvider.rootUrl;
		console.log('contructor HomePage');
	}

	ionViewDidLoad() {
		//fired if not cached
		console.log('ionViewDidLoad HomePage');
	}

	ionViewWillEnter() {
		//fired every time
		console.log('ionViewWillEnter HomePage');
		this.greybackProvider.getNews().subscribe(news => {
			this.news = news.data;
		});
		this.greybackProvider.getCommunity().subscribe(posts => {
			this.posts = posts.data;
		});
		// this.greybackProvider.getCalendars().subscribe(results => {
		// 	console.log(results);
		// }, msg => console.error(`ErrorFOO: ${msg.status} ${msg.statusText}`));
	}

	ionViewDidEnter() {
		//fired every time
		console.log('ionViewDidEnter HomePage');
	}

	viewArticle(article) {
		this.navCtrl.push('ArticleDetailPage', {
			article: article,
			articleId: article.NewsArticle.id
		});
	}

	viewPost(post) {
		this.navCtrl.push('PostDetailPage', {
			post: post,
			postId: post.CommunityPost.id
		});
	}

	doRefresh(refresher) {
		console.log('doRefresh');
		setTimeout(() => {
			console.log('Async operation has ended');
			refresher.complete();
		}, 2000);
	}

	doInfinite(infiniteScroll) {
		console.log('Begin async operation');

		// setTimeout(() => {
		// 	for (let i = 0; i < 30; i++) {
		// 		this.news.push({title:'test',body:'test'});
		// 	}

		// 	console.log('Async operation has ended');
		// 	infiniteScroll.complete();
		// }, 500);
	}
}
