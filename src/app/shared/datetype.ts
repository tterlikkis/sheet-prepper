export class DateData {
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

    toJson = () => {
        return {
            date: this.date,
            dogs: this.dogs,
            horses: this.horses,
            birds: this.birds,
            doubles: this.doubles,
            missing: this.missing
        }
    }
}