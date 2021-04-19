class ExerciseView
{
    constructor(exercise, day)
    {
        this.Model = exercise;
        this.DayModel = day;
        this.ProgressButtonsList = new Array();
        this.CreateView();
        this.UpdateView();
        this.#setProgressLength(this.Model.SeriesDone);
    }

    SetModel(exercise)
    {
        this.Model = exercise;
        this.UpdateView();
    }

    CreateView()
    {
        this.Exercise = document.createElement('div');
        $(this.Exercise).addClass("Exercise");
        this.Title = document.createElement('div');
        $(this.Title).addClass("ExerciseTitle");
        this.Exercise.append(this.Title);
        this.Progress = document.createElement('div');
        $(this.Progress).addClass("ExerciseProgress");
        this.Exercise.append(this.Progress);

        $("#traingingsView").append(this.Exercise);
        $(this.Exercise).after("</br>");
    }

    UpdateView()
    {
        $(this.Title).html(this.Model.Name + ' ' + this.Model.TotalCount + ' ' + this.Model.Unit + ' by ' + this.Model.InSeriesCount + ' ' + this.Model.Unit);
        $(this.Progress).empty();
        this.ProgressButtonsList = new Array();
        for (let i = 0; i < this.Model.SeriesCount; i++)
        {
            var bt = document.createElement('div')
            this.ProgressButtonsList.push(bt);
            this.Progress.append(bt);
            var that = this;
            $(bt).addClass("ExerciseProgressButton");
            $(bt).html((i + 1) * this.Model.InSeriesCount);
            $(bt).on("click", () => (that.SetProgress(i)));
        }
    }

    SetProgress(progress)
    {
        if (this.Model.SeriesDone < progress + 1)
        {
            this.#setProgressLength(progress + 1)
            this.Model.SeriesDone = progress + 1;
        } else
        {
            this.#setProgressLength(progress)
            this.Model.SeriesDone = progress;
        }
        this.DayModel.SaveToCookie(CookieName);
    }

    #setProgressLength(length)
    {
        for (let i = 0; i < length - 1; i++)
        {
            $(this.ProgressButtonsList[i]).addClass('activeLast');
            $(this.ProgressButtonsList[i]).removeClass('active');
        }

        $(this.ProgressButtonsList[length - 1]).removeClass('activeLast');
        $(this.ProgressButtonsList[length - 1]).addClass('active');

        for (let i = length; i < this.Model.SeriesCount; i++)
        {
            $(this.ProgressButtonsList[i]).removeClass('activeLast');
            $(this.ProgressButtonsList[i]).removeClass('active');
        }
    }
}