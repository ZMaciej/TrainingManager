class Day
{
    constructor()
    {
        this.Exercises = new Array();
        this.Index = 0;
        this.Name = "";
    }

    FromJson(json)
    {
        Object.assign(this, json);
        for (let i = 0; i < this.Exercises.length; i++)
        {
            this.Exercises[i] = new Exercise().FromJson(this.Exercises[i]);
        }
        return this;
    }

    ToJson()
    {
        return JSON.stringify(this);
    }

    SaveToCookie(name)
    {
        setCookie(name, this.ToJson());
    }

    IsCompleted()
    {
        var completed = true;
        this.Exercises.forEach(exercise =>
        {
            if (!exercise.IsCompleted())
            {
                completed = false;
            }
        });
        return completed;
    }
}