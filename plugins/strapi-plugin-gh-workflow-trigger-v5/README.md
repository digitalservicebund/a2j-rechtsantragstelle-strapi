# strapi-plugin-gh-workflow-trigger-v5

Trigger a github workflow from your admin panel.

Inspired by [strapi-plugin-site-publisher](https://github.com/colibris-xyz/strapi-plugin-site-publisher) and [strapi-plugin-update-static-content](https://market.strapi.io/plugins/strapi-plugin-update-static-content)

## Getting started

- To build: `npm run build`
- To develop: `npm run watch`

## Usage

The plugin is split into front-end (`admin/`) and back-end (`server/`) parts.

The plugin backend (`server`) exposes three routes: - `/listWorkflows` GET -> Returns a list of workflows (see `Workflow` model) - `/trigger` POST -> Dispatches a new workflow - `/cancel` POST(cancel_url) -> Cancels the specified workflow using the passed URL

The plugin front-end (`admin`) is a single page (`HomePage.tsx`). It exposes two active buttons (refresh & publish) as well as a table that lists the passed workflows (`WorkflowTable.tsx`). The `WorkflowTable` also does some minor data transformation (calculate runtime, colored status badge, ...)

## Contributing

[Deutsche sprache weiter unten](#mitwirken)

Everyone is welcome to contribute! You can contribute by giving feedback, adding issues, answering questions, providing documentation or opening pull requests. Please always follow the guidelines and our [Code of Conduct](CODE_OF_CONDUCT.md).

To contribute code, simply open a pull request with your changes and it will be reviewed by someone from the team. By submitting a pull request you declare that you have the right to license your contribution to the DigitalService and the community under the license picked by the project.

## Mitwirken

Jede:r ist herzlich eingeladen mitzugestalten! Du kannst einen Beitrag leisten, indem du Feedback gibst, Probleme beschreibst, Fragen beantwortest, die Dokumentation erweiterst, oder Pull-Requests eröffnest. Bitte befolge immer die Richtlinien und unseren [Verhaltenskodex](CODE_OF_CONDUCT.md).

Um Code beizutragen erstelle einfach einen Pull Requests mit deinen Änderungen, dieser wird dann von einer Person aus dem Team überprüft. Durch das Eröffnen eines Pull-Requests erklärst du ausdrücklich, dass du das Recht hast deine Beitrag an den DigitalService und die Community unter der vom Projekt gewählten Lizenz zu lizenzieren.
