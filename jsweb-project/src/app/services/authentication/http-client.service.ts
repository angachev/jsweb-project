import {Injectable} from "@angular/core"
import {HttpClient,HttpHeaders} from '@angular/common/http'


import {catchError} from 'rxjs/operators'
import{Observable} from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from "@angular/core/src/application_tokens";
import 'rxjs/add/observable/throw';


@Injectable()
export class HttpClientService{
   
    constructor(
        private http:HttpClient
    ){

    }

    get<T>(url:string,headers:HttpHeaders){
        return this.http.get<T>(url,{headers})
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
        return this.http.put<T>(url,body,{headers})
        .pipe(
            catchError(err=>this.handleError(err))
        );
    }

    delete<T>(url:string,id:number,headers:HttpHeaders){
        return this.http.delete<T>(`${url}/${id}/?hard=true`,{headers})
        .pipe(
            catchError(err=>this.handleError(err))
        );
    }

   



    private handleError(err: any){
        return Observable.throw(new Error(err.message))
    }
}