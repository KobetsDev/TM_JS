import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 500, // Каждую секунду
    duration: '20s',
    // iterations: 1000,
}


export default function () {
    //   const data = {username: 'username', password: 'password'};
    // let res =
    // let res = http.get('http://localhost:8000/');
    let res = http.get('http://localhost:8000/test/');
    check(res, { '200 status code': (r) => r.status === 200 });
    // check(res, {
    //     'verify group name on page': (r) =>
    //         r.body.includes('21-ПИ-1'),
    // });
    // check(res, {
    //     'verify group name on page': (r) =>
    //         r.body.includes('world'),
    // });
    sleep(0.3);
}
// PS D: \Program Files\k6 > .\k6.exe run D: \w\Js_Lesson\timetable\test_k6\test.js