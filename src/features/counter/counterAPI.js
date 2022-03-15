import { randomChoose } from "../../helpers";


export async function simulateAsyncCall(request) {
  const resultPromises = request.map(
    (item) => {
      const resultPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (randomChoose()) {
            resolve({ status: 200, message: "success", id: item.id });
          } else {
            resolve({ status: 404, message: "cancel", id: item.id });
          }
        }, 1500);
      });
      return resultPromise;
    })

  const response = Promise.allSettled(resultPromises).then(
    (results) => results.map(
      (result) => result.value));
  return response;
}
