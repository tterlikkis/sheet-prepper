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

    constructor(index: number) {
        this.index = index;
    }
}