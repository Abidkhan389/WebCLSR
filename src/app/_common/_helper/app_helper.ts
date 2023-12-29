import { DatePipe } from "@angular/common";
import { Renderer2 } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DAYS_OF_WEEK } from "angular-calendar";
import { showErrorMessage } from "../messages";

export class Helpers {
    constructor(private renderer: Renderer2) { }

    public static trimObject(item: any) {
        if (item)
            for (var key in item) {
                if ((typeof item[key] === 'string' || item[key] instanceof String) && (item[key] != null && item[key]) && (key != 'currentPassword'))
                    item[key] = item[key].trim();
                else if (item[key] instanceof Array && item[key] != null && item[key]) {
                    var arr = item[key];
                    for (var key1 in arr) {
                        var obj = arr[key1];
                        if (obj instanceof Object) {
                            for (var key2 in obj) {
                                if ((typeof obj[key2] === 'string' || obj[key2] instanceof String) && (obj[key2] != null && obj[key2]) && (key != 'currentPassword'))
                                    obj[key2] = obj[key2].trim();
                            }
                        }
                    }
                }
            }
        return item;
    }

    public static getMinDate(value): NgbDateStruct {
    
        let currentDate = new Date();
        let date: NgbDateStruct = {
            year: currentDate.getFullYear() - value,
            month: 1,
            day: 1
        }
        return date;
    }

    public static ngbDateStructToDate(date: NgbDateStruct) {
        if (date)
            return new Date(date.year, date.month - 1, date.day);
    }

