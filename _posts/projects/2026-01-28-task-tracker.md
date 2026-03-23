---
layout: project
title: "Task Tracker CLI"
date: 2025-05-25
excerpt: "A command-line task tracker built in Nim."
technologies: "Nim"
permalink: /projects/task-tracker/
---

A personal command-line task manager written in Nim, called `Doin`. Tasks are stored as plain JSON files under `~/.tasks/`, organized into three folders — active, done, and overdue — so there's no database and the data is always readable.

It supports one-off tasks with due dates and daily recurring tasks. Daily tasks track how many times you completed them on time versus late, giving a simple streak-like record. Overdue tasks get moved to their own folder automatically when marked done.

Commands cover the basics: add a task, set a description, assign a due date, mark as done, and list tasks — including a shorthand to show only what's due today. CI is set up to build and release binaries for Linux, macOS, and Windows on every version tag.

**Stack:** Nim.

[GitHub Repository](https://github.com/VitorHolandaI/task-tracker)
