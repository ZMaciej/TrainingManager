class CarouselView
{
    constructor(loadedCarouselHtmlForm)
    {
        this.LoadedCarouselHtmlForm
    }

    createNewSimulationAfter(guid, previousDiv)
    {
        var newDiv = this.LoadedSimulationsHtmlForm.cloneNode(true);
        $(newDiv).hide();
        if (previousDiv == null)
        {
            var div = $(newDiv).prependTo($(this.SimulationsDivContainer));
        }
        else
        {
            var div = $(newDiv).insertAfter(previousDiv);
        }
        return new Simulation(guid, div);
    }
}