import { Context } from "@azure/functions"

export default interface EventHubBindingContext extends Context {
  bindings: {
    outputEventHubMessage: string
  }
}
