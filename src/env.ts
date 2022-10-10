interface IEnv {
  host: string
}
const baseUrl = 'https://statistics-internship-subsection-catalog.trycloudflare.com/v01'

const env: IEnv = {
  host: `${baseUrl}/server/graphql`
}

export { env }