
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Serialize, Deserialize};
use serde_json::{Result, Value};
use tauri::regex::Regex;

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
fn submit(start: i32, data: Vec<DateData>) {
    println!("Start: {}\nData: {:?}", start, data);
    let s = String::from("1-10+12-15");
    println!("{:?}", de_range(&s));
}

fn de_range(range: &String) -> Vec<i32> {
    if !check_vaild(range) {
        println!("invalid range");
        return Vec::new();
    }

    let mut vals: Vec<i32> = Vec::new();
    let ranges: Vec<&str> = range.split(['+', ',']).collect();

    for ran in ranges {
        let endpoints: Vec<i32> = ran.split('-').map(|x| x.parse::<i32>().unwrap()).collect();
        if endpoints[0] > endpoints[1] {
            return Vec::new();
        }
        for i in endpoints[0]..endpoints[1] {
            vals.push(i);
        }

    }

    return vals;
}

fn check_vaild(range: &String) -> bool {
    let pattern = Regex::new(r"^\d+\s*-\s*\d+(?:\s*(?:,\s*|\+\s*)\d+\s*-\s*\d+)*$").unwrap();
    return pattern.is_match(range);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, submit])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
