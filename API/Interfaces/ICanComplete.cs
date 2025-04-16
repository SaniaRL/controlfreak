namespace API.Interfaces
{
    public interface ICanComplete
    {
        bool Completed { get; }
        DateTime? CompletedWhen { get; }
        void SetCompleted();
    }
}
