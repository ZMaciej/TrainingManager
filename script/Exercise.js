class Exercise
{
    constructor(name, unit, totalCount, inSeriesCount)
    {
        this.Name = name;
        this.Unit = unit;
        this.TotalCount = totalCount;
        this.InSeriesCount = inSeriesCount;
        this.SeriesDone = 0;
        this.SeriesCount = Math.ceil(this.TotalCount / this.InSeriesCount);
        this.TotalCount = this.SeriesCount * this.InSeriesCount;
    }
    ToJson()
    {
        return JSON.stringify(this);
    }
    FromJson(json)
    {
        Object.assign(this, json);
        this.SeriesCount = Math.ceil(this.TotalCount / this.InSeriesCount);
        this.TotalCount = this.SeriesCount * this.InSeriesCount;
        return this;
    }
}