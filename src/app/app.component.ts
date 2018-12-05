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
			reader.onload = (function(theFile) { // go here
				let win: any = window;
				my.flickerCycleService.p5file = new win.p5.File(theFile[0]);
				return function(e) {
					// clear out the div
					var node = document.getElementById('canvas');
					while (node.hasChildNodes()) {
						node.removeChild(node.firstChild);
					}
					// start new sketch / canvas with contents
					// my.flickerCycleService.p5file.data = e.target.result; // e.target.result is blob?
					my.flickerCycleService.p5file.data = e.target.result;
					// debugger;
					let win: any = window;
        			new win.p5(my.flickerCycleService.sketch);
				};
			})(files);
			reader.readAsDataURL(files[0]); // get first file of 1, i.e. [file]
		} else {
			alert("Only one file at a time. Refresh and try again.");
		}
	}
}
