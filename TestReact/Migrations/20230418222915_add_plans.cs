using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestReact.Migrations
{
    /// <inheritdoc />
    public partial class add_plans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "benefits",
                table: "Child",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "diagnosis",
                table: "Child",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "health_group",
                table: "Child",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "other",
                table: "Child",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Plan",
                columns: table => new
                {
                    plan_id = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plan", x => x.plan_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Plan");

            migrationBuilder.DropColumn(
                name: "benefits",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "diagnosis",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "health_group",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "other",
                table: "Child");
        }
    }
}
