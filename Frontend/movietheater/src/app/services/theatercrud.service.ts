import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface Theater {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}