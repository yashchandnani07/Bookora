using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bookora.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveRemainingCapacityColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemainingCapacity",
                table: "OfferSlots");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RemainingCapacity",
                table: "OfferSlots",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
