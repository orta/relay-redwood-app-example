import { Form, FormError, FieldError, Label, TextField, NumberField, Submit } from '@redwoodjs/forms'

import { graphql, useFragment } from 'react-relay'
import { UserForm_user$key } from 'src/components/__generated__/UserForm_user.graphql'

type Props = { user?: UserForm_user$key }
type EditForm = { onSave: (data: any, id?: string) => void; loading: boolean; error?: Error }

const UserForm = (props: Props & EditForm) => {
  const onSubmit = (data) => props.onSave(data, props?.user?.id)

  const data = useFragment(
    graphql`
      fragment UserForm_user on User {
        id
        name
        email
        profileViews
        city
        country
      }
    `,
    props.user
  )

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error as any}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="name" className="rw-label" errorClassName="rw-label rw-label-error">
          Name
        </Label>
        <TextField name="name" defaultValue={data?.name} className="rw-input" errorClassName="rw-input rw-input-error" />
        <FieldError name="name" className="rw-field-error" />

        <Label name="email" className="rw-label" errorClassName="rw-label rw-label-error">
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={data?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="email" className="rw-field-error" />

        <Label name="profileViews" className="rw-label" errorClassName="rw-label rw-label-error">
          Profile views
        </Label>
        <NumberField
          name="profileViews"
          defaultValue={data?.profileViews}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="profileViews" className="rw-field-error" />

        <Label name="city" className="rw-label" errorClassName="rw-label rw-label-error">
          City
        </Label>
        <TextField
          name="city"
          defaultValue={data?.city}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="city" className="rw-field-error" />

        <Label name="country" className="rw-label" errorClassName="rw-label rw-label-error">
          Country
        </Label>
        <TextField
          name="country"
          defaultValue={data?.country}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="country" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
