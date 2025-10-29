import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule, FormsModule, CommonModule)],
}).catch(err => console.error(err));


