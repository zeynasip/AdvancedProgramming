class Course{
    constructor(name, time, date, rooms = []){
        this.nm = name;
        this.time = time;
        this.date = date;
        this.rooms = rooms;
    }
    toString() {
        return this.nm;
    }
}

class Student{
    constructor(id, name, gpa, courses = []){
        this.id = id;
        this.nm = name;
        this.gpa = gpa;
        this.courses = courses;     
    }
    toString() {
        return this.id;
    }
}

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

class Point3D extends Point{
    constructor(x, y, z){
        super(x, y);
        this.z = z;
    }
    toString() {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }
}

class Distance{
    constructor(km = 0) {
        this.km = Math.round(km);
    }
    get miles() {
        return Math.round(this.miles * 1.6);
    }
    set miles(value = 0) {
        this.km = Math.round(value / 1.6);
    }
    toString() {
        return this.km + " km";
    }
    static fromMiles(value) {
        let t = new Distance();
        t.miles = value;
        return t;
  }
}


