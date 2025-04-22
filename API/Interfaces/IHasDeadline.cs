namespace API.Interfaces
{
    public interface IHasDeadline
    {
        DateOnly? DeadLine { get; set; }
    }
}