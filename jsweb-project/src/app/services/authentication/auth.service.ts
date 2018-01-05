import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";
import { HttpClientService } from "./http-client.service";
import { HttpHeaders } from '@angular/common/http'

//Models
import { LoginInputModel } from "../../models/input-models/login-input.model";
import { RegisterInputModel } from "../../models/input-models/register-input.model";


const appKey = 'kid_Syo-_Ms7M';
const appSecret = '04a08800d54f47b2acab585d66a30608';
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;



@Injectable()

export class AuthService {
    private currentAuthtoken :string;

    constructor(private http: HttpClientService) {

    }
    login(data: LoginInputModel): Observable<Object> {
        return this.http.post(loginUrl,
            JSON.stringify(data),
            
            this.createAuthHeaders('Basic')
            
        )

    }

    register(data:RegisterInputModel): Observable<Object> {
        return this.http.post(registerUrl,
            JSON.stringify(data),
            this.createAuthHeaders('Basic'))

    }

    logout() {
        return this.http.post(
            logoutUrl,
            {},
            this.createAuthHeaders('Kinvey')
        
        )

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

    isLoggedIn() {
        let authtoken:string =localStorage.getItem('authtoken');
        return authtoken===this.currentAuthtoken;
    }

    get authtoken(){
        return this.currentAuthtoken;
    }

    set authtoken(value:string){
        this.currentAuthtoken=value;
    }


}
