# Fable PR action

[<img src="./images/fable-logo-color.png" width="400" alt="Fable (makeitfable.com)" />](https://makeitfable.com/)

An action for creating Fable requests directly from your PRs.

## What is Fable?

Fable is an accessibility platform powered by people with disabilities. Fable moves organizations from worrying about compliance to building incredible and accessible user experiences. 
 
Fable enables accessibility managers, user researchers, designers, and developers to connect to people with disabilities remotely and on-demand. Fable also provides full-service accessibility audits, training, and expert-led workshops that help companies operationalize accessibility. 

The best digital teams work with Fable to make products more accessible for over 1 billion people who live with disabilities. 

Learn more at [Fable (makeitfable.com)](https://makeitfable.com/).

## When should you create a Fable request?

You should create a Compatibility Test if you are looking to: 

* Identify **compatibility** issues in new features or workflows for assistive technologies
* Prevent accessibility **regressions** when making UI updates
* Validate **remediation** efforts to a previously tested Compatibility Test


## Usage

<img width="912" alt="Fable PR action workflow example" src="https://user-images.githubusercontent.com/34746763/175545820-3926dc10-0082-40b1-8e38-601d8fd3a682.png">


To use this action you will need a list of file paths that cover the UI workflows to be tested with Fable. It is recommended to start with page or component files that are undergoing active development or accessibility defect fixes.

This action will comment on any PRs opened that modify your selected files.

### Example workflow

```yml
name: Fable PR Action
on:
  pull_request:
    types: [opened]
    paths:
    - 'src/components/**.js' # REPLACE WITH PATHS OF YOUR OWN
  issue_comment:
    types: [created]
    paths:
    - 'src/components/**.js' # REPLACE WITH PATHS OF YOUR OWN

jobs:
  fable:
    runs-on: ubuntu-latest
    name: Fable PR workflow
    steps:
      - name: Run Fable action
        uses: KaiPrince/fable-automation@main
```
