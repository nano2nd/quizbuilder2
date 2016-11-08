using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;

namespace QuizBuilder2.Services {
    public interface IPhotoService
    {
        Task<Photo> AddPhoto(Photo photo);
    }
}