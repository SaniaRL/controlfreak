namespace API.Entities
{
    public class ButtonProps
    {
        public int Id { get; set; }
        public string Tooltip { get; set; }
        public string IconSrc { get; set; }
        public string AltText { get; set; }

        public ButtonProps() { }
        public ButtonProps(string toolTip, string iconSrc, string altText) 
        {
            Tooltip = toolTip;
            IconSrc = iconSrc;
            AltText = altText;
        }
    }
}
