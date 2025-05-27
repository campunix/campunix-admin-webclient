import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyllabusService } from '../../services/syllabus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-syllabus-upload',
  templateUrl: './syllabus-upload.component.html',
  styleUrls: ['./syllabus-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SyllabusUploadComponent implements OnInit {
  selectedFile: File | null = null;
  isUploading: boolean = false;
  uploadProgress: number = 0;
  syllabusForm: FormGroup;
  calendarYears: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private readonly _syllabusService: SyllabusService
  ) {}

  ngOnInit(): void {
    this.syllabusForm = this._fb.group({
        title: this._fb.control('', Validators.required),
        description: this._fb.control(''),
        calendar_year: this._fb.control('', Validators.required),
        routineEntries: this._fb.array([])
    });

    for(let i = 2023; i <= 2050; i++) {
      this.calendarYears.push(`${i} - ${i + 1}`);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/xml') {
      this.selectedFile = file;
    } else {
      this._snackBar.open('Please select a valid XML file', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      event.target.value = '';
    }
  }

  uploadSyllabus(): void {
    if (!this.selectedFile) {
      this._snackBar.open('Please select a file first', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    this.isUploading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this._syllabusService.uploadSyllabus(this.syllabusForm.value, formData)
      .subscribe({
        next: (response) => {
          this.isUploading = false;
          this._snackBar.open('Upload completed successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

          this._router.navigate(['/syllabus']).then(() => {});
        },
        error: (error) => {
          this.isUploading = false;
          this._snackBar.open('Upload failed: ' + error.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }
} 