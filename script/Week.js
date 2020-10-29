class Week
{
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
        }
        return this;
    }
}