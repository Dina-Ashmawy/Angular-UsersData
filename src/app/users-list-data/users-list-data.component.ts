import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExportToCsv } from 'export-to-csv';
import { OptionsCsvModel } from '../shared/models/options-csv.model';
import { FilterTypeModel } from '../shared/models/filter-type.model';
import { UsersListService } from './services/users-list.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-users-list-data',
  templateUrl: './users-list-data.component.html',
  styleUrls: ['./users-list-data.component.scss']
})

export class UsersListDataComponent {

  rows = new Array<any>();
  dataSource = new Array<any>();
  allDataSource = new Array<any>();
  displayedColumns = ['name', 'nationality', 'gender', 'location', 'email', 'age', 'registrationSeniority', 'phone', 'picture'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  typeFilters: FilterTypeModel[] = [];
  defaultValue = "All";
  genders: string[] = ['All', 'Male', 'Female'];
  nationalities: string[] = ['All', 'AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US']
  constructor(private usersListService: UsersListService) { }

  ngOnInit(): void {
    this.getUsersData();
    this.addDataFilters();
  }

  getUsersData(): void {
    this.usersListService.getUsersData().subscribe((data: any) => {
      this.displayInitialData(data);
    });
  }

  addDataFilters(): void {
    this.typeFilters.push({ name: 'gender', options: this.genders, defaultValue: this.defaultValue });
    this.typeFilters.push({ name: 'nationality', options: this.nationalities, defaultValue: this.defaultValue });
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  displayInitialData(input: any) {
    this.displayedColumns = input.length > 0 ? Object.keys(input[0]) : [];
    this.dataSource = new MatTableDataSource(input).filteredData;
    this.allDataSource = this.dataSource;
  }

  exportCSV() {
    const csvOptions = new OptionsCsvModel();
    csvOptions.showTitle = true;
    csvOptions.showLabels = true;
    csvOptions.useBom = true;
    csvOptions.useKeysAsHeaders = true;
    const csvExporter = new ExportToCsv(csvOptions);
    csvExporter.generateCsv(this.dataSource);
  }

  applyUserFilter() {
    this.dataSource = this.allDataSource;
    const genderFilter = this.typeFilters.find(a => a.name === 'gender');
    const nationalityFilter = this.typeFilters.find(a => a.name === 'nationality');
    if (nationalityFilter?.defaultValue != this.defaultValue) {
      this.dataSource = this.dataSource.filter(item => item.nationality.toLowerCase() === nationalityFilter?.defaultValue.toLowerCase())
    }
    if (genderFilter?.defaultValue != this.defaultValue) {
      this.dataSource = this.dataSource.filter(item => item.gender.toLowerCase() === genderFilter?.defaultValue.toLowerCase())
    }

  }

  resetFilters() {
    this.typeFilters.forEach(function (item, index) {
      item.defaultValue = "All";
    });
    this.dataSource = this.allDataSource;
  }
}

