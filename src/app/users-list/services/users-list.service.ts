import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsersListService {
    apiurl = "https://randomuser.me/api/";
    constructor(private http: HttpClient) {}
    getData() {
        return this.http.get(this.apiurl);
     }
}
