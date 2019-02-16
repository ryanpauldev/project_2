
const $workoutForm = $("#workout-form");
    const $addExercise = $("#add-exercise");
    const $exerciseDiv = $(".exercise");

    $("#chest").hide();
    $("#back").hide();
    $("#shoulder").hide();
    $("#arm").hide();
    $("#leg").hide();
    $("#abdominal").hide();
  
    $(document).on("change", ".muscle-group", showExercise);
  function showExercise() {
    var $muscleGroup = $(this).val().trim();
    
    if ($muscleGroup === "choose-muscle-group") {
      $(this).parent(".exercise").find("#shoulder").hide();
      $(this).parents(".exercise").find("#chest").hide();
      $(this).parents(".exercise").find("#back").hide();
      $(this).parents(".exercise").find("#arm").hide();
      $(this).parents(".exercise").find("#leg").hide();
      $(this).parents(".exercise").find("#abdominal").hide();


    }
    if ($muscleGroup === "Chest") {

      $(this).parent(".exercise").find("#shoulder").remove();
      $(this).parents(".exercise").find("#chest").show();
      $(this).parents(".exercise").find("#back").remove();
      $(this).parents(".exercise").find("#arm").remove();
      $(this).parents(".exercise").find("#leg").remove();
      $(this).parents(".exercise").find("#abdominal").remove();
    }
    else if ($muscleGroup === "Back") {
      $(this).parent(".exercise").find("#shoulder").remove();
      $(this).parents(".exercise").find("#chest").remove();
      $(this).parents(".exercise").find("#back").show();
      $(this).parents(".exercise").find("#arm").remove();
      $(this).parents(".exercise").find("#leg").remove();
      $(this).parents(".exercise").find("#abdominal").remove();
    }
    else if ($muscleGroup === "Shoulders") {
      $(this).parent(".exercise").find("#shoulder").show();
      $(this).parents(".exercise").find("#chest").remove();
      $(this).parents(".exercise").find("#back").remove();
      $(this).parents(".exercise").find("#arm").remove();
      $(this).parents(".exercise").find("#leg").remove();
      $(this).parents(".exercise").find("#abdominal").remove();
    }
    else if ($muscleGroup === "Arms") {
      $(this).parent(".exercise").find("#shoulder").remove();
      $(this).parents(".exercise").find("#chest").remove();
      $(this).parents(".exercise").find("#back").remove();
      $(this).parents(".exercise").find("#arm").show();
      $(this).parents(".exercise").find("#leg").remove();
      $(this).parents(".exercise").find("#abdominal").remove();
    }
    else if ($muscleGroup === "Legs") {
      $(this).parent(".exercise").find("#shoulder").remove();
      $(this).parents(".exercise").find("#chest").remove();
      $(this).parents(".exercise").find("#back").remove();
      $(this).parents(".exercise").find("#arm").remove();
      $(this).parents(".exercise").find("#leg").show();
      $(this).parents(".exercise").find("#abdominal").remove();
    }
     else if ($muscleGroup === "Abdominal") {
      $(this).parent(".exercise").find("#shoulder").remove();
      $(this).parents(".exercise").find("#chest").remove();
      $(this).parents(".exercise").find("#back").remove();
      $(this).parents(".exercise").find("#arm").remove();
      $(this).parents(".exercise").find("#leg").remove();
      $(this).parents(".exercise").find("#abdominal").show();

    }
    console.log($muscleGroup);
    ;
  }
 
  
    // for performance reasons, immediately make an empty copy of the first exercise form elements so we can use it to create new inputs
    const $exerciseTemplate = $("#main-exercise").clone();
    $exerciseTemplate.find("input").val("");
  
    function addExercise(e) {
      e.preventDefault();
      // clone exercise
      const $newExercise = $exerciseTemplate.clone();
  
      // add it to page
      $newExercise.appendTo($exerciseDiv);
      // renumber each exercise to keep track
      $(".exercise").each(function(i) {
        console.log(i);
        $(this).find(".exercise-num").text(i + 1);
      });
    }
    function addSet(e) {
      e.preventDefault();
      // clone existing set (it's right above it... or previous)
      const $newSet = $(this).prev().clone();
      $newSet.find("input").val("");
      $(this).prev().after($newSet);
    }
    function collectData(e) {
      e.preventDefault();
      const workoutData = {
        date: $("#date-input").val(),
        name:  $(this).find("#exercise-name").val().trim(),
        exercises: []
      }

    
      


  
    $(this).find(".exercise").each(function(i) {
      const exerciseData = {
        // exercise_name: $(this).find("#exercise-name").val().trim(),
        muscle_group: $(this).find("#muscle-group").val().trim(),
        specific_exercise: $(this).find(".specific-exercise").val().trim(),
        sets: []
      }
      $(this).find(".set-data").each(function (i) {
        const setData = {
          reps: $(this).find(".reps").val().trim(),
          weight: $(this).find(".weight").val().trim()
        }
        // make sure both exist or just ignore it
        if (setData.reps && setData.weight) {
          exerciseData.sets.push(setData);
        }
      });
      workoutData.exercises.push(exerciseData);
    });
    console.log(workoutData);
    // send it to the database
    sendWorkoutInfo(workoutData);
  }
  
  function sendWorkoutInfo(workoutData) {
    $.ajax({
      url: "/api/workouts",
      method: "POST",
      data: workoutData
    }).then(function (data) {
      console.log(data);
    });
  }


  
  $addExercise.on("click", addExercise);
  $(document).on("click", '.add-set', addSet);
  $workoutForm.on("submit", collectData);

//})

