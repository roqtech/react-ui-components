import 'dotenv/config'
import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? 'https://roq-core-snapshot-gateway.roq-platform.com/v01/server/graphql',
  documents: ['./src/lib/graphql/**.ts'],
  generates: {
    './src/lib/graphql/types/': {
      preset: 'client',
      plugins: []
    }
  },
}
 
export default config