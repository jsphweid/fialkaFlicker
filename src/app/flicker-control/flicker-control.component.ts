import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { FlickerCycleService} from '../flicker-cycle.service'

@Component({
	selector: 'app-flicker-control',
	templateUrl: './flicker-control.component.html',
	styleUrls: ['./flicker-control.component.css']
})
export class FlickerControlComponent {
	blackCount: number = 3;
	whiteCount: number = 2;
	vidCount: number = 1;

	constructor(private flickerCycleService: FlickerCycleService) { 
		flickerCycleService.flick.blackCount = this.blackCount;
		flickerCycleService.flick.whiteCount = this.whiteCount;
		flickerCycleService.flick.vidCount = this.vidCount;
	}

	update(propertyName:string, value:number) {
		this[propertyName] = value;
		this.flickerCycleService.flick[propertyName] = value;
	}

	startFlicker() {
		this.flickerCycleService.flick.flicker = !this.flickerCycleService.flick.flicker;
	}

}
