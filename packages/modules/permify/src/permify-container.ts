import { AbstractStartedContainer, GenericContainer, StartedTestContainer, Wait } from "testcontainers";

const REST_PORT = 3476;
const GRPC_PORT = 3478;

export class PermifyContainer extends GenericContainer {

  constructor(image = "ghcr.io/permify/permify:v1.0.5") {
    super(image);
    this.withExposedPorts(REST_PORT, GRPC_PORT)
      .withStartupTimeout(120_000);
  }

  public override async start(): Promise<StartedPermifyContainer> {
    this.withEnvironment({});
    return new StartedPermifyContainer(await super.start());
  }
}

export class StartedPermifyContainer extends AbstractStartedContainer {
  private readonly restPort: number;
  private readonly grpcPort: number;

  constructor(
    startedTestContainer: StartedTestContainer,
  ) {
    super(startedTestContainer);
    this.restPort = startedTestContainer.getMappedPort(REST_PORT);
    this.grpcPort = startedTestContainer.getMappedPort(GRPC_PORT);
  }

  public getRestPort(): number {
    return this.restPort;
  }

  public getGrpcPort(): number {
    return this.grpcPort;
  }

  /**
  * @returns A connection URI in the form of http://[host[:port],]
  */
  public getGrpcConnectionUri(): string {
    const url = new URL("", "http://");
    url.hostname = this.getHost();
    url.port = this.getRestPort().toString();
    return url.toString();
  }
}
