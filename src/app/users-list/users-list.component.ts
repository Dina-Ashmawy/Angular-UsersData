import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersListService } from './services/users-list.service';
import { MatTableDataSource } from '@angular/';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  dataTable: any;

  @Input()
  set columns(columns: Array<ColumnDef>) {
    this.inputColumns = columns;
  }

  @Input()
  set data(data: Array<any>) {
    this.inputData = data;
    this.BindDataTable();
  }



  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayColumns: Array<string>;
  filterColumns: Array<string>;
  inputColumns: Array<ColumnDef>;
  inputData: Array<any>;
  filter: any = {};



  @Output() rowclick = new EventEmitter<any>();
  constructor(private usersList: UsersListService) { }

  ngOnInit(): void {
    debugger;
    this.usersList.getData().subscribe((data) => {
      this.dataTable = data;
    });
  }

  BindDataTable() {

    if (this.inputColumns == undefined) {
      if (this.inputData && this.inputData.length > 0) {
        this.displayColumns = Object.getOwnPropertyNames(this.inputData[0]);
        this.inputColumns = this.displayColumns.map(c => { return { name: c, displayName: c } });
      }
    } else {
      this.displayColumns = this.inputColumns.map(c => c.name);
      this.inputColumns = this.inputColumns.map(c => {
        return { name: c.name, displayName: c.displayName ? c.displayName : c.name, width: c.width ? c.width : 'auto', columnType: c.columnType ? c.columnType : ColumnType.Text, class: c.class ? c.class : '', defaultText: c.defaultText, sort: c.sort }
      });
    }

    this.filterColumns = this.displayColumns.map(c => 'filter' + c);

    if (this.inputData && this.inputData.length > 0) {
      this.dataSource = new MatTableDataSource<any>(this.inputData);
    } else {
      this.dataSource = new MatTableDataSource<any>([]);
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.CreateFilter();

  }

  ButtonClick(element, columnName) {
    let emmitValue = {
      name: columnName,
      value: element
    }
    this.rowclick.emit(emmitValue);
  }

  ShowFilter(index, item): boolean {
    return index == 0;
  }


  FilterData(event, column) {
    let value = event.srcElement.value;
    this.filter[column] = value;
    let json = JSON.stringify(this.filter);
    if (json == '{}') {
      this.dataSource.filter = undefined;
    } else {
      this.dataSource.filter = json;
    }
  }


  CreateFilter(): (data: any, filter: string) => boolean {
    return function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      let columns = Object.keys(searchTerms);
      for (let index = 0; index < columns.length; index++) {
        let key = columns[index];
        if (data[key].toString().trim().indexOf(searchTerms[key].toString().trim()) !== -1) {
          if (index == columns.length - 1) {
            return true;
          }
        } else {
          return false;
        }
      }
      return false;
    }
  }


}
