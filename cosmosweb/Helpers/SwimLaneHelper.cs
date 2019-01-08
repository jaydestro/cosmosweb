namespace cosmosweb.Helpers
{
    public class SwimLaneHelper
    {
        private bool _isFirstElementInSwimLane = true;
        private int _counter;

        public string GetSwimLaneCssClass(bool includeDefaultPadding = true, bool includeDefaultMargins = true)
        {
            var result = "swim";
            if (_counter % 2 == 1)
            {
                result += " swim-gray";
            }

            if (includeDefaultPadding)
            {
                result += " pt-60 pb-60";

            }

            if(includeDefaultMargins)
            { 
                if (_counter == 0)
                {
                    result += " mt-60";
                }
            }

            _counter++;
            _isFirstElementInSwimLane = true;
            return result;
        }

        public string GetIllustrationCssClass()
        {
            var cssClass = "col-sm-6" +
                (_isFirstElementInSwimLane
                    ? _counter % 2 == 1 ? string.Empty : " col-sm-push-6"
                    : _counter % 2 == 1 ? " col-sm-pull-5 col-md-pull-4" : " col-sm-push-1 col-md-push-2");

            _isFirstElementInSwimLane = false;
            return cssClass;
        }

        public string GetContentCssClass()
        {
            var cssClass = "col-md-4 col-sm-5" +
                (_isFirstElementInSwimLane
                    ? _counter % 2 == 1 ? " col-sm-push-7" : " col-md-push-1"
                    : _counter % 2 == 1 ? " col-sm-push-1" : " col-md-pull-5 col-sm-pull-6");

            _isFirstElementInSwimLane = false;
            return cssClass;
        }
    }
}