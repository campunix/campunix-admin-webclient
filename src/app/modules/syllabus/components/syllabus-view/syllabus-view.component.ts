import { Component } from '@angular/core';
import { SyllabusService } from '../../services/syllabus.service';
import { Response, SingleItemResponse } from 'app/models/response';
import { SyllabusData } from 'app/models/syllabus_data';
import ordinal from 'ordinal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-syllabus-view',
  templateUrl: './syllabus-view.component.html',
  styleUrls: ['./syllabus-view.component.scss']
})
export class SyllabusViewComponent {

  isLoading: boolean = false;
  syllabusData: SyllabusData;

  constructor(private _syllabusService: SyllabusService, private route: ActivatedRoute) {
    this.isLoading = true;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._syllabusService.get(+id).subscribe((response: Response<SyllabusData>) => {
        this.syllabusData = response.data;
        console.log(this.syllabusData);
        this.isLoading = false;
      });
    }
  }

  getOrdinal(num: number): string {
      return ordinal(num);
  }
}
