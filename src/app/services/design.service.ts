import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Design } from '../models/design';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  desings: Design[] = []
  private url_api = 'https://proxising.com/casalux/api/luxurykitchens/collections.php'

  constructor(private http: HttpClient) { }

  getDesign(){
    return this.http.get<Design[]>(this.url_api)
  }
}
