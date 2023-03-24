export class CreateSessionCommand {
  constructor(public readonly name: string, public readonly teamId: number) {}
}
