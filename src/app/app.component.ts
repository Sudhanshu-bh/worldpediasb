import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './shared/services/api/api.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryModalComponent } from './country-modal/country-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  countriesPerRow = 5;
  defaultNumOfRows = 5;
  moreRowsToLoad = 5;

  loading = true;
  allCountriesList?: any[];
  displayedCountries?: any[] = [];
  numOfCountriesToShow!: number;
  searchText = '';
  subscriptionEmail = '';

  @ViewChild('searchForm') searchForm!: NgForm;

  constructor(private apiService: ApiService, private ngbModal: NgbModal) {}

  ngOnInit(): void {
    this.checkSmallerDevice();
    this.getAllCountries();
    this.setNumOfCountriesToShow();
  }

  ngAfterViewInit(): void {
    this.adjustSearchPosition();
  }

  checkSmallerDevice() {
    if (window.innerWidth <= 599) {
      this.countriesPerRow = 2;
    }
  }

  adjustSearchPosition() {
    const headerSearch = document.getElementById('headerSearch')!;
    const searchHeight = getComputedStyle(headerSearch).height;
    headerSearch.style.marginBottom = `-${parseInt(searchHeight) / 2}px`;
  }

  getAllCountries() {
    this.apiService.getAllCountries().subscribe((res) => {
      const defaultNumOfCountries =
        this.countriesPerRow * this.defaultNumOfRows;

      this.allCountriesList = res;
      this.displayedCountries = this.getNCountriesSorted(
        this.allCountriesList,
        defaultNumOfCountries
      );

      this.loading = false;
    });
  }

  setNumOfCountriesToShow() {
    this.numOfCountriesToShow =
      this.displayedCountries!.length +
      this.countriesPerRow * this.moreRowsToLoad;
  }

  displayMoreCountries() {
    const numOfCountriesToShow =
      this.displayedCountries!.length +
      this.countriesPerRow * this.moreRowsToLoad;

    this.displayedCountries = this.allCountriesList?.slice(
      0,
      numOfCountriesToShow
    );
  }

  handleSearch(formValue: { searchText: string }) {
    this.loading = true;

    this.apiService.search(formValue.searchText).subscribe({
      next: (res) => {
        this.allCountriesList = res;
        this.displayedCountries = this.getNCountriesSorted(
          this.allCountriesList,
          this.numOfCountriesToShow
        );

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.showAllCountries();
      },
    });
  }

  getNCountriesSorted(countryList: any[], numOfCountries: number) {
    const sortedList = countryList.sort((country1, country2) => {
      if (country1.name.common > country2.name.common) return 1;
      return -1;
    });
    return sortedList.slice(0, numOfCountries);
  }

  showAllCountries() {
    this.searchForm.resetForm();
    this.getAllCountries();
  }

  openCountryModal(countryData: any) {
    const modalRef = this.ngbModal.open(CountryModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.countryData = countryData;
  }
}
