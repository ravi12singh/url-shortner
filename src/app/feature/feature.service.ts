import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class FeatureService {

    constructor(private http: HttpClient) {
    }

    postLongUrl(full: string, shortKey: string) {
        return new Observable(observer => {
            this.http.post(`/api/shortenUrl`, {full: full, short: shortKey}).subscribe(
                (data: any) => {
                    observer.next(data);
                },
                err => {
                    observer.error(err);
                }
            );
        });
    }

    getNewUrl(key: string) {
        return new Observable(observer => {
            this.http.get(`/api/shortUrls?short=${key}`).subscribe(
                (data: any) => {
                    observer.next(data);
                },
                err => {
                    observer.error(err);
                }
            );
        });
    }
}

