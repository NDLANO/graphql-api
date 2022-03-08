import { generateTypeScriptTypes } from 'graphql-schema-typescript';
import schema from '../src/schema';
import { join } from 'path';
import chalk from 'chalk';

const typeDefinitionFileName = join(
  __dirname,
  '..',
  'src',
  'types',
  'schema.d.ts',
);

async function generate(): Promise<void> {
  try {
    await generateTypeScriptTypes(schema, typeDefinitionFileName, {
      customScalarType: {
        StringRecord: 'Record<string, string>',
      },
      global: true,
      asyncResult: true,
    });
    console.log(
      `${chalk.green(`CREATED`)} ${chalk.dim(typeDefinitionFileName)}`,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

generate()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    process.exit(1);
  });
