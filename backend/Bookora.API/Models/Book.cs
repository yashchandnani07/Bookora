namespace Bookora.API.Models;

public class Book
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string CoverImageUrl { get; set; } = string.Empty;

    public string PdfUrl { get; set; } = string.Empty;

    public bool IsPublished { get; set; } = true;

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;


    // RELATIONSHIPS

    public Guid CategoryId { get; set; }

    public Category? Category { get; set; }


    public Guid UploadedById { get; set; }

    public User? UploadedBy { get; set; }
}