using System.Threading.Tasks;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;

namespace QuizBuilder2.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly QuizDbContext _db;
        
        public PhotoService(QuizDbContext db) 
        {
            _db = db;
        }

        public async Task<Photo> AddPhoto(Photo photo)
        {
            _db.Add(photo);
            await _db.SaveChangesAsync();
            return photo;
        }
    }
}
