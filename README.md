# Smart Paper Search 🔍 📄

## Table of Contents
- [Smart Paper Search 🔍 📄](#smart-paper-search--)
  - [Table of Contents](#table-of-contents)
  - [Screenshot](#screenshot)
  - [How To Run](#how-to-run)
      - [To run the application locally](#to-run-the-application-locally)
      - [Build and serve application for prod](#build-and-serve-application-for-prod)
  - [How To Test](#how-to-test)
  - [What does this do?](#what-does-this-do)
  - [Additional features](#additional-features)
  - [Notes, comments \& potential improvements](#notes-comments--potential-improvements)

## Screenshot

<details>
  <summary>More screenshots</summary>
</details>

## How To Run
#### To run the application locally

1. Clone repo: 
```bash
https://github.com/nayemalam/SmartPaperSearch.git
```
2. cd into the folder:
```bash
cd SmartPaperSearch
```
3. Install dependencies:
```bash
yarn # or yarn install
```
4. Run app:
```bash
yarn start
```

#### Build and serve application for prod

```bash
yarn build && yarn serve
```

## How To Test
```bash
yarn test
```

## What does this do?
- [x] Search through the [CORE API](https://api.core.ac.uk/docs/v3#tag/Search/operation/get_globalall_entities_search)
- [x] Present papers in a list 
  - title
  - date
  - authors
  - download the paper
  - read abstract
- [x] Keyword trends chart
- [x] Ability to decide the number of papers to return from the API

## Additional features
- [x] CMD+K to easily access the search bar
- [x] Loading states that matches the skeleton of the design
- [x] Responsive (to a degree)
- [x] Pagination
- [x] Testing (see)
- [x] show/hide chart data (raionale: to allow users to see more papers on the screen at once + ability to show/hide the graph when needed)

## Notes, comments & potential improvements
- could have had a modal for the abstract
- can have better responsivity
- better pagination (with more options: page numbers, first and last page, etc)
- abstract could have been presented better
- better typing (preferably coming from the API since copying the type locally does not maintain type integrity)
- Tooltips instead of titles
- Tried copying similar design with cypris.ai branding
- could be useful to add a "export keyword trends" button for offine use (spreadsheet for example)