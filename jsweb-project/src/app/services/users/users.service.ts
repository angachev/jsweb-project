import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";

import { NewInputModel } from "../../models/input-models/new-input.model";
import { HttpClientService } from "../authentication/http-client.service";
import { HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../models/user/user.model";


const appKey = 'kid_Syo-_Ms7M';
const appSecret = '04a08800d54f47b2acab585d66a30608';
const baseUrl = 'https://baas.kinvey.com'
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
@Injectable()

export class UsersService {

    constructor(private http: HttpClientService) {

    }

    
    getAllUsers(): Observable<UserModel[]> {
        return this.http.get(baseUrl + `/user/${appKey}`,
         this.createAuthHeaders('Kinvey'));
    }
    getSingleUser(id): Observable<UserModel> {
        return this.http.get(baseUrl + `/user/${appKey}/${id}`, 
        this.createAuthHeaders('Kinvey'));
    }
    deleteUser(id){
        return this.http.delete(baseUrl + `/user/${appKey}`,id,this.createAuthHeaders('Kinvey'))
    }
    


    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
}