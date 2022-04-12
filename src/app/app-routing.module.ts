import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'src/config/pages-config';
import { UsersListDataComponent } from './users-list-data/users-list-data.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: config.usersListData.name,
    pathMatch: 'full',
  },
  {
    path: config.usersListData.name,
    component: UsersListDataComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
