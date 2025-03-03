import { Component } from '@angular/core';
import { SyllabusService } from '../../services/syllabus.service';
import { Response, SingleItemResponse } from 'app/models/response';
import { SyllabusData } from 'app/models/syllabus_data';
import ordinal from 'ordinal';

@Component({
  selector: 'app-syllabus-view',
  templateUrl: './syllabus-view.component.html',
  styleUrls: ['./syllabus-view.component.scss']
})
export class SyllabusViewComponent {

  isLoading: boolean = false;
  syllabusData: SyllabusData;

  constructor(private _syllabusService: SyllabusService) {
    this.isLoading = true;
  }

  ngOnInit() {
      this._syllabusService.get(1).subscribe((response: Response<SyllabusData>) => {
          this.syllabusData = response.data;
          console.log(this.syllabusData);
          this.isLoading = false;
      });
  }

  getOrdinal(num: number): string {
      return ordinal(num);
  }
}
