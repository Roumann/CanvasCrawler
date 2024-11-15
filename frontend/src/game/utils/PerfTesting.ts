// function measureExecutionTime(fn: () => void, iterations: number = 1): number {
//   const start = performance.now();

//   // Run the function multiple times to get a more stable measurement.
//   for (let i = 0; i < iterations; i++) {
//     fn();
//   }

//   const end = performance.now();
//   return (end - start) / iterations; // Average time per execution
// }

// function compareFunctions(
//   fn1: () => void,
//   fn2: () => void,
//   iterations: number = 1000
// ): void {
//   const time1 = measureExecutionTime(fn1, iterations);
//   const time2 = measureExecutionTime(fn2, iterations);

//   console.log(`Function 1 average execution time: ${time1} ms`);
//   console.log(`Function 2 average execution time: ${time2} ms`);

//   console.log(`Difference: ${time1 - time2} ms`);

//   if (time1 < time2) {
//     console.log("Function 1 is faster.");
//   } else if (time1 > time2) {
//     console.log("Function 2 is faster.");
//   } else {
//     console.log("Both functions have similar performance.");
//   }
// }

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowLeft") {
//     compareFunctions(
//       () => overworld.entityManager.getEntityByTag("projectile"),
//       () => overworld.entityManager.getEntityByTag2("projectile")
//     );
//   }
// });
