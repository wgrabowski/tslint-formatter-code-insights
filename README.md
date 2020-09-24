# tslint-formatter-code-insight
Formats TSLint output to Bitbucket Code Insight annotations format

# Installation
`npm install --save-dev tslint-formatter-code-insight`

# Usage
Use node_modules/tslint-formatter-code-insight as value for `formattersDir` parameter while using `tslint`:
`tslint --formattersDir node_modules/tslint-formatter-code-insights --format codeInsight my-file.ts`
or short:
`tslint -s node_modules/tslint-formatter-code-insight -t codeInsight my-file.ts`