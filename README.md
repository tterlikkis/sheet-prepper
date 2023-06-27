# Sheet Prepper

## Dependencies

Rust 1.69    - https://www.rust-lang.org/tools/install  
nodejs 18.16 - https://nodejs.org/en/download

## Installation

Open a terminal in cloned directory and run  
```npm install``` followed by ```npm run tauri build```  
  
A windows installer will then be located in src-tauri/target/release/bundle/msi  
For non-windows users please use the setup exe in src-tauri/target/release/bundle/nsis  
  
Requires a Microsoft Excel installation.  
Be sure to specify path to Excel.exe in settings.
