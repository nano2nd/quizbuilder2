using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizBuilder2.Migrations
{
    public partial class outcomeimages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFile",
                table: "Outcomes");

            migrationBuilder.DropColumn(
                name: "ImageFile",
                table: "CharacterRoles");

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Outcomes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Outcomes_PhotoId",
                table: "Outcomes",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Outcomes_Photos_PhotoId",
                table: "Outcomes",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Outcomes_Photos_PhotoId",
                table: "Outcomes");

            migrationBuilder.DropIndex(
                name: "IX_Outcomes_PhotoId",
                table: "Outcomes");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Outcomes");

            migrationBuilder.AddColumn<string>(
                name: "ImageFile",
                table: "Outcomes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageFile",
                table: "CharacterRoles",
                nullable: true);
        }
    }
}
