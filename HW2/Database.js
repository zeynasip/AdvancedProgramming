class Course{
    constructor(name, time, date){
        this.nm = name;
        this.time = time;
        this.date = date;
        this.rooms = [];
    }
}

class Student{
    constructor(id, name, gpa){
        this.id = id;
        this.nm = name;
        this.gpa = gpa;
        this.courses = [];     
    }
}

class Database{
    constructor(){
        this.mapStd = new Map();
        this.mapCrs = new Map();
    }
}

let data = new Database();

function readStudent() {
    const url1 = "https://maeyler.github.io/JS/data/Students.txt";
    fetch(url1)
        .then(r => r.text())
        .then(addStudents);
}

function readCourse() {
    const url2 = "https://maeyler.github.io/JS/data/Courses.txt";
        fetch(url2)
            .then(r => r.text())
            .then(addCourses);
}

function addStudents(txt){
    let a = txt.split("\n");
    for (let s of a) {
        let std = parseStudent(s);
        data.mapStd.set(std.id, std);
    }
}

function addCourses(txt){
    let a = txt.split("\n");
    for (let c of a) {
        let crs = parseCourse(c);
            data.mapCrs.set(crs.name, crs);
    }
}

function parseStudent(line) {
    let std = line.split("\t");
    let id = std[0], name = std[1], gpa = std[2];
    let list = [];
    for (let i = 3; i < std.length; i++) 
        list.push(std[i]);
    return {id, name, gpa, list};
}

function parseCourse(line) {
    let crs = line.split("\t");
    let name = crs[0] + crs[1], time = crs[2], date = crs[3];
    let list = [];
    for (let i = 3; i < crs.length; i++) 
        list.push(crs[i]);
    return {name, time, date, room, list};
}

function randomStudent() {
        let keys = Array.from(data.mapStd.keys());
        let i = keys[Math.trunc(keys.length * Math.random())];
        let b = data.mapStd.get(i);
        out.innerText = b.name + " " + b.id;
}

function findAboveGpa() {
        let list = "";
        let vals = Array.from(data.mapStd.values());
        for (let std of vals)
            if (std.gpa > ort.value) 
                list = list + std.name + "  " + std.id + "\n"; 
        out.innerText = list;        
}

function studentsCourses() {
        let l = "";
        let vals = Array.from(data.mapStd.values());
        for (let std of vals)
            if(std.id == std_id.value)        
                for(let crs of std.list)
                    l = l + crs + "\n"; 
        out.innerText = l;    
}

function findExams() {
    let list2 = "";
    let a = []; //courses of student
    let vals1 = Array.from(data.mapStd.values()); //students
    let vals2 = Array.from(data.mapCrs.values()); //courses
    for(let std of vals1)
        if(std.id == std_id.value)
            for(let crs of std.list)
                a.push(crs);
    //console.log(a);
    for(let c of vals2)
            for(let i = 0; i < a.length; i++)
                if(i == c.name)
                    list2 = list2 + c.name + "   " + c.date + "   " + c.time +  "\n";
    out.innerText = list2;    
}

function listStudents() {
    let lst = "";
    let vals = Array.from(data.mapStd.values());
    for (let std of vals)
        for(let crs of std.list)
            if(crs == crs_name.value)
                lst = lst + std.name + "    " + std.id + "\n";               
    out.innerText = lst;    
}

function findCourses() {
    let lst2 = "";
    let vals = Array.from(data.mapCrs.values());
    for (let crs of vals)
        for(let c of crs.list)
            if(c == room.value)
                lst2 = lst2 + crs.name + "\n";               
    out.innerText = lst2;  
}

function totalNoCourses() {
    let count = 0;
    let vals = Array.from(data.mapCrs.values());
    for (let crs of vals)
        for(let c of crs.list)
            if(c == room.value)
                count++;              
    out.innerText = "Total Number Of Courses: " + count;    
}
