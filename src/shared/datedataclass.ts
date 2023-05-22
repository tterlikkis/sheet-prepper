export class DateDataClass {
    index: number;
    setIndex = (index: typeof this.index) => this.index = index;
    
    date = "";
    setDate = (date: typeof this.date) => this.date = date;

    dogs = "";
    setDogs = (dogs: typeof this.dogs) => this.dogs = dogs;

    horses = "";
    setHorses = (horses: typeof this.horses) => this.horses = horses;

    birds = "";
    setBirds = (birds: typeof this.birds) => this.birds = birds;

    doubles = "";
    setDoubles = (doubles: typeof this.doubles) => this.doubles = doubles;

    missing = "";
    setMissing = (missing: typeof this.missing) => this.missing = missing;

<<<<<<<< HEAD:src/app/shared/datetype.ts
    toJson = () => {
        return {
            date: this.date,
            dogs: this.dogs,
            horses: this.horses,
            birds: this.birds,
            doubles: this.doubles,
            missing: this.missing
        }
========
    constructor(index: number) {
        this.index = index;
>>>>>>>> 9cc4acc82776f1d2fa33e0e53e9b7f2b3e624e90:src/shared/datedataclass.ts
    }
}