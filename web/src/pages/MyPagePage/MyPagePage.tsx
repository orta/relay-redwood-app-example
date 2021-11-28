// import { Link, routes } from '@redwoodjs/router'
// import { MetaTags } from '@redwoodjs/web'

import type { MyPagePageQuery } from 'src/components/__generated__/MyPagePageQuery.graphql'

import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay'

type Props = {
  queryRef: PreloadedQuery<MyPagePageQuery>
}

function HomeTab(props: Props) {
  const data = usePreloadedQuery<MyPagePageQuery>(
    graphql`
      query MyPagePageQuery($id: ID!) {
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

export default HomeTab
