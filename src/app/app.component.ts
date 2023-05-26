import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { DateData } from "./shared/datetype";
import { SettingsData } from "./shared/settingstype";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: []
})
export class AppComponent {

  greetingMessage = "";

  dates: Array<DateData>;

  message = "";
  setMessage = (message: typeof this.message) => this.message = message;

  start = 1;
  setStart = (start: typeof this.start) => this.start = start;

  settings!: SettingsData;
  setSettingsData = (settings: typeof this.settings) => this.settings = settings;

  showModal = false;
  setModal = (showModal: typeof this.showModal) => this.showModal = showModal;
  
  showErrorModal = false;
  setErrorModal = (showErrorModal: typeof this.showErrorModal) => this.showErrorModal = showErrorModal;

  showSettingsModal = false;
  setSettingsModal = (showSettingsModal: typeof this.showSettingsModal) => this.showSettingsModal = showSettingsModal;

  constructor() {
    this.dates = [new DateData()];
    this.grabSettings();
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

  updateStart = (start: number) => {
    this.setStart(start);
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
        this.setMessage(error as string);
        this.toggleErrorModal();
      });
  }

  toggleModal = () => {
    this.setModal(!this.showModal);
  }

  toggleErrorModal = () => {
    this.setErrorModal(!this.showErrorModal);
    if (!this.showErrorModal) {
      this.setMessage("");
    }
  }

  toggleSettingsModal = () => {
    this.setSettingsModal(!this.showSettingsModal);
    if (!this.showSettingsModal) {
      this.setMessage("");
    }
  }

  open = () => {
    invoke("open")
      .catch((error) => {
        this.setMessage(error as string);
        this.toggleErrorModal();
    });
  }

  grabSettings = () => {
    let temp: SettingsData = {
      path: "",
      dogCh: "",
      horseCh: "",
      birdCh: "",
      doubleCh: "",
      numberSpace: true
    }
    invoke<SettingsData>("read")
      .then((data) => this.setSettingsData(data))
      .catch((error) => {
        this.setSettingsData(temp);
        this.setMessage(error as string);
        this.toggleErrorModal(); // Don't use toggle function as it will delete message
    });
  }

  saveSettings = (data: SettingsData) => {
    invoke("write", { data })
      .then(() => this.toggleSettingsModal())
      .catch((error) => {
        console.log("Received error.");
        this.setMessage(error as string);
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
