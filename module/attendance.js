/* attendance.js module */

export class Attendance {
    constructor() {
        this.course = [];
        this.picture = [];
        this.subject = [];
        this.classroom = [];
        this.teacher = [];
        this.url = [];
    }

    add(course0, picture0, subject0, classroom0, teacher0, url0) {
        this.course.push(course0);
        this.picture.push(picture0);
        this.subject.push(subject0);
        this.classroom.push(classroom0);
        this.teacher.push(teacher0);
        this.url.push(url0);
    }

    get to_card() {
        let templates = [];
        for (let i = 0; i < this.course.length; i++) {
            let imgLink = `<img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">`;
            let strLink = `${this.subject[i]}`;
            if (this.url[i] != "") {
                strLink = 
                `<a href=${this.url[i]} target="_blank" class="link-offset-2 link-underline link-underline-opacity-0">
                    ${this.subject[i]}
                </a>`;
                imgLink = 
                `<a href=${this.url[i]} target="_blank">
                    <img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">
                </a>`;
            }
            let clsLink = `${this.classroom[i]}`;
            if (this.classroom[i] == "教室一覧") {
                clsLink =
                `<a href="#" data-bs-target="#modalPractice" data-bs-toggle="modal" class="text-dark link-offset-2 link-underline link-underline-opacity-0">
                    ${this.classroom[i]}
                </a>`;
            }
            templates.push(
                `<h3>
                    ・${this.course[i]}
                </h3>
                <div class="card">
                    ${imgLink}
                    <div class="card-body">
                        <h4 class="card-title text-center middle-text stretch">
                            ${strLink}
                        </h4>
                        <div class="card-text row justify-content-evenly">
                            <div class="col-5 text-center">${clsLink}</div>
                            |
                            <div class="col-5 text-center">${this.teacher[i]}</div>
                        </div>
                    </div>
                </div>
                <br>`
            );
        }
        return templates;
    }
}