import { randomChoose } from "../../helpers";

// A mock function to mimic making an async request for data
export function fetchStatus(response = "accepted") {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: response }), 500)
  );
}

async function isAccepted() {
 let res = await randomChoose();
 console.log(res);
}
