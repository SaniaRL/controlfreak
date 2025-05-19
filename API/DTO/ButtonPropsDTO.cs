using API.Entities;

namespace API.DTO
{
    public class ButtonPropsDTO
    {
        public int Id { get; set; }
        public string? ToolTip { get; set; }
        public string? IconSrc { get; set; }
        public string? AltText { get; set; }

        public ButtonPropsDTO(int id, string? toolTip, string? iconSrc, string? altText)
        {
            Id = id;
            ToolTip = toolTip;
            IconSrc = iconSrc;
            AltText = altText;
        }

        public static ButtonPropsDTO FromEntity(ButtonProps buttonProps)
        {
            return new ButtonPropsDTO(buttonProps.Id, buttonProps.Tooltip, buttonProps.IconSrc, buttonProps.AltText);
        }
    }
}