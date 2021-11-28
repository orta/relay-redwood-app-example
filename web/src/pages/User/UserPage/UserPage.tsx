import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay'
import { UserPageQuery } from 'src/components/__generated__/UserPageQuery.graphql'

type Props = {
  queryRef: PreloadedQuery<UserPageQuery>
}

function UserPage(props: Props) {
  const data = usePreloadedQuery<UserPageQuery>(
    graphql`
      query UserPageQuery($id: ID!) {
        user(id: $id) {
          name
          email
        }
      }
    `,
    props.queryRef
  )

  return <h1>{data.user?.name}</h1>
}

export default UserPage

// export default () => <div />
