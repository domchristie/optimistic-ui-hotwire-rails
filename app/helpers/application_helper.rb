module ApplicationHelper
  def optimistic_actions(&block)
    tag.template data: {optimistic_form_target: "actions"}, &block
  end
end
