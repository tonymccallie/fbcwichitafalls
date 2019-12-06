import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Injectable()
export class GreybackProvider {
	rootUrl: string = 'http://fbcwf.server3.greyback.net/';
	headers: any = new Headers;
	opts: any;


	constructor(public http: Http, public httpClient: HttpClient) {
		console.log('Hello GreybackProvider Provider');
		this.headers.append('Accept', 'application/json');
		this.headers.append('Content-Type', 'application/json');
		// this.headers.append('Authorization', "Basic " + btoa('patrickkemp:Three3leaf'));
		// this.headers.append('Authorization', "Basic " + btoa('it@fbcwf.org:starsareeyes'));
		this.opts = new RequestOptions({ headers: this.headers });
	}

	getNews() {
		return this.http.get(this.rootUrl + '/ajax/plugin/news/news_articles/json/limit:4/category:1').map(result => result.json());
	}

	getCommunity() {
		//return this.http.get(this.rootUrl + '/ajax/plugin/news/news_articles/json/limit:10/category:2').map(result => result.json());
		return this.http.get(this.rootUrl + '/ajax/plugin/community/community_posts/latest/department:1').map(result => result.json());
	}

	getSeries() {
		return this.http.get(this.rootUrl + '/ajax/plugin/message/message_series/json/category:1').map(result => result.json());
	}

	getSeriesById(seriesId: number) {
		return this.http.get(this.rootUrl + '/ajax/plugin/message/message_messages/json/series:' + seriesId).map(result => result.json());
	}

	getLatestSermon() {
		return this.http.get(this.rootUrl + '/ajax/plugin/message/message_messages/json/limit:1/category:1').map(result => result.json());
	}

	getEvents() {
		return this.http.get(this.rootUrl + '/ajax/plugin/news/news_articles/json/limit:10/category:3').map(result => result.json());
	}

	getStaff() {
		return this.http.get(this.rootUrl + '/ajax/plugin/staff/staff_departments/json/department:5').map(result => result.json())
	}

	getCalendars() {
		return this.http.get('https://secure.accessacs.com/api_accessacs_mobile/v2/10413/calendars', this.opts).map(result => result.json());
	}

	getCalendar(index) {
		//return this.http.get('assets/search.json').map(result => result.json());
		//&departmentIds=
		return new Promise(resolve => {
			this.httpClient.get('https://api.serviceu.com/rest/events/occurrences/search?orgKey=9ccb6bd6-c8f2-4e89-8b1e-b8cfbc85c19d&format=json').subscribe(
					data => {
					resolve(data);
				},
				// error => this.logError(filename, error)
				error => {
					console.log('getCalendar error');

					this.httpClient.get('assets/search.json').subscribe(
						data => {
							resolve(data);
						},
						err => {
							console.warn(['getCalendar',err]);
						}
					)
				}
			)
		});
	}

	getCalendar2(index) {
		return new Promise(resolve => {
			// for local dev must run Chrome with: open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
			this.httpClient.get('https://fbcwf.org/ajax/plugin/organization/organization_departments/suproxy2/occurrences').subscribe(
					data => {
					resolve(data);
				},
				// error => this.logError(filename, error)
				error => {
					console.log('getCalendar error');
				}
			)
		});
	}

/*
{
CategoryList: "Department Event",
ContactEmail: "abills@fbcwf.org",
ContactName: "Angela Bills",
ContactPhone: "",
DateModified: "01/15/2018 03:36:31 PM",
DepartmentList: "Adult Ministry",
DepartmentName: "Adult Ministry",
Description: "Off Campus",
DisplayTimes: false,
EventId: 9872952,
ExternalEventUrl: "",
ExternalImageUrl: "",
LocationAddress: "2907 Garnett Ave WF 76308",
LocationAddress2: "",
LocationCity: "",
LocationName: "Jason' Deli",
LocationState: "",
LocationZip: "",
MaxDate: "01/01/1900 12:00:00 AM",
MinDate: "01/01/1900 12:00:00 AM",
Name: "Perkins LIFE Group Fellowship - January",
OccurrenceEndTime: "01/15/2018 08:00:00 PM",
OccurrenceId: 401278366,
OccurrenceStartTime: "01/15/2018 06:00:00 PM",
PublicEventUrl: "http://public.serviceu.com/calendar/EventDetails.asp?OrgKey=9ccb6bd6-c8f2-4e89-8b1e-b8cfbc85c19d&EventID=9872952&OccID=401278366",
RegistrationEnabled: 0,
RegistrationUrl: "",
ResourceEndTime: "01/15/2018 08:00:00 PM",
ResourceList: "",
ResourceStartTime: "01/15/2018 06:00:00 PM",
StatusDescription: "Approved",
SubmittedBy: "Angela Bills"
}
*/
	getCalendarX(index) {
		let today = moment().format('YYYY/MM/DD');
		let end = moment().add(90,'days').format('YYYY/MM/DD');

		//58c08c0d-776d-4762-8180-0df5fcf1ae74
		return this.http.get('https://secure.accessacs.com/api_accessacs_mobile/v2/10413/events?&startdate='+today+'&stopdate='+end+'&pageIndex='+index+'&pageSize=50&calendarids=58c08c0d-776d-4762-8180-0df5fcf1ae74', this.opts).map(result => result.json());
		//return this.http.get('http://localhost:8100/assets/data.json', this.opts).map(result => result.json());
	}

	getEvent(eventId: string) {
		//console.log(eventId);
		return this.http.get('https://secure.accessacs.com/api_accessacs_mobile/v2/10413/events/' + eventId, this.opts).map(result => result.json());
	}

}
