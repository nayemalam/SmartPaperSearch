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
<img width="1711" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/eec9b84b-c32e-465c-9b4b-91cccc21787c">

<details>
  <summary>More screenshots</summary>
  <img width="1382" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/2123e85b-05f6-419a-89d6-457c00353ff4">
  <img width="1694" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/02e80167-94e3-41d2-8d73-7ffd4cea47e1">
  <img width="1253" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/6aa93536-16e8-4de6-b5c9-26ac42f1716c">
  <img width="331" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/7482bb19-274a-453b-99ce-b59cb77351ed">
  <img width="355" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/5d9b32f3-e9d5-4001-9ca4-c781561a3486">
  <img width="1203" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/a6ed064d-bb90-4afc-aabf-38e19b1f947a">
  <img width="1683" alt="image" src="https://github.com/nayemalam/SmartPaperSearch/assets/25883629/18bcf280-d917-44fc-ad85-54467b2756d7">
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
