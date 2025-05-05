namespace API.Interfaces
{
    public interface IHasDeadline
    {
        DateTime? DeadLine { get; }

        void SetDeadline(DateTime? deadline);
    }
}