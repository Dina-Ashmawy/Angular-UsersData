import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListDataComponent } from './users-list-data.component';
import { SharedModule } from '../shared/shared.module';
import { UsersListService } from './services/users-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersListDataComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers:[
    UsersListService
  ]
})
export class UsersListDataModule { }
