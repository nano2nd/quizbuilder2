using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QuizBuilder2.Migrations
{
    public partial class photoaddition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFile",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "IsImage",
                table: "Answers");

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Extension = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    Source = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                });

            migrationBuilder.AddColumn<bool>(
                name: "IsPhotoOnly",
                table: "Answers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Answers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_PhotoId",
                table: "Answers",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Photos_PhotoId",
                table: "Answers",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Photos_PhotoId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_PhotoId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "IsPhotoOnly",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Answers");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "ImageFile",
                table: "Answers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsImage",
                table: "Answers",
                nullable: false,
                defaultValue: false);
        }
    }
}
