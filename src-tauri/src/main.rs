
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::OpenOptions;
use std::{fs::File, io::BufReader};
use std::io::prelude::*;
use std::path::Path;
use std::process::Command;
use sysinfo::{ProcessExt, System, SystemExt};
use serde::{Serialize, Deserialize};
use tauri::regex::Regex;
use rust_xlsxwriter::{Format, Workbook};

#[derive(Serialize, Deserialize, Debug)]
struct DateData {
    date: String,
    dogs: String,
    horses: String,
    birds: String,
    doubles: String,
    missing: String,
    retests: bool
}

#[derive(Serialize, Deserialize, Debug)]
struct SettingsData {
    path: String,
    dogCh: String,
    horseCh: String,
    birdCh: String,
    doubleCh: String,
    numberSpace: bool
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read() -> Result<SettingsData, String> {
    let mut result = SettingsData {
        path: String::from(""),
        dogCh: String::from(""),
        horseCh: String::from(""),
        birdCh: String::from(""),
        doubleCh: String::from(""),
        numberSpace: false
    };

    let file = File::open("./config.txt").unwrap();
    let reader = BufReader::new(file);
    let mut lines = reader.lines();

    result.path = lines.next().unwrap().unwrap();
    result.dogCh = lines.next().unwrap().unwrap();
    result.horseCh = lines.next().unwrap().unwrap();
    result.birdCh = lines.next().unwrap().unwrap();
    result.doubleCh = lines.next().unwrap().unwrap();
    result.numberSpace = lines.next().unwrap().unwrap() == "true";

    return Ok(result);    
}

#[tauri::command]
fn write(data: SettingsData) -> Result<(), String> {

    let mut file = OpenOptions::new().write(true).open("./config.txt").unwrap();
    let mut results = vec![];

    results.push(file.write_all(data.path.as_bytes()));
    results.push(file.write_all(b"\n"));
    results.push(file.write_all(data.dogCh.as_bytes()));
    results.push(file.write_all(b"\n"));
    results.push(file.write_all(data.horseCh.as_bytes()));
    results.push(file.write_all(b"\n"));
    results.push(file.write_all(data.birdCh.as_bytes()));
    results.push(file.write_all(b"\n"));
    results.push(file.write_all(data.doubleCh.as_bytes()));
    results.push(file.write_all(b"\n"));
    results.push(file.write_all(b"true"));

    for res in results {
        if res.is_err() {
            return Err("Error writing to config file".to_string());
        }
    }

    return Ok(());
}

#[tauri::command]
fn open() -> Result<(), String> {
    let path = "./Tubes.xlsx";

    let settings = read().unwrap();

    for _process in System::new_all().processes_by_name("excel.exe") {
        return Err("Please close Tubes.xlsx".to_string());
    }

    let output = Command::new(settings.path).arg(path).spawn();

    if output.is_err() {
        return Err("Error opening Excel, make sure to set the Excel path in settings.".to_string());
    }

    return Ok(());
}

#[tauri::command]
fn submit(mut start: i32, data: Vec<DateData>) -> Result<(), String> {

    let mut workbook = Workbook::new();
    let date_format = Format::new().set_num_format("mm/dd");
    let worksheet = workbook.add_worksheet();

    // Easiest way to add leading space fml
    let mut settings = read().unwrap();

    let mut row = 0;
    for datedata in data {



        if !date_valid(&datedata.date) {
            return Err("Invalid date".to_string());
        }

        let missing = de_range(&datedata.missing)?;
        let doubles = de_range(&datedata.doubles)?;

        let raw = de_range(&datedata.dogs)?;
        let dogs: Vec<i32> = raw.iter().filter(|num| 
            !missing.contains(&(*num))).cloned().collect::<Vec<i32>>();

        let raw = de_range(&datedata.horses)?;
        let horses: Vec<i32> = raw.iter().filter(|num|
            !missing.contains(&(*num))).cloned().collect::<Vec<i32>>();

        let raw = de_range(&datedata.birds)?;
        let birds: Vec<i32> = raw.iter().filter(|num|
            !missing.contains(&(*num))).cloned().collect::<Vec<i32>>();

        let mut dog_ch = settings.dogCh.clone();
        dog_ch.insert(0, ' ');
        if datedata.retests { dog_ch.push('R'); }

        for tube in dogs {
            worksheet.write(row, 0, start).unwrap();
            worksheet.write(row, 1, &dog_ch).unwrap();
            worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
            worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
            row += 1;
            start += 1;
        }

        let mut horse_ch = settings.horseCh.clone();
        horse_ch.insert(0, ' ');
        if datedata.retests { horse_ch.push('R'); }

        for tube in horses {
            worksheet.write(row, 0, start).unwrap();
            worksheet.write(row, 1, &horse_ch).unwrap();
            worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
            worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
            row += 1;
            start += 1;
        }

        let mut bird_ch = settings.birdCh.clone();
        bird_ch.insert(0, ' ');
        if datedata.retests { bird_ch.push('R'); }

        let mut double_ch = settings.doubleCh.clone();
        double_ch.insert(0, ' ');
        if datedata.retests { double_ch.push('R')}

        for tube in birds {
            worksheet.write(row, 0, start).unwrap();
            worksheet.write(row, 1, &settings.birdCh).unwrap();
            worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
            worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
            row += 1;
            start += 1;

            if doubles.contains(&tube) {
                worksheet.write(row, 0, start).unwrap();
                worksheet.write(row, 1, &settings.doubleCh).unwrap();
                worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
                worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
                row += 1;
                start += 1;
            }
        }
    }

    workbook.save("Tubes.xlsx").unwrap();

    Ok(())
}


fn de_range(range: &String) -> Result<Vec<i32>, String> {

    if range == "" {
        return Ok(Vec::new());
    }

    if !range_valid(range) {
        return Err("Invalid syntax".to_string());
    }

    let mut vals: Vec<i32> = Vec::new();
    let ranges: Vec<&str> = range.split(['+', ',']).collect();

    for ran in ranges {
        let endpoints: Vec<i32> = ran.split('-').map(|x| x.parse::<i32>().unwrap()).collect();

        // Single value
        if endpoints.len() == 1 {
            vals.push(endpoints[0]);
            continue;
        }
        
        // Range
        if endpoints[0] > endpoints[1] {
            return Err(format!("Invalid range, beginning {} is greater than ending {}", endpoints[0], endpoints[1]));
        }

        for i in endpoints[0]..endpoints[1]+1 {
            vals.push(i);
        }

    }

    return Ok(vals);
}

fn range_valid(range: &String) -> bool {
    if range == "" { return true; }

    let pattern = Regex::new(r"^(\d+|\d+-\d+)(?:[+\s,](\d+|\d+-\d+))*$").unwrap();
    return pattern.is_match(range);
}

fn date_valid(date: &String) -> bool {
    let pattern = Regex::new(r"^[0-9]+\/[0-9]+$").unwrap();
    return pattern.is_match(date);
}

fn main() {
    if !Path::new("./config.txt").exists() {
        let mut file = File::create("config.txt").unwrap();
        file.write_all(b"C:\\Program Files\\Microsoft Office\\root\\Office16\\excel.exe\n").unwrap();
        file.write_all(b"C\n").unwrap();
        file.write_all(b"E\n").unwrap();
        file.write_all(b"A\n").unwrap();
        file.write_all(b"AS\n").unwrap();
        file.write_all(b"true").unwrap();

    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, submit, open, read, write])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
