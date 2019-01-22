import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "20s", target: 100 },
    { duration: "1m", target: 2200  },
    { duration: "1m", target: 2200  },
    { duration: "20s", target: 100  },
  ]
  // vus: 100,
  // duration: "30s",
};



let id = Math.floor((Math.random() * 10000000) + 1);

export default function() {
  let res = http.get(`http://localhost:1337/products/pg/id/${id}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  http.get(`http://localhost:1337/products/pg/id/${id}`);
  // http.get(`http://localhost:1337/related/pg/id/${id}`);
  // http.get(`http://localhost:1337/frequent/pg/id/${id}`);
  sleep(0.01);
};