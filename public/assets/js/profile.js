$(document).ready(function() {



  function printWorkout() {
    $.ajax({
      url: "api/workouts",
      method: "GET"
    }).then(function (results) {
      for (let i = results.length - 1; i < results.length; i++) {
        let dbData = results[i];
        console.log(dbData);
        const date = (dbData.date);
        console.log(date);
        $(".dateDiv").append(date);

        dbData.exercises.forEach(exercise => {
          console.log(exercise);
          let dbWo =
            `<div class="container-fluid text-center">
            <br>
          <div><h3>${exercise.muscle_group}</h3>
          <h4>${exercise.exercise_name}</h4>
          </div>`;
          
          exercise.sets.forEach(set => {
            dbWo += `${set.reps} reps x ${set.weight} lbs<br></div>`
          });
          $(".center-div").append(dbWo);
        })
      }
    })
  }

  printWorkout();

})