    public static insertSlashInDate(control) {
        var str: string = control ? control.value : null;
        if (str) {
            let re = /^(?:(0[1-9]|[12][0-9]|3[01])[\- \/.](0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/;
            str = str.replace(/\s+/g, '');
            var date: string;
            var lenw = str.split('/');
            if (lenw.length == 1) {
                var res = str.split('');
                if (res.length == 8) {
                    date = res[0] + res[1] + '/' + res[2] + res[3] + '/' + res[4] + res[5] + res[6] + res[7];
                }
            } else if (lenw.length == 2) {
                if (lenw[0].length == 2) {
                    var res = lenw[1].split('');
                    date = lenw[0] + '/' + res[0] + res[1] + '/' + res[2] + res[3] + res[4] + res[5];
                }
                else if (lenw[0].length == 4) {
                    var res = lenw[0].split('');
                    date = res[0] + res[1] + '/' + res[2] + res[3] + '/' + lenw[1];
                }
            }
            if (date && date.match(re)) {
                return date;
            }
        }
        return null;
    }

    public static getMaxDate(value): NgbDateStruct {
        
        let currentDate = new Date();
        let date: NgbDateStruct = {
            year: currentDate.getFullYear() - value,
            month: 12,
            day: 31
        }
        return date;
    }

    public static newGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static toggleButton($event) {
        let classToToggle: string = 'active';
        $event.target.parentElement.parentElement.children[0].classList.remove(classToToggle);
        $event.target.parentElement.parentElement.children[1].classList.remove(classToToggle);
        $event.target.parentElement.classList.add(classToToggle);
    }

    public static dateToNgbDateStruct(date: any): NgbDateStruct {
        let pipe = new DatePipe('en-US');
        let d = new Date(date);
        let value = pipe.transform(d, 'dd/MM/yyyy');
        var adata = value.split('/');
        var mm = parseInt(adata[1], 10);
        var dd = parseInt(adata[0], 10);
        var yyyy = parseInt(adata[2], 10);
        return {
            year: yyyy,
            month: mm,
            day: dd
        }
    }

    public static isDefaultAvatar(image: string) {
        let img: string = '../../../../../../../assets/images/avatar.png';
        if (image != null && image != "null" && image != "" && image != undefined && image != "undefined")
            img = image
        return img;
    }

    public static isDefaultPicture(image: string) {
        let img: string = '../../../../../../../assets/img/logos/placeholder.png';
        if (image != null && image != "null" && image != "" && image != undefined && image != "undefined")
            img = image
        return img;
    }

    public static validateExtension(fileName, allowedFileTypes) {
        allowedFileTypes = allowedFileTypes.replace(/\s+/g, '');
        if (allowedFileTypes != "*") {
            var allowedFiles = allowedFileTypes.split(',');
            var regex = new RegExp("(^.*\.)+(" + allowedFiles.join('|') + ")$");
            if (!regex.test(fileName.toLowerCase())) {
                showErrorMessage("Please upload files having extensions: " + allowedFiles.join(', ') + " only.");
                return false;
            }
        }
        return true;
    }

    public static formatBytes(bytes, limit) {
        let mb = (Math.round(((bytes / 1024) / 1024) * 100) / 100);
        if (mb > limit) {
           showErrorMessage("Image size can not be more than " + limit + " MB.");
            return false;
        }
        return true;
    };

    public static textEllipsis(value, limit) {
        if (value.length > limit)
            return value.substring(0, limit) + '...';
        else
            return value;
    };

    public static playAudio() {
        let audio = document.getElementById("chatAudio") as HTMLAudioElement;
        audio.play();
    }

    public static searchParams(model: any) {
        let arr = [];
        for (let key in model)
            if (model[key])
                arr.push(key + '*' + model[key]);
        return arr.join('+');
    }

    public static enumToArray(e): Object[] {
        return Object.keys(e).filter(key => typeof e[key] === 'number')
            .map(key => ({ id: e[key], name: key.replace(/_/g, ' ') }))
    }

    public static enumStringToArray(e): Object[] {
        return Object.keys(e).filter(key => typeof e[key] === 'string')
            .map(key => ({ id: key.replace(/_/g, ' '), name: e[key] }))
    }

    public static currencyFormat(value) {
        if (value) {
            return parseInt(value.replace(/,/g, ""))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // return parseFloat(value.replace(/,/g, ""))
            //     .toFixed(2)
            //     .toString()
            //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else
            return ''

    }

    public static calculateValue(value, item, units) {
        let obj = item;
        let unit = units
        if (unit && unit != "null") {
            let marla = (value / unit);
            let kanal = (marla / 20);
            obj.marla = marla.toFixed(2).toString();
            obj.kanal = kanal.toFixed(2).toString();
            return obj;
        } else
            return obj;

    }

    public static removeValidators(form: FormGroup, controlArr) {
        for (var value of controlArr) {
            form.controls[value.controlName].clearValidators();
            form.controls[value.controlName].updateValueAndValidity();
        }
    }

    public static addValidators(form: FormGroup, controlArr) {
        for (var value of controlArr) {
            form.controls[value.controlName].setValidators(value.controlValidatoion);
            form.controls[value.controlName].updateValueAndValidity();
        }
    }

    public static removeCtrlValidators(form: FormGroup, formCtrl) {
        form.controls[formCtrl].clearValidators();
        form.controls[formCtrl].updateValueAndValidity();

    }

    public static addCtrlValidators(form: FormGroup, formCtrl, valdation) {

        form.controls[formCtrl].setValidators(valdation);
        form.controls[formCtrl].updateValueAndValidity();

    }

    public static dateFormatforfilter(date) {
        if (date) {
            var lenw = date.split('/');
            if (lenw.length == 1) {
                var res = date.split('');
                if (res.length == 8) {
                    date = res[4] + res[5] + res[6] + res[7] + '-' + res[2] + res[3] + '-' + res[0] + res[1];
                    return date;
                }
            }
        }
        else
            return date;
    }

    public static getDaysBetweenDates(start, end, dayName) {
        var result = [];
        let day: number = parseInt(DAYS_OF_WEEK[dayName.toUpperCase()]);
        // Copy start date
        var current = new Date(start);
        // Shift to next of required days
        current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
        // While less than end date, add dates to result array
        while (current < new Date(end)) {
            result.push(new Date(+current));
            current.setDate(current.getDate() + 7);
        }
        return result;
    }

    public static getHodlidaysBetweenDates(start, end, days) {
        var result = [];
        days.forEach((dayName) => {
            let day: number = parseInt(DAYS_OF_WEEK[dayName.toUpperCase()]);
            // Copy start date
            var current = new Date(start);
            // Shift to next of required days
            current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
            // While less than end date, add dates to result array
            while (current < new Date(end)) {
                let date = new Date(+current)
                result.push(Helpers.dateToNgbDateStruct(date));
                current.setDate(current.getDate() + 7);
            }
        });

        return result;
    }

    static getvalidDate = function (d) { return new Date(d) }

    public static validateDateBetweenTwoDates(fromDate, toDate, givenDate) {
        return this.getvalidDate(givenDate) <= this.getvalidDate(toDate) && this.getvalidDate(givenDate) >= this.getvalidDate(fromDate);
    }
}

