// import { randomChoose } from "../../helpers";

// A mock function to mimic making an async request for data
export function fetchStatus(response = "accepted") {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: response }), 500)
  );
}


function simulateAsyncCall(request) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = request.map((item) => {
        if (randomChoose) {
          resolve({ status: 200, status: "sold" });
        } else {
          resolve({ status: 404, message: 'Canceled' });
        }
        console.log("simulateAsyncCall", success);
        return success;
    })
  })
})}

function randomChoose () {

  const helper = Math.random().toFixed(1) * 10;

  if (helper < 5) {
    return true;
  }

  return false;
}