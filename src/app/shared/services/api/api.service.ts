import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all');
  }

  search(searchText: string) {
    return this.http.get<any[]>(
      `https://restcountries.com/v3.1/name/${searchText}`
    );
  }
}
