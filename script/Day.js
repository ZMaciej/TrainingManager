class Day
{
    constructor()
    {
        this.Exercises = new Array();
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
}