require('dotenv/config')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const path = require('path')

const endpoint = `${process.env.PLATFORM_HOST}/server/graphql`
const schemaOutput = './src/lib/graphql/schema.json'
const typesOutput = './src/lib/graphql/types.ts'
const codegenIncludesDir = './src/lib/graphql/**/*.ts'

const isSyncSchema = process.argv.indexOf('sync-schema') > 0
const watchMode = process.argv.indexOf('--watch') > 0

async function syncSchema() {
  console.log('Downloading schema.json...')
  const { stdout, stderr } = await exec(
    [
      'yarn apollo client:download-schema',
      '--includes=./src/lib/graphql/*.ts',
      `--endpoint=${endpoint}`,
      schemaOutput,
    ].join(' ')
  )

  console.log(stdout)
  console.error(stderr)
}

async function codegen(watchMode = false) {
  console.log(`Start generating types ${watchMode ? 'in watch mode' : ''}...`)
  function result({ stdout, stderr }) {
    console.log(stdout)
    console.error(stderr)
  }
  exec(
    [
      'yarn apollo client:codegen',
      `--localSchemaFile=${schemaOutput}`,
      '--no-addTypename',
      '--mergeInFieldsFromFragmentSpreads',
      '--outputFlat',
      '--target=typescript',
      watchMode ? '--watch' : '',
      `--includes=${codegenIncludesDir}`,
      typesOutput,
    ].join(' ')
  )
    .then(result)
    .catch((args) => {
      result(args)
      process.exit(1)
    })
}

if (isSyncSchema) {
  syncSchema()
} else {
  codegen(watchMode)
}
