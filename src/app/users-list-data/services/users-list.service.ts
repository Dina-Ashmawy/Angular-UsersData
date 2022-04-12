import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { JSON_PATHS } from '../../../app/shared/constants/defines';
import * as jsonQuery from 'jsonpath';
import { map } from 'rxjs/operators';
import { AppService } from '../../../app/app.service';
import { UserDataModel } from '../../../app/shared/models/user.model';

@Injectable()
export class UsersListService {

    dataItems: UserDataModel[] = new Array<UserDataModel>();
    apiurl = "https://randomuser.me/api/?results=25&inc=gender,name,nat,location,dob,email,phone,registered,picture";
    constructor(private http: HttpClient,
        private appService: AppService) { }

    getUsersData() {
        return this.http.get(this.apiurl).pipe(map((response: any) => {
            debugger;
            const items = jsonQuery.value(response, JSON_PATHS.USERKEYVALUECONFIG.RESULTS);
            if (items) {
                items.map((res: any) => {
                    this.mapUsersData(res);
                });
            }
            return this.dataItems;
        }))
    }

    mapUsersData(res: any) {
        const user = new UserDataModel();
        user.name = res.name.first + ' ' + res.name.last;
        user.gender = res.gender;
        user.location = res.location.city + ', ' + res.location.country;
        user.email = res.email;
        user.age = res.dob.age;
        user.registrationSeniority = res.registered.age;
        user.phone = res.phone;
        user.nationality = res.nat;
        user.picture = this.appService.isMobile ? res.picture.thumbnail : this.appService.isTablet ? res.picture.medium : res.picture.large;
        this.dataItems.push(user);
    }
}
