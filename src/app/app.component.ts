import { Component } from '@angular/core';
import { FlickerCycleService } from './flicker-cycle.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private flickerCycleService: FlickerCycleService) {}

	filesUpdated(files) {
		var my = this;
		if (files.length === 1) {
			var reader = new FileReader();
			reader.onload = (function(theFile) {
				return function(e) {
					my.flickerCycleService.downloadLinkForVid = e.target.result;
					new window.p5(my.flickerCycleService.sketch); 
				};
			})(files);
			reader.readAsDataURL(files[0]); // get first file of 1, i.e. [file]
		} else {
			alert("Only one file at a time. Refresh and try again.");
		}
	}
}
