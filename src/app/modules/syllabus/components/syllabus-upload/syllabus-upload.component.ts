import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-syllabus-upload',
  templateUrl: './syllabus-upload.component.html',
  styleUrls: ['./syllabus-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SyllabusUploadComponent {
  selectedFile: File | null = null;
  isUploading: boolean = false;
  uploadProgress: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private _http: HttpClient
  ) {}

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

    this._http.post('http://127.0.0.1:8000/syllabus/upload', formData)
      .subscribe({
        next: (response) => {
          this.isUploading = false;
          this._snackBar.open('Upload completed successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
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