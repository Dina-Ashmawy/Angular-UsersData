import { Observable, of } from "rxjs";
import { UserDataModel } from "../../models/user.model";

export class UsersListServiceMock {
    dataItems: UserDataModel[] = new Array<UserDataModel>();
    getUsersData(): Observable<{}> {
        return of(this.dataItems);
    }
}