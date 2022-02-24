export function formatingTime (prop) {
  const totalSecondsPassed = prop;
  let totalMinutesPassed = Math.floor(totalSecondsPassed/60);
  let minutes = totalMinutesPassed % 60;
  let seconds = totalSecondsPassed % 60;

  return (prop === 0 
    ? 'Time is over!' 
    : `${minutes < 10  ? `0${minutes}` : minutes } : ${seconds < 10 ? `0${seconds}` : seconds}`);
}

// export function randomChoose () {
//   return new Promise(function (resolve, reject) {
//     setTimeout (function(){
//       const helper = Math.random().toFixed(1) * 10;

//       if (helper < 5) {
//         return resolve(true)
//       }

//       reject(false)

//    }, 1000);      
//   });
// }


function simulateAsyncCall(request) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const room = request;
        if (room) {
          resolve({ status: 200, posts: room.posts });
        } else {
          resolve({ status: 404, message: 'Canceled' });
        }
    })
  })
}

function randomChoose_1 () {

  const helper = Math.random().toFixed(1) * 10;

  if (helper < 5) {
    return true;
  }

  return false;
}

// const handleBookRoom = () => {
//   setArr(
//     arr.map(async (item) => {
//       if (item.status === "reserved") {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         const res = Math.random() < 0.5;
//         const id = item.id;
//         if (res) {
//           dispatch(setStatusBook({ id }));
//           item.status = "sold";
//           setReserved(reserved - 1);
//           item.count = 0;
//         } else {
//           dispatch(setStatusReserved({ id }));
//           item.status = "free";
//           setReserved(reserved - 1);
//           item.count = 0;
//         }
//       }
//       return item;
//     })
//   );
// };