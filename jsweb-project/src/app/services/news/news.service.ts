import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";

import { NewInputModel } from "../../models/input-models/new-input.model";
import { HttpClientService } from "../authentication/http-client.service";
import { HttpHeaders } from "@angular/common/http";


const appKey = 'kid_Syo-_Ms7M';
const appSecret = '04a08800d54f47b2acab585d66a30608';
const postNewUrl = `https://baas.kinvey.com/appdata/${appKey}/news`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
@Injectable()

export class NewsService {

    constructor(private http: HttpClientService) {

    }

    postNew(data: NewInputModel): Observable<Object> {
        return this.http.post(postNewUrl,
            JSON.stringify(data),
            this.createAuthHeaders('Kinvey'))
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