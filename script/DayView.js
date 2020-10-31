class DayView
{
    constructor(day)
    {
        this.ExerciseViews = new Array();
        if (day.Exercises.length == 0)
        {
            $("#traingingsView").html("Day off");
        }
        day.Exercises.forEach(ex =>
        {
            this.ExerciseViews.push(new ExerciseView(ex, day));
        });
        $(".PageTitle").html(day.Name);
    }
}