import * as permify from "@permify/permify-node";
import { PermifyContainer } from "./permify-container";

describe("PermifyContainer", () => {
  jest.setTimeout(180_000);

  // connect
  it("should connect and create a tenant"), async () => {
    const container = await new PermifyContainer().start();

    const request = new permify.grpc.payload.TenantCreateRequest();
    request.setId("t1");
    request.setName("Tenant 1");

    const client = permify.grpc.newClient({
      endpoint: container.getGrpcConnectionUri(),
      cert: null,
    })

    client.tenancy.create(request).then((response: any) => {
      console.log(response);
      // need to handle the response
    })
  }
})
