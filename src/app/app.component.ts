import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { DateData } from "./shared/datetype";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: []
})
export class AppComponent {

  greetingMessage = "";

  message = "";

  dates: Array<DateData>;
  start = 1;
  setStart = (start: typeof this.start) => this.start = start;

  showModal = false;
  setModal = (showModal: typeof this.showModal) => this.showModal = showModal;
  
  showErrorModal = false;
  setErrorModal = (showErrorModal: typeof this.showErrorModal) => this.showErrorModal = showErrorModal;

  constructor() {
    this.dates = [new DateData()];
  }

  addDate = () => {
    this.dates.push(new DateData());
  }

  removeDate = (index: number) => {
    this.dates.splice(index, 1);
  }

  updateDate = (event: any) => {
    this.dates.splice(event.index, 1, event.data);
  }

  submit = () => {
    console.log(this.dates);
    console.log(this.start);

    let sendDates = new Array();
    for (let date of this.dates) {
      sendDates.push(date.toJson());
    }

    invoke("submit", {start: this.start, data: sendDates})
      .then(() => this.open())
      .catch((error) => {
        this.message = error;
        this.toggleErrorModal();
      });
  }

  toggleModal = () => {
    this.setModal(!this.showModal);
  }

  updateStart = (start: number) => {
    this.setStart(start);
  }

  toggleErrorModal = () => {
    this.setErrorModal(!this.showErrorModal);
    if (!this.showErrorModal) {
      this.message = "";
    }
  }

  open = () => {
    invoke("open").catch((error) => {
      this.message = error;
      this.toggleErrorModal();
    });
  }

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
