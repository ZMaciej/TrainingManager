class DayView
{
    constructor(day)
    {
        this.ExerciseViews = new Array();
        day.Exercises.forEach(ex =>
        {
            this.ExerciseViews.push(new ExerciseView(ex, day));
        });
        $(".PageTitle").html(day.Name);
    }
}