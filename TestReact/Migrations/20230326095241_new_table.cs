using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestReact.Migrations
{
    /// <inheritdoc />
    public partial class new_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "mkb10",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    rec_code = table.Column<string>(type: "varchar(8)", unicode: false, maxLength: 8, nullable: true),
                    code = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 6, nullable: true),
                    name = table.Column<string>(type: "text", nullable: true),
                    date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__mkb10__3213E83F85BC0336", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "mkbo",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    parent_id = table.Column<int>(type: "int", nullable: true),
                    name = table.Column<string>(type: "text", nullable: false),
                    level = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true),
                    ict = table.Column<string>(type: "varchar(4)", unicode: false, maxLength: 4, nullable: true),
                    code = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__mkbo__3213E83F5735FFE9", x => x.id);
                    table.ForeignKey(
                        name: "FK__mkbo__parent_id__49C3F6B7",
                        column: x => x.parent_id,
                        principalTable: "mkbo",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "mkb10_code",
                table: "mkb10",
                column: "code");

            migrationBuilder.CreateIndex(
                name: "mkbo_code",
                table: "mkbo",
                column: "code");

            migrationBuilder.CreateIndex(
                name: "mkbo_parent_id",
                table: "mkbo",
                column: "parent_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "mkb10");

            migrationBuilder.DropTable(
                name: "mkbo");
        }
    }
}
