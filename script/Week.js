class Week
{
    #dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    constructor()
    {
        this.Days = new Array();
    }
    ToJson()
    {
        return JSON.stringify(this);
    }
    FromJson(json)
    {
        Object.assign(this, json);
        for (let i = 0; i < this.Days.length; i++)
        {
            this.Days[i] = new Day().FromJson(this.Days[i]);
            this.Days[i].Index = i;
            this.Days[i].Name = this.#dayNames[i];
        }

        for (let i = this.Days.length; i < 7; i++)
        {
            this.Days[i] = new Day();
            this.Days[i].Index = i;
            this.Days[i].Name = this.#dayNames[i];
        }
        return this;
    }
}