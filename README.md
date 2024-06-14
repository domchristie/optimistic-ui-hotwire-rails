# Optimistic UI with Ruby on Rails and Hotwire

An optimistic UI demo that combines [Composite](https://github.com/domchristie/composite) with a Stimulus controller and Turbo Stream to provide immediate feedback once a form is submitted. It's far from the potential full-fidelity of a local first, fully client rendered approach, but offers a [Good Enough™️](https://youtu.be/SWEts0rlezA?si=Tlx_rvyfzAIjCiwf&t=701) experience that provides more context than simply updating the submit button with "Loading…".

## Accessing Submitted Params

Submitted parameters are available in the template via `params`, so that optimistic updates can preview the submission. For example, the following will render a comment with the submitted body:

```erb
<%= form_with model: @comment, data: {controller: "optimistic-form", action: "optimistic-form#performActions"} do |form| %>
  <%= form.text_field :body, autofocus: true %>
  <%= form.submit "Send" %>

  <%= optimistic_actions do %>
    <%= turbo_stream.prepend "comments", partial: "application/comment", locals: {
      body: "${params['comment[body]']}",
    } %>
  <% end %>
<% end %>
```

The form has a `comment[body]` field, and it's submitted value can be accessed and rendered with `"${params['comment[body]']}"`.

## Arbitrary JavaScript Statements

In fact, you can render any JavaScript statement, for example:

```erb
<%= form_with … do |form| %>
  <%# … %>

  <%= optimistic_actions do %>
    <%= turbo_stream.prepend "comments", partial: "application/comment", locals: {
      body: "${params['comment[body]']}",
      footer: "${new Date().toLocaleString('en-GB', { timeStyle: 'short' })}"
    } %>
  <% end %>
<% end %>
```

## Extending `OptimisticFormController` with Helpers

Extend `OptimisticFormController` to provide rendering helpers. In addition to `params`, optimistic actions also get access to the `controller`. So to add simple formatting:

```js
import { escape, raw } from '@domchristie/composite'
import OptimisticFormController from "controllers/optimistic_form_controller"
OptimisticFormController.prototype.simpleFormat = function (text) {
  text = escape(text)
  text
    .replace(/\r\n?/g, '\n')
    .replace(/\n\n+/g, '</p>\n\n<p>')
    .replace(/([^\n]\n)(?=[^\n])/g, '$1<br/>')
  return raw(`<p>${text}</p>`)
}
```

```erb
<%= form_with … do |form| %>
  <%# … %>

  <%= optimistic_actions do %>
    <%= turbo_stream.prepend "comments", partial: "application/comment", locals: {
      body: "${controller.simpleFormat(params['comment[body]'])}",
      footer: "${new Date().toLocaleString('en-GB', { timeStyle: 'short' })}"
    } %>
  <% end %>
<% end %>
```

## Credits

[Karol Bucek](https://github.com/kares) for the [`simpleFormat` JavaScript implementation](https://gist.github.com/kares/740162).

## License

Copyright © 2024+ Dom Christie and released under the MIT license.
