import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  countryData: any;
  country: any = {};

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.extractCountryInfo();
  }

  extractCountryInfo() {
    this.country.capital = this.countryData.capital?.join(', ');
    this.country.continent = this.countryData.continents?.join(', ');

    if (this.countryData.currencies) {
      this.country.currency = '';
      let currenciesObjArr = Object.values(this.countryData.currencies);
      let currencyNameArr = [];
      for (const cur of currenciesObjArr) {
        currencyNameArr.push((cur as any).name);
      }
      this.country.currency = currencyNameArr.join(', ');
    }

    if (this.countryData.languages) {
      let langs = Object.values(this.countryData.languages);
      this.country.languages = langs.join(', ');
    }

    this.country.population = this.countryData.population;
    this.country.timezones = this.countryData.timezones?.join(', ');
  }
}
