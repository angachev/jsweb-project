import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";

import { NewInputModel } from "../../models/input-models/new-input.model";
import { HttpClientService } from "../authentication/http-client.service";
import { HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs/Subject";

const appKey = 'kid_Syo-_Ms7M';
const appSecret = '04a08800d54f47b2acab585d66a30608';
const baseUrl = 'https://baas.kinvey.com'
const postNewUrl = `https://baas.kinvey.com/appdata/${appKey}/news`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
@Injectable()

export class NewsService {
    private newsSource = new Subject<NewInputModel[]>();
    public newsRecieved$ = this.newsSource.asObservable();

    constructor(private http: HttpClientService) {

    }

    postNew(data: NewInputModel): Observable<Object> {
        return this.http.post(postNewUrl,
            JSON.stringify(data),
            this.createAuthHeaders('Kinvey'))
    }

    getAllNews(): Observable<NewInputModel[]> {
        return this.http.get(baseUrl + `/appdata/${appKey}/news/?query={}&sort={"_kmd.ect": -1}`,
         this.createAuthHeaders('Kinvey'));
    }
    getSingleNew(id): Observable<NewInputModel> {
        return this.http.get(baseUrl + `/appdata/${appKey}/news/${id}`, 
        this.createAuthHeaders('Kinvey'));
    }

    deleteNew(id) {
        return this.http.delete(baseUrl + `/appdata/${appKey}/news`,
         id, 
         this.createAuthHeaders('Kinvey'))
    }
    editNew(id, data) {
        return this.http.put(`${postNewUrl}/${id}`,
            JSON.stringify(data),
            this.createAuthHeaders('Kinvey'))
    }
    searchNews(query){
        return this.http.get(baseUrl + `/appdata/${appKey}/news/?query={"title":"${query}"}`,
        this.createAuthHeaders('Kinvey'));
    }
    isCreator(postCreator){
        return localStorage.getItem('username')===postCreator;
    }
    updateNews(data){
        this.newsSource.next(data);
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