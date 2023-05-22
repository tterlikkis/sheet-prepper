import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DateStrings } from "src/shared/datestrings";

@Injectable({
    providedIn: "root"
})
export class DataService {

    keyval = 0;

    private datesSource = new Subject<Map<number, DateStrings>>();
    public dates$ = this.datesSource.asObservable();

    dates: Map<number, DateStrings> = new Map();

    constructor() { this.addDate() }

    addDate = () => {
        if (this.dates.size >= 10) {
            alert("Max of 10 dates.");
            return;
        }
      
        let blankdate: DateStrings = {
            date: "",
            dogs: "",
            horses: "",
            birds: "",
            doubles: "",
            missing: ""
        };

        this.dates.set(this.keyval, blankdate);
        this.keyval++;
    }

    // Change the value of specified field in date object at key
    changeDate = (key: number, field: string, value: string) => {
        if (!this.dates.has(key)) return;
        
        let newdate: DateStrings = { ...this.dates.get(key)!, [field]: value };
        this.dates.set(key, newdate);
        console.log(this.dates);
    }

    removeDate = (key: number) => {
        if (!this.dates.has(key)) return;

        this.dates.delete(key);
    }

    // Returns the value of a single field
    getField = (key: number, field: string): string => {
        return this.dates.get(key)![field as keyof DateStrings];
    }

    // Debugging only
    logDates = () => {
        console.log(this.dates);
    }
    
}