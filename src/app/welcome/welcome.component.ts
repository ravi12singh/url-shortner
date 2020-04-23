import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeatureService} from '../feature/feature.service';
import * as shortId from 'shortid';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    providers: [FeatureService]
})
export class WelcomeComponent implements OnInit {
    urlForm: FormGroup;
    hostName = 'http://localhost:4200/';
    urlArr: any;
    shortKey: string;
    validURL: string;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private featureService: FeatureService) {
    }

    ngOnInit() {
        this.urlArr = [];
        this.urlForm = this.formBuilder.group({
            urlString: ['', Validators.required],
        });
    }

    get f() {
        return this.urlForm.controls;
    }

    onSubmit() {
        this.validURL = '';
        this.submitted = true;
        if (this.urlForm.invalid) {
            return;
        } else {
            if (ClassWithStaticMethod.validateuUrl(this.urlForm.value.urlString) === true) {
                this.shortKey = shortId.generate();
                this.featureService.postLongUrl(this.urlForm.value.urlString, this.shortKey).subscribe(
                    (data: any) => {
                        if (data.status === 'Success') {
                            this.urlArr.push(data.data);
                        } else {
                            this.validURL = data.message;
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                this.validURL = 'Please Provide a Valid URL';
            }
        }
    }

    redirect(urlKey: string) {
        this.urlArr = [];
        this.featureService.getNewUrl(urlKey).subscribe(
            (data: any) => {
                if (data.Status === 'Success') {
                    this.urlArr.push(data.data);
                    window.open(data.data.full, '_blank');
                }
            },
            error => {
                console.error(error);
            }
        );
    }
}
class ClassWithStaticMethod {
    static validateuUrl(value: string) {
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const regexp = new RegExp(expression);
        return regexp.test(value);
    }
}
