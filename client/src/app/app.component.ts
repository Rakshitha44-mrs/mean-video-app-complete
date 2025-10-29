import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  videos: any[] = [];
  videoTitle: string = '';
  selectedFile: File | null = null;

  private API_URL = 'http://localhost:4000/api/videos';

  ngOnInit() {
    this.loadVideos();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadVideo(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) {
      alert('Please select a video!');
      return;
    }

    const formData = new FormData();
    formData.append('video', this.selectedFile);
    formData.append('title', this.videoTitle);

    try {
      await axios.post(this.API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      this.videoTitle = '';
      this.selectedFile = null;
      this.loadVideos();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  }

  async loadVideos() {
    try {
      const res = await axios.get(this.API_URL);
      this.videos = res.data;
    } catch (err) {
      console.error(err);
    }
  }

  getVideoUrl(filename: string) {
    return `http://localhost:4000/api/videos/stream/${filename}`;
  }
}



