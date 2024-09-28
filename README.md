# General

This app acts as a blog and tutorial site.
I want to help as many people as possible learning programming in general or in more specialized topics.
For me it also acts as a way to learn Svelte and SvelteKit and get into the JavaScript ecosystem, also deploying the project
world-wide would be a first for me.

# Technologies

- Svelte + SvelteKit
- `maybe some ui library` ^^
- might be using Postgres, probably not required
- NodeJS

# The Idea

I want the site or a external tool to convert markdown files into html. The converted files are then served as plain html or bundled
as a svelte page, not sure on that yet.

# Contributing

If there is something to be improved or feedback, feel free to post it (in the issue section).
If this README is read by one of my classmates, lets chat on discord!

# Content

Page content such as tutorials or blogs are contained in src/tutorial and src/blogs. Similiar to the
svelte page structure, I chose to go for directory based routing.

When a user tries to access a page about polymorphism in java, the link should be like this http:domain/tutorials/java/polymorphism.

The file structure in src/tutorials should be like this:

```
src >
   tutorials >
      content.md
      java >
          content.md
          polymorphism >
             content.md
```

Every folder also contains one content.md file. This file is directly related to the folders name.

# Run project

For the project to run correctly, you have to add a .env file to the root-path.
This .env file must contain the following key/s
```bash
BASEPATH="path_to_folder"
```
