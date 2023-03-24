export class GetJqlIssuesQuery {
  constructor(
    public readonly integrationId: number,
    public readonly queryId: number,
  ) {}
}
