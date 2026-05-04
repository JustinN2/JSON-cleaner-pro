# JSON-cleaner-pro

## What it does
A developer utility that formats messy JSON into readable, indented structures and can minify it back. Copy the result to your clipboard instantly. Saves your last session automatically.

## Tech Stuff
-HTML5, CSS3, JavaScript (ES6)
-LocalStorage API
Deployed on Vercel

## Live Site
[https://json-cleaner-pro.vercel.app]

## One Technical Challenge I faced
Getting the syntax highlighting inside a textarea is impossible (textureareas don't support span/color tags). So I solved this by displaying `contenteditable` div instead, which allows colored spans for keys, strings and numbers.

## One Thing I should Improve
Add a "Share" button that grenerates a short URL for the current JSON using a free API like TinyURL.
