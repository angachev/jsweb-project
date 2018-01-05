import {Injectable} from "@angular/core"
import {HttpClient,HttpHeaders} from '@angular/common/http'

import {catchError} from 'rxjs/operators'
import{Observable} from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from "@angular/core/src/application_tokens";


@Injectable()
export class HttpClientService{
   
    constructor(
        private http:HttpClient
    ){

    }

    get<T>(url:string){
        return this.http.get<T>(url)
        .pipe(
            catchError(err=>this.handleError(err))
        );
    }

    post<T>(url:string,body :any,headers:HttpHeaders){
        return this.http.post<T>(url,body,{headers})
        .pipe(
            catchError(err=>this.handleError(err))
        );
    }

    put<T>(url:string,body :any,headers:HttpHeaders){
        return this.http.post<T>(url,body,{headers})
        .pipe(
            catchError(err=>this.handleError(err))
        );
    }

    delete<T>(url:string,id:number,headers:HttpHeaders){
        return this.http.delete<T>(`${url}/${id}`,{headers})
        .pipe(
            catchError(err=>this.handleError(err))
        );
    }

   



    private handleError(err: any){
        return Observable.throw(new Error(err.message))
    }
}