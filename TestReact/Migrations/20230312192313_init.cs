using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestReact.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Child",
                columns: table => new
                {
                    child_id = table.Column<int>(type: "int", nullable: false),
                    surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    fathername = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    birth_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    sex = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    polis_oms = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    adress = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Child", x => x.child_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Child");
        }
    }
}
