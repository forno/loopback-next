import {GraphQLServerOptions} from '@loopback/graphql';
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-graphql
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import {ApplicationConfig, GraphqlDemoApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new GraphqlDemoApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/graphql`);

  return app;
}

if (require.main === module) {
  const graphqlCfg: GraphQLServerOptions = {
    apollo: {
      subscriptions: '/subscriptions',
    },
    asMiddlewareOnly: true,
  };
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
    graphql: graphqlCfg,
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
