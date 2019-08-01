# crds-graphql-api

Central GraphQL service to consume and graph all data microservices. Built and deployed to Kubernetes via TeamCity.

## Quick Start
It is recommended that you first become familiar with graphql theory and implementation here (https://www.apollographql.com/docs/). This project uses Apollo for creating the GraphQL server on top of Express. 

1. Clone the repo: `git clone https://github.com/crdschurch/crds-graphql-api`
2. Get Vault and New Relic env vars
3. Run `npm i` to add dependencies
4. Run `npm watch` to compile the ts to js in the `/dist` folder and watch for file updates.
5. Launch the server locally by either launching via the debugger in VSCode against Node (preferred method because you get easy debugging and breakpoints in vs         code via the mapped /src/*.ts to /dist/*.js) or by running `npm run start`.
6. You should now be able to visit localhost:8000 and see the included UI for ApolloServer. 
7. To execute any query or mutation you will need a valid Auth Token. To retrieve this you can login at int.crossroads.net and copy the value for the intsessionId      cookie in the browser. Paste your auth token as a header - found in the bottom left of the UI as a JSON object. `{"authorization": "${yourAuthTokenHere}"}. `
8. Run a test query `{
                     sites {
                        id
                        name
                        }
                    }`
9. You should see a list of sites with their id and name. If you recieve a "context creation failed" error message then your auth token was expired or invalid.         Double check the header you set.

#### Deployment
Deployment is automatic via Teamcity in development, release, and master branches. They live under API & Back-End > GraphQL-API and get deployed to Kubernetes (https://k8s-int.crossroads.net/#!/service/api/crds-graphql-api?namespace=api).

#### Logging
We are logging for service analytics in new relic under graphql-api ${env}.
We are also logging requests, reseponses and errors to logz.io. 

#### Environment variables
.envrc Sample: 
export VAULT_ROLE_ID=
export VAULT_SECRET_ID=
export ENV=local
export NEW_RELIC_LICENSE_KEY=

The rest of the environment variables are being loaded from vault (https://vault.crossroads.net/) using the crds-vault-node package (https://github.com/crdschurch/crds-vault-node) with the corresponding ENV listed above. We are loading both the `common` and `graphql` secrets.

#### Create a new model
To create a new model for querying and mutating, you will create a folder inside of `src/graph/`. I will use the `sites` folder as an example here. If you should be able to query your new model by itself, then `sites` is a good template to follow. Compare `get sites` or `get site by ID` VS `get groups a user belongs to`. To retrieve a group a user belongs to, you don't actually need to ever fetch groups by themselves so a `groups` resolver and connector would be unnecessary (You would put the resolver and connector functions in the `users` classes for that). But in the instance of `get all sites`, it is necessary to specifically have a GraphQL query for `sites` meaning you do need a connector and a resolver. It may be easiest to copy the `sites` folder rename the files and their contents accordingly to match your new model. 

Once you have your new model and folder along with all of it's files, you will need to bind the connector to the container (we use inversifyJS here). To do this, add the connector binding to the `src/ioc/inversify.config.ts` file. You will also need to declare a symbol for this connector in the `src/ioc/types` folder for future use with dependency injection. Once this is completed you can inject the new connector in the constructor of the `GraphqlServer` in `src/graphql.ts`. Once injected, you can include it in the constructor of the ApolloServer in `dataSources`. This will allow that connector to be available in your resolvers in the `context` (`context.dataSources.${modelConnector}`) object that is passed in. This allows for easy unit tests by being able to mock the connector off of your interface and then directly injecting it into `dataSources` for your ApolloTestServer instead of injecting the actual concrete implementation. 

The resolver and schema for the new model will also need to be made available to the ApolloServer by importing it to `src/resolvers.ts` and `src/schema.ts` respectively.

### Unit Testing
We are using jest.js (https://jestjs.io/docs/en/getting-started) for unit tests. I have set the pattern to create and export your mockConnector at the top of every spec file with the unit tests to follow. You will need to create a new ApolloServer and an ApolloTestClient in each unit test. See `src/graph/sites/sites.spec.ts` for an example. 

### CLI
Future work may include the creation of a CLI for quickly adding models and automatically injecting/importing resolvers, schemas and connectors where necessary. This is hopeful, don't count on it. ;)

## License

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
