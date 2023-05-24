
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

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
    missing: String
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open() -> Result<(), String> {
    let path = "./Tubes.xlsx";

    let output = Command::new("C:\\Program Files\\Microsoft Office\\root\\Office16\\excel.exe")
        .arg(path).output();

    if output.is_err() {
        return Err("Please close Tubes.xlsx".to_string());
    }

    return Ok(());
}

#[tauri::command]
fn submit(mut start: i32, data: Vec<DateData>) -> Result<(), String> {
    println!("Start: {}\nData: {:?}", start, data);

    let mut workbook = Workbook::new();
    let date_format = Format::new().set_num_format("mm/dd");
    let worksheet = workbook.add_worksheet();

    let mut row = 0;
    for datedata in data {

        println!("{:?}", datedata);

        if !date_valid(&datedata.date) {
            return Err("Invalid date".to_string());
        }

        let missing = de_range(&datedata.missing)?;
        let doubles = de_range(&datedata.doubles)?;

        let raw = de_range(&datedata.dogs)?;
        let dogs: Vec<i32> = raw.iter().filter(|num| 
            !missing.contains(&(*num))).cloned().collect::<Vec<i32>>();

        println!("dogs {:?}", dogs);

        let raw = de_range(&datedata.horses)?;
        let horses: Vec<i32> = raw.iter().filter(|num|
            !missing.contains(&(*num))).cloned().collect::<Vec<i32>>();

        println!("horses {:?}", horses);

        let raw = de_range(&datedata.birds)?;
        let birds: Vec<i32> = raw.iter().filter(|num|
            !missing.contains(&(*num))).cloned().collect::<Vec<i32>>();

        println!("birds {:?}", birds);

        for tube in dogs {
            worksheet.write(row, 0, start).unwrap();
            worksheet.write(row, 1, " C").unwrap();
            worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
            worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
            row += 1;
            start += 1;
            println!("{} {} {} {}", start, " C", tube, datedata.date);
        }

        for tube in horses {
            worksheet.write(row, 0, start).unwrap();
            worksheet.write(row, 1, " E").unwrap();
            worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
            worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
            row += 1;
            start += 1;
            println!("{} {} {} {}", start, " E", tube, datedata.date);
        }

        for tube in birds {
            worksheet.write(row, 0, start).unwrap();
            worksheet.write(row, 1, " A").unwrap();
            worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
            worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
            row += 1;
            start += 1;
            println!("{} {} {} {}", start, " A", tube, datedata.date);

            if doubles.contains(&tube) {
                worksheet.write(row, 0, start).unwrap();
                worksheet.write(row, 1, "AS").unwrap();
                worksheet.write(row, 2, if tube < 1000 {format!(" {}", tube)} else {tube.to_string()}).unwrap();
                worksheet.write_with_format(row, 3, &datedata.date, &date_format).unwrap();
                row += 1;
                start += 1;
                println!("{} {} {} {}", start, "AS", tube, datedata.date);
            }
        }
    }

    workbook.save("Tubes.xlsx").unwrap();

    println!("Saved");

    Ok(())
}


fn de_range(range: &String) -> Result<Vec<i32>, String> {

    if range == "" {
        return Ok(Vec::new());
    }

    if !range_valid(range) {
        println!("Invalid syntax");
        return Err("Invalid syntax".to_string());
    }

    let mut vals: Vec<i32> = Vec::new();
    let ranges: Vec<&str> = range.split(['+', ',']).collect();

    for ran in ranges {
        let endpoints: Vec<i32> = ran.split('-').map(|x| x.parse::<i32>().unwrap()).collect();

        if endpoints.len() == 1 {
            vals.push(endpoints[0]);
            continue;
        }
        
        if endpoints[0] > endpoints[1] {
            println!("Invalid range, beginning {} is greater than ending {}", endpoints[0], endpoints[1]);
            return Err(format!("Invalid range, beginning {} is greater than ending {}", endpoints[0], endpoints[1]));
        }

        for i in endpoints[0]..endpoints[1]+1 {
            vals.push(i);
        }

    }

    println!("de_range vals {:?}", vals);

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
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, submit, open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
