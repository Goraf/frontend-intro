# Frontend-intro

A collection of projects created during 'FrontDev' (a series of meetings conducted by the 'PGS Software' company) as an introduction to the front end development.

## Repository structure

As projects will be unrelated to each other I took that opportunity to try and learn git feature called **orphaned branches**. Each project has a number assigned to it which is used to name a projects folder and master orphaned branch. Using orphaned branches in such case allows for a cleaner history, while storing files in subdirectory for easier handling of untracked files across projects.

For example:

* first project called 'project-1' is kept in branch 'master-1'

* second 'project-2' -> 'master-2'

* and so on

List of the projects with their short description is provided below. Also, every project has in its folder its own README file with more detailed description, requirements and so on.

To check one of the projects you can pull only its branch using git command:

```
git clone <url> --branch <branch> --single-branch [<folder>]
```

## List of projects

1. (master-1)

   Create an HTML layout with focus on semantics

2. (master-2)

   Convert a .psd template into a webpage. (no responsiveness)

3. (master-3)

   Transform webpage from project-2 into responsive one.

4. (master-4)

   Create a simple console program in javascript (ES5).

5. (master-5)

   Create a simple todo app in javascript which keeps its data in Local Storage.

6. (master-6)

   Create a single-page application displaying average forecast temperature for the next five days for selected cities.