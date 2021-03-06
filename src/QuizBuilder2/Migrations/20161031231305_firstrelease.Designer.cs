﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using QuizBuilder2.Data;

namespace QuizBuilder2.Migrations
{
    [DbContext(typeof(QuizDbContext))]
    [Migration("20161031231305_firstrelease")]
    partial class firstrelease
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ImageFile");

                    b.Property<bool>("IsImage");

                    b.Property<int>("QuestionId");

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.AnswerOutcome", b =>
                {
                    b.Property<int>("AnswerId");

                    b.Property<int>("OutcomeId");

                    b.HasKey("AnswerId", "OutcomeId");

                    b.HasIndex("AnswerId");

                    b.HasIndex("OutcomeId");

                    b.ToTable("AnswerOutcomes");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.CharacterRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ImageFile");

                    b.Property<string>("Name");

                    b.Property<string>("Summary");

                    b.HasKey("Id");

                    b.ToTable("CharacterRoles");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.CharacterRoleOutcome", b =>
                {
                    b.Property<int>("CharacterRoleId");

                    b.Property<int>("OutcomeId");

                    b.Property<int>("Value");

                    b.HasKey("CharacterRoleId", "OutcomeId");

                    b.HasIndex("CharacterRoleId");

                    b.HasIndex("OutcomeId");

                    b.ToTable("CharacterRoleOutcomes");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Outcome", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ImageFile");

                    b.Property<string>("Name");

                    b.Property<int>("QuizId");

                    b.Property<string>("Summary");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Outcomes");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Points");

                    b.Property<int>("QuizId");

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Quiz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Summary");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("QuizBuilder2.Data.Entities.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Answer", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.AnswerOutcome", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.Answer", "Answer")
                        .WithMany("AnswerOutcomes")
                        .HasForeignKey("AnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("QuizBuilder2.Data.Entities.Outcome", "Outcome")
                        .WithMany("AnswerOutcomes")
                        .HasForeignKey("OutcomeId");
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.CharacterRoleOutcome", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.CharacterRole", "CharacterRole")
                        .WithMany("CharacterRoleOutcomes")
                        .HasForeignKey("CharacterRoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("QuizBuilder2.Data.Entities.Outcome", "Outcome")
                        .WithMany("CharacterRoleOutcomes")
                        .HasForeignKey("OutcomeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Outcome", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.Quiz", "Quiz")
                        .WithMany("Outcomes")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuizBuilder2.Data.Entities.Question", b =>
                {
                    b.HasOne("QuizBuilder2.Data.Entities.Quiz", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
