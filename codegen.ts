import 'dotenv/config'
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env.STORYBOOK_PLATFORM_GRAPHQL}v01/server/graphql` ?? 'https://roq-core-snapshot-gateway.roq-platform.com/v01/server/graphql',
  documents: ['./src/lib/graphql/**.ts', './src/lib/graphql/**/**.ts'],
  generates: {
    './src/lib/graphql/types/': {
      preset: 'client',
      plugins: [],
    },
    './src/lib/graphql/hooks/generated.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withMutationFn: false,
        withHOC: false,
        withHooks: true,
        withComponent: false,
        namingConvention: 'keep',
        noNamespaces: true,
        noGraphQLTag: true
      }
    }
  },
}

export default config
