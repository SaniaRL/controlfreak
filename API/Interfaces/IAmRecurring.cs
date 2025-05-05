using API.Entities;

namespace API.Interfaces
{
    public interface IAmRecurring
    {
        string? RRule{ get; }

        void SetRRule(string rRule);
    }
}
