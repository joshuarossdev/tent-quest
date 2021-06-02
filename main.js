$(document).ready(initializeApp);

function initializeApp() {
  const bearing = generateRandomBearing();
  $(".bearing").after(bearing);
}

function generateRandomBearing() {
  const compassSectors = {
    north: true,
    northEast: true,
    east: true,
    southEast: true,
    south: true,
    southWest: true,
    west: true,
    northWest: true,
  }
  return Math.floor(Math.random() * 360);
}

// function testJquery() {
//   $("#test").remove();
//   console.log("testJquery");
// }
// $(document).ready(function(){
//   $("button").click(function(){
//     $("#div1").remove();
//   });
// });